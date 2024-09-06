import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserData } from '../redux/userDataSlice';
import '../styles/Package.css';
import { fetchQuizzesData} from '../redux/quizzesDataSlice';
import { fetchNotesData } from '../redux/notesDataSlice';
import Loading from './Loading';

const DropdownArrow  =<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>;
const UpArrow = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>;

const Package = () => {
    const [packageData, setPackageData] = useState(null);
    const { packageId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.userData);
    const notesData = useSelector(state => state.notesData);
    const lecturesData = useSelector(state => state.lecturesData);
    const quizzesData = useSelector(state => state.quizzesData);
    const liveData = useSelector(state => state.liveData);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const [dropdowns, setDropdowns] = useState({
        quizzes: false,
        notes: false,
        lectures: false,
        live: false,
    });

    useEffect(() => {
        fetch(`http://localhost:3000/api/packages/${packageId}`)
            .then((response) => response.json())
            .then((data) => {
                setPackageData(data);
            })
            .catch((error) => console.error('Error fetching package:', error));
    }, [packageId]);

    
















    useEffect(() => {
        if (quizzesData.status === 'idle') {
            dispatch(fetchQuizzesData());
        }
    }, [quizzesData.status, dispatch]);
    useEffect(() => {
        if (notesData.status === 'idle') {
            dispatch(fetchNotesData());
        }
    }, [notesData.status, dispatch]);


    useEffect(() => {
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => {
                setScriptLoaded(true);
            };
            script.onerror = () => {
                console.error('Razorpay SDK failed to load.');
                setScriptLoaded(false);
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        };

        if (!scriptLoaded) {
            loadScript();
        }
    }, [scriptLoaded]);

    if (!packageData || quizzesData.status === 'loading' ||notesData.status === 'loading' ) {
        return <Loading />;
    }

    if (quizzesData.status === 'failed' || notesData.status ==='failed') {
        return <div>Error: {quizzesData.error&&notesData.error}</div>;
    }

    const handlePayment = async () => {
        if (!scriptLoaded) {
            alert('Razorpay SDK is still loading. Please try again in a few seconds.');
            return;
        }

        try {
            const orderUrl = '/api/create-order';
            const { data } = await axios.post(orderUrl, { amount: packageData.cost * 100 }); // amount in paise

            const options = {
                key: 'rzp_test_tBCKVt4YuwuDxc',
                amount: data.amount,
                currency: data.currency,
                name: 'Padhai Wallah',
                description: packageData.title,
                image: packageData.imageLink,
                order_id: data.id,
                handler: async (response) => {
                    const paymentId = response.razorpay_payment_id;
                    const orderId = response.razorpay_order_id;
                    const signature = response.razorpay_signature;
                    const verifyUrl = '/api/verify-payment';
                    const email = userData.email;
                    const { data } = await axios.post(verifyUrl, { paymentId, orderId, signature, email, quizIds: packageData.quizIds, notesIds: packageData.notesIds, lectureIds: packageData.lectureIds });
                    if (data.success) {
                        dispatch(updateUserData(data.updatedUserData));
                        navigate("/");
                    } else {
                        alert('Payment verification failed. Please try again.');
                    }
                },
                prefill: {
                    name: userData.username,
                    email: userData.email,
                },
                theme: {
                    color: '#66cdaa'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error initiating payment', error);
            alert('Error initiating payment. Please try again.');
        }
    };

    const getItemsTitles = (ids, data) => {
        if (!ids || !data) return [];
        return ids.map(id => data.find(item => item.id === id)?.title).filter(title => title);
    };

    const toggleDropdown = (section) => {
        setDropdowns(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const quizzesTitles = getItemsTitles(packageData.quizIds, quizzesData.paidQuizzes);
    const notesTitles = getItemsTitles(packageData.notesIds, notesData.paidNotes);
    const lecturesTitles = getItemsTitles(packageData.lectureIds, lecturesData.paidLectures);
    const liveTitles = getItemsTitles(packageData.liveIds, liveData.paidThings); // assuming you have live session IDs to pass

    return (
        <div className="package-page">
            <div className="package-card">
                <div className='left-content'>
                    <img src={packageData.imageLink} alt={packageData.title} className="package-image" />
                    <div className="package-items-count">
                        <p>Quizzes: {packageData.quizIds?.length || 0}</p>
                        <p>Notes: {packageData.notesIds?.length || 0}</p>
                        <p>Lectures: {packageData.lectureIds?.length || 0}</p>
                        <p>Live Sessions: {packageData.liveIds?.length || 0}</p>
                    </div>
                </div>
                <div className="package-content">
                    <h2 className="package-title">{packageData.title}</h2>
                    <p className="package-description">{packageData.description}</p>
                    <p className="package-cost">Price: ₹{packageData.cost}</p>
                    <button className="package-button" onClick={handlePayment}>Buy Now</button>
                </div>
            </div>
            <div className="package-details">
                <h3>Included in this package:</h3>
                <div className={`package-section ${dropdowns.quizzes ? 'open' : ''}`} onClick={() => toggleDropdown('quizzes')}>
                    <h4>Quizzes</h4>
                    {dropdowns.quizzes ? UpArrow : DropdownArrow}
                    {dropdowns.quizzes && (
                        <ul>
                            {quizzesTitles.map(title => <li key={title}>{title}</li>)}
                        </ul>
                    )}
                </div>
                <div className={`package-section ${dropdowns.notes ? 'open' : ''}`} onClick={() => toggleDropdown('notes')}>
                    <h4>Notes</h4>
                    {dropdowns.notes ? UpArrow : DropdownArrow}
                    {dropdowns.notes && (
                        <ul>
                            {notesTitles.map(title => <li key={title}>{title}</li>)}
                        </ul>
                    )}
                </div>
                <div className={`package-section ${dropdowns.lectures ? 'open' : ''}`} onClick={() => toggleDropdown('lectures')}>
                    <h4>Lectures</h4>
                    {dropdowns.lectures ? UpArrow : DropdownArrow}
                    {dropdowns.lectures && (
                        <ul>
                            {lecturesTitles.map(title => <li key={title}>{title}</li>)}
                        </ul>
                    )}
                </div>
                <div className={`package-section ${dropdowns.live ? 'open' : ''}`} onClick={() => toggleDropdown('live')}>
                    <h4>Live Sessions</h4>
                    {dropdowns.live ? UpArrow : DropdownArrow}
                    {dropdowns.live && (
                        <ul>
                            {liveTitles.map(title => <li key={title}>{title}</li>)}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Package;

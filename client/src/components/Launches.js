import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackages } from '../redux/packagesDataSlice';
import '../styles/Launches.css';
import { Link } from 'react-router-dom';

const Launches = () => {
  const dispatch = useDispatch();
  const packages = useSelector((state) => state.packagesData.packages);
  const packageStatus = useSelector((state) => state.packagesData.status);

  useEffect(() => {
    if (packageStatus === 'idle') {
      dispatch(fetchPackages());
    }
  }, [packageStatus, dispatch]);

  return (
    <div className="launches-container">
      {packages.map((pkg, index) => (
        <div key={index} >
          <Link to={`/packages/${pkg.id}`} className="launch-link">
            <img src={pkg.imageLink} alt={pkg.title} className="launch-image" />  
             </Link>
            {/*<div className="package-info">
              <h2>{pkg.title}</h2>
              <p>{pkg.description}</p>
              <p>Cost: ₹{pkg.cost}</p>
            </div>*/}
       
        </div>
      ))}
    </div>
  );
};

export default Launches;

import React from 'react'
import Account from './Account'
import AccountDetails from './AccountDetails'
import { useSelector } from "react-redux";
import { getUserData } from "../redux/userDataSlice";


const AccountPage = () => {
    const userData = useSelector(getUserData);
    return (
        <>
            {userData.loggedIn ?
                (<AccountDetails />)
                :
                (<Account />)
            }
        </>
    )
}

export default AccountPage
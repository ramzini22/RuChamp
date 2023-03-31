import React from 'react';
import useIsMobile from '../hooks/isMobile';
import {Navigate, Route, Routes} from 'react-router-dom';
import AccountLayout from '../layouts/AccountLayout';
import Profile from '../pages/account/Profile';
import AccountMenu from '../pages/account/AccountMenu';
import NotFound from '../pages/NotFound';
import AccEvents from '../pages/account/AccEvents';
import AddEvent from '../pages/account/AddEvent';
import VerifyCheck from "../pages/account/VerifyCheck";
import {useAppSelector} from "../store";

const AccountRouter = () => {
    const {isMobile} = useIsMobile('991px');
    return (
        <Routes>
            <Route path="/" element={<VerifyCheck><AccountLayout isMobile={isMobile}/></VerifyCheck>}>
                {isMobile ? (
                    <Route index element={<AccountMenu/>}/>
                ) : (
                    <Route index element={<Navigate to="profile" replace={true}/>}/>
                )}
                <Route path="profile" element={<Profile/>}/>
                <Route path="events" element={<AccEvents/>}/>
                <Route path="events/add" element={<AddEvent/>}/>
                <Route path="events/:id" element={<AddEvent/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AccountRouter;
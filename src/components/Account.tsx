import React, { FC } from 'react';
import { FaUser } from 'react-icons/fa';

const Account: FC = () => {
    return (
        <span className="account user-action">
            <FaUser className="icon"/>
        </span>
    )
}

export default Account

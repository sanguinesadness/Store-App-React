import React, { FC } from 'react';
import { FaBox, FaRegHandPeace, FaUser } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { commerce } from '../lib/commerce';
import Modal from 'react-modal';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import girlPicture from '../icons/girl.svg';
import TextInput from './inputs/TextInput';
import { Img } from 'react-image';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useEffect } from 'react';
import { refreshCurrentCustomer } from '../store/actions/customer';
import { useDispatch } from 'react-redux';

const Account: FC = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

    const { customer } = useTypedSelector(root => root.customer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(refreshCurrentCustomer());
        setLoading(false);
    }, [commerce.customer.isLoggedIn()]);


    const login = () => {
        if (!email) {
            setError("The field is required");
            return;
        }

        setLoading(true);

        commerce.customer.login(email, "http://localhost:3000/login/callback/")
                         .then((response) => setSuccess(response.success))
                         .catch((response) => setError(response.data.error.errors.email))
                         .finally(() => setLoading(false));
    }

    const logout = () => {
        setLoading(true);
        commerce.customer.logout();
    }

    const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
            login();
        }
    }

    const accountClickHandler = () => {
        if (!customer) {
            openLoginModal();
        }
    }

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
        setEmail("");
        setLoading(false);
        setError("");
        setSuccess(false);
    }

    const openLogoutModal = () => {
        setIsLogoutModalOpen(true);
        hidePopup();
    }
    const closeLogoutModal = () => setIsLogoutModalOpen(false);

    const hidePopup = () => setIsPopupVisible(false);
    const showPopup = () => setIsPopupVisible(true);

    return (
        <div className="account"
             onMouseEnter={showPopup}
             onMouseLeave={hidePopup}>
            <div className="user-action visible-content" onClick={accountClickHandler}>
                <FaUser className="icon" />
            </div>
            {
                customer ?
                    <>
                        <div className={`popup-panel ${isPopupVisible ? "visible" : "hidden"}`}>
                            <header className="popup-panel__header">
                                <h4 className="greetings-text">Hi, {customer.firstname ? customer.firstname : "Stranger"}</h4>
                                <FaRegHandPeace className="greetings-icon" />
                            </header>
                            <div className="popup-panel__body">
                                <button className="flat-style with-icon icon-right disabled" disabled>
                                    <span>My Profile</span>
                                    <FaUser />
                                </button>
                                <button className="flat-style with-icon icon-right" disabled>
                                    <span>My Orders</span>
                                    <FaBox />
                                </button>
                                <button className="flat-style with-icon icon-right red" onClick={openLogoutModal}>
                                    <span>Log Out</span>
                                    <IoLogOut />
                                </button>
                            </div>
                        </div>
                        <Modal className="logout-modal" isOpen={isLogoutModalOpen}>
                            {
                                !loading ?
                                    <div className="logout-modal__confirm">
                                        <h3 className="modal-title">Log Out</h3>
                                        <div className="modal-body">
                                            <span>Are you sure you want to log out?</span>
                                        </div>
                                        <div className="modal-buttons">
                                            <button className="flat-style" onClick={closeLogoutModal}>Cancel</button>
                                            <button className="flat-style red" onClick={logout}>Yes</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="loading-modal__wrapper">
                                        <h3 className="modal-title">Loading...</h3>
                                        <div className="modal-body">
                                            <ReactLoading type="spin" className="loading-spinner" />
                                        </div>
                                    </div>
                            }                        
                        </Modal>
                    </>
                    :
                    <Modal isOpen={isLoginModalOpen} className="login-modal">
                        {
                            loading ?
                                <div className="loading-modal__wrapper">
                                    <h3 className="modal-title">Loading...</h3>
                                    <div className="modal-body">
                                        <ReactLoading type="spin" className="loading-spinner" />
                                    </div>
                                </div>
                                : success ?
                                    <div className="login-modal__success">
                                        <h3 className="modal-title green">Login link has been sent</h3>
                                        <div className="modal-body">
                                            <div className="left-side">
                                                <span className="info">
                                                    <p>We’ve spent a one-time login link to your email.</p>
                                                    <p>Check the Inbox and Spam folders.</p>
                                                </span>
                                            </div>
                                            <div className="right-side">
                                                <Img className="girl-picture"
                                                    alt=""
                                                    src={girlPicture}
                                                    loader={<ReactLoading type="spin" className="loading-spinner" />} />
                                            </div>
                                        </div>
                                        <div className="modal-buttons">
                                            <button className="close-modal-button flat-style green" onClick={closeLoginModal}>Close</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="login-modal__input">
                                        <h3 className="modal-title">Login</h3>
                                        <div className="modal-body">
                                            <TextInput value={email}
                                                setValue={setEmail}
                                                label="Enter the Email You provided during checkout"
                                                onKeyPress={onEnterPress}
                                                onValueChange={(e) => setEmail(e.currentTarget.value)}
                                                placeholder="myemail@example.com"
                                                error={error}
                                                setError={setError}
                                                type="email" />
                                        </div>
                                        <div className="modal-buttons">
                                            <button className="cancel-button flat-style" onClick={closeLoginModal}>Cancel</button>
                                            <button className="confirm-button flat-style green" onClick={login}>Confirm</button>
                                        </div>
                                    </div>
                        }
                    </Modal>
            }
        </div>
    )
}

export default Account

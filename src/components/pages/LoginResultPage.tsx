import React from 'react';
import { useEffect } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import account_front from '../../icons/account_front.svg';
import account_bg from '../../icons/account_bg.svg';
import checked_sign from '../../icons/checked_sign.svg';
import { useState } from 'react';
import ReactLoading from 'react-loading';
import { BsInfoSquareFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { fetchCustomer } from '../../store/actions/customer';
import { useTypedSelector } from '../../hooks/useTypedSelector';

interface LoginResultPageParams {
    token: string;
}

const LoginResultPage = () => {
    const params = useParams<LoginResultPageParams>();
    const dispatch = useDispatch();
    const history = useHistory();

    const { login, customer } = useTypedSelector(root => root.customer);
    const [isRendered, setIsRendered] = useState<boolean>(false);

    const goHome = () => history.push("/");

    useEffect(() => {
        dispatch(fetchCustomer(params.token));
        setIsRendered(true);
    }, []);

    return (
        <div id="successful-login-page">
            {
                login.loading || !isRendered ?
                    <div className="page-loading">
                        <ReactLoading type="bubbles" className="loading-spinner" />
                    </div>
                    : customer ?
                        <div className="info-screen">
                            <div className="container">
                                <section className="info-section">
                                    <div className="title">
                                        <img className="icon" src={checked_sign} alt="" />
                                        <h3 className="text">Successful Login</h3>
                                    </div>
                                    <div className="text">
                                        <p>Congratulations! You have successfully signed in to your fake store account. Now you have access to your personal info and order history.</p>
                                        <p><b>Keep shopping with us!</b></p>
                                    </div>
                                    <div className="buttons">
                                        <button className="with-icon icon-right blue">
                                            <span>View Profile</span>
                                            <FaUser />
                                        </button>
                                        <button className="with-icon green" onClick={goHome}>
                                            <span>Continue shopping</span>
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                </section>
                                <section className="picture-section">
                                    <img className="picture" src={account_front} alt="" />
                                    <img className="background" src={account_bg} alt="" />
                                </section>
                            </div>
                        </div>
                        :
                        <div className="page-error">
                            <BsInfoSquareFill className="icon" />
                            <span className="text">
                                <p>
                                    {
                                        login.error ?
                                            login.error
                                            :
                                            "Unknown error. Try again"
                                    }
                                </p>
                            </span>
                        </div>
            }
        </div>
    )
}

export default LoginResultPage

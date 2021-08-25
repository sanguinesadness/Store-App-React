import React, { FC } from 'react';
import fk_logo from '../../icons/fakestore_logo_short.svg';
import { WiDirectionLeft } from 'react-icons/wi';
import { useHistory } from 'react-router-dom';
import ContentBlock from '../ContentBlock';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Img } from 'react-image';
import { PuffLoader } from 'react-spinners';
import { FaInfo, FaLock, FaMoneyCheckAlt } from 'react-icons/fa';
import SelectInput, { SelectInputEvent, SelectOption } from '../inputs/SelectInput';
import RadioInput, { RadioInputEvent } from '../inputs/RadioInput';
import { ImCreditCard } from 'react-icons/im';
import { Billing, commerce } from '../../lib/commerce';
import { useState } from 'react';
import { useEffect } from 'react';
import CreditCardInput, { CreditCardEvent } from '../inputs/CreditCardInput';
import checLogo  from '../../icons/chec_logo.svg';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import Modal from 'react-modal';
import ReactLoading from 'react-loading';
import dudePicture from '../../icons/dude.svg';
import { useDispatch } from 'react-redux';
import { clearLocalCartAction } from '../../types/localCart';
import TextInput from '../inputs/TextInput';

const emptyBillingObj: Billing = {
    customer: { firstname: "", lastname: "", email: "" },
    country: { id: "", name: "" },
    zipcode: "",
    gateway: "",
    card: { number: "", cardholder: "", cvc: "", expiry: "" }
}

const CheckoutPage: FC = () => {
    const { lcartProducts: cartProducts, totalPrice, totalQuantity } = useTypedSelector(root => root.localCart);
    const { loading: itemsLoading } = useTypedSelector(root => root.loading);

    const history = useHistory();
    const dispatch = useDispatch();

    const [availableCountries, setAvailableCountries] = useState<SelectOption[]>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        function getAvailableCountries() {
            let countriesObject: Object;
            let countriesArray: SelectOption[] = [];

            commerce.services.localeListCountries().then(response => {
                countriesObject = response.countries as Object;
            }).then(() => {
                if (mounted) {
                    let length = Object.values(countriesObject).length;

                    for (let i = 0; i < length; i++) {
                        const id = Object.keys(countriesObject)[i];
                        const value = Object.values(countriesObject)[i];

                        countriesArray.push({ id, value });
                    }

                    setAvailableCountries(countriesArray);
                }
            });
        }

        getAvailableCountries();

        return function cleanup() {
            mounted = false;
        }
    }, []);

    const [billing, setBilling] = useState<Billing>(emptyBillingObj);

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBilling({ ...billing, customer: { ...billing.customer, email: event.currentTarget.value } });
    }

    const onCountryChange = (event: SelectInputEvent) => {
        setBilling({ ...billing, country: { id: event.option?.id as string, name: event.option?.value as string } });
    }

    const onZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBilling({ ...billing, zipcode: event.currentTarget.value });
    }

    const onCardChange = (event: CreditCardEvent) => {
        setBilling({ ...billing, card: {
            number: event.number.toString(),
            cardholder: event.name,
            expiry: event.expiry.toString(),
            cvc: event.cvc.toString()
        }, customer: {...billing.customer, 
            firstname: event.name.split(" ")[0],
            lastname: event.name.split(" ")[1]
        } });
    }

    const onGatewayChange = (event: RadioInputEvent) => {
        setBilling({ ...billing, gateway: event.option?.id as string });
    }

    const confirmPayment = () => {
        setPaymentLoading(true);

        const card: any = {
            number: billing.card.number,
            cvc: billing.card.cvc,
            expiry_month: billing.card.expiry.substr(0, 2),
            expiry_year: billing.card.expiry.substr(2, 2),
            postal_zip_code: billing.zipcode
        }

        const checkoutData: CheckoutCapture = {
            line_items: {},
            customer: {
                firstname: billing.customer.firstname,
                lastname: billing.customer.lastname,
                email: billing.customer.email
            },
            billing: {
                name: billing.card.cardholder,
                postal_zip_code: billing.zipcode,
                country: billing.country.id
            },
            payment: {
                gateway: 'test_gateway',
                card: card
            },
        }

        const cartId: string = commerce.cart.id() || "";

        commerce.checkout.generateToken(cartId, { type: "cart" }).then(token => {
            commerce.checkout.capture(token.id, checkoutData)
                                .catch(response => {
                                    setPaymentLoading(false);
                                    setPaymentError(response.data.error.message as string);
                                }).then(() => {
                                    setPaymentLoading(false);
                                });
        }).catch(response => {
            setPaymentLoading(false);
            setPaymentError(response.data.error.message as string);
        });
    }

    const confirmPaymentClick = () => {
        openModal();
        confirmPayment();
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const goHome = () => history.push("/");
    
    const successModalButtonClick = () => {
        dispatch(clearLocalCartAction());
        setPaymentError(null);
        setPaymentLoading(false);
        goHome();
    }

    // if Cart is empty, redirect to Home page
    if (cartProducts.length === 0) {
        goHome();
    }

    return (
        <div id="checkout-page">
            <header className="checkout-page__header">
                <div className="return-to-store">
                    <span className="fk_logo__wrapper">
                        <img className="fk-logo" src={fk_logo} alt=""
                             onClick={() => history.push("/")}/>
                    </span>
                    <button className="flat-style with-icon icon-left no-hover return-to-store-button"
                            onClick={() => history.goBack()}>
                        <WiDirectionLeft className="icon"/>
                        <span className="text">Return</span>
                    </button>
                </div>
                <h2 className="checkout-label">Checkout</h2>
            </header> 
            {
                cartProducts.length > 0 ?
                    itemsLoading ?
                        <div className="page-loading">
                            <ReactLoading type="bubbles" className="checkout-loading loading-spinner"/>
                        </div>
                        :
                        <>
                            <div className="checkout-page__body">
                                <ContentBlock title="Double-check Your cart" className="cart">
                                    <table className="checkout-cart-table">
                                        <thead>
                                            <tr className="table-header-row">
                                                <th colSpan={3} className="product-cell">Product</th>
                                                <th className="quantity-cell">Quantity</th>
                                                <th className="price-cell">Price</th>
                                                <th className="empty-cell" colSpan={2} />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartProducts.map(cp => (
                                                <tr key={cp.product.id} className="product-row">
                                                    <td className="empty-cell" />
                                                    <td className="picture-cell">
                                                        <Img className="picture"
                                                            src={cp.product.media.source}
                                                            alt=""
                                                            loader={<PuffLoader color="#00B389" />} />
                                                    </td>
                                                    <td className="name-cell">{cp.product.name}</td>
                                                    <td className="quantity-cell">{cp.quantity}</td>
                                                    <td className="price-cell">${cp.price}</td>
                                                    <td className="lock-cell"><FaLock className="lock-icon" /></td>
                                                    <td className="empty-cell" />
                                                </tr>
                                            ))}
                                            <tr className="summary">
                                                <td className="empty-cell" colSpan={2} />
                                                <td className="label-cell">Total</td>
                                                <td className="quantity-cell">{totalQuantity}</td>
                                                <td className="price-cell">${totalPrice}</td>
                                                <td className="empty-cell" colSpan={2} />
                                            </tr>
                                        </tbody>
                                    </table>
                                </ContentBlock>
                                <ContentBlock title="Fill out Your information" className="billing">
                                    <div className="contact-info">
                                        <form name="contact-info-form">
                                            <div className="input-block">
                                                <TextInput
                                                    label="Email Address"
                                                    onValueChange={onEmailChange}
                                                    placeholder="myemail@example.com"
                                                    type="email" />
                                            </div>
                                            <div className="input-block">
                                                <RadioInput label="Payment Method" options={[
                                                    { id: "test_gateway", title: "Credit Card", subTitle: "(Test Gateway)", icon: ImCreditCard }
                                                ]} selectedOptionId={"test_gateway"} onChange={onGatewayChange} />
                                            </div>
                                            <div className="input-block">
                                                <SelectInput label="Billing Country"
                                                    options={availableCountries ? availableCountries : []}
                                                    onChange={onCountryChange} />
                                            </div>
                                            <div className="input-block">
                                                <TextInput
                                                    label="Zip/Post Code"
                                                    onValueChange={onZipcodeChange}
                                                    placeholder="94107"
                                                    type="text" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="credit-card-info">
                                        <CreditCardInput onChange={onCardChange} />
                                    </div>
                                </ContentBlock>
                                <ContentBlock className="confirmation">
                                    <div className="total-block">
                                        <span className="label">Total</span>
                                        <span className="price">
                                            <span className="value">${totalPrice}</span>
                                            <span className="tag green">USD</span>
                                        </span>
                                    </div>
                                    <div className="confirm-block">
                                        <button className="confirm-payment-button green with-icon icon-left"
                                                onClick={confirmPaymentClick}>
                                            <FaMoneyCheckAlt />
                                            <span>Confirm Payment</span>
                                        </button>
                                        <span className="extra-info">
                                            All transactions are safe & secured by 2048 bit SSL encryption.
                                        </span>
                                    </div>
                                </ContentBlock>
                            </div>
                            <footer className="checkout-page__footer">
                                <a className="powered-by-chec" href="https://commercejs.com/" target="_blank">
                                    <img className="logo" src={checLogo} alt="" />
                                    <span className="text">Powered by <span className="chec">Chec</span></span>
                                </a>
                            </footer>
                        </>
                : 
                    <div className="page-error checkout-empty-message">
                        <FaInfo className="icon" />
                        <span className="text">
                            <p>Your Shopping cart is empty.</p>
                            <p>
                                <span className="link" onClick={() => history.goBack()}>Return to store</span>
                                <span>and try again.</span>
                            </p>
                        </span>
                    </div>
            }

            <Modal className="checkout-modal" isOpen={isModalOpen}>
                {
                    paymentLoading ? 
                        <div className="loading-modal__wrapper">
                            <h3 className="modal-title">Loading...</h3>
                            <div className="modal-body">
                                <ReactLoading type="spin" className="loading-spinner" />
                            </div>
                        </div>
                    :
                    paymentError ?
                        <div className="checkout-modal__error">
                            <h3 className="modal-title red">An error occured</h3>
                            <div className="modal-body">
                                <span className="error-text">{paymentError}</span>
                                <span className="error-advice">Double-check the input and try again.</span>
                            </div>
                            <div className="modal-buttons">
                                <button className="close-modal-button flat-style red" onClick={closeModal}>Try again</button>
                            </div>
                        </div>
                    :
                        <div className="checkout-modal__success">
                            <h3 className="modal-title green">Successful Payment</h3>
                            <div className="modal-body">
                                <div className="left-side">
                                    <span className="info">
                                        <p>The transaction was successful.</p>
                                        <p>Payment details have been sent to your email.</p>
                                    </span>
                                    <span className="nice-day-label">Have a nice day!</span>
                                </div>
                                <div className="right-side">
                                    <img className="dude-picture" alt="" src={dudePicture}/>
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button className="close-modal-button flat-style green" onClick={successModalButtonClick}>Close</button>
                            </div>
                        </div>
                }
            </Modal>
        </div>
    )
}

export default CheckoutPage
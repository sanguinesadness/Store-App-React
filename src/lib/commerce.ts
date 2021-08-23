import Commerce from '@chec/commerce.js';

const apiKey: string | undefined = process.env.REACT_APP_CHEC_PUBLIC_KEY; 

export const commerce = new Commerce(apiKey ? apiKey : "", true);

export interface Customer {
    firstname: string;
    lastname: string;
    email: string;
}

export interface Country {
    id: string;
    name: string;
}

export interface CreditCard {
    number: string;
    cardholder: string;
    cvc: string,
    expiry: string;
}

export interface Billing {
    customer: Customer;
    country: Country;
    zipcode: string;
    card: CreditCard;
    gateway: string;
}
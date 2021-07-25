import Commerce from '@chec/commerce.js';

const apiKey: string | undefined = process.env.REACT_APP_CHEC_PUBLIC_KEY; 

export const commerce = new Commerce(apiKey ? apiKey : "", true);
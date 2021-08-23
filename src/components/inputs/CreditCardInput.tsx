import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Cards, { Focused } from 'react-credit-cards';
import "react-credit-cards/es/styles-compiled.css";

export interface CreditCardEvent {
    number: string | number;
    name: string;
    expiry: string | number;
    cvc: string | number;
}

interface CreditCardInputProps {
    onChange?: (event: CreditCardEvent) => void;
}

const CreditCardInput: FC<CreditCardInputProps> = ({ onChange }) => {
    const [number, setNumber] = useState<string | number>("");
    const [name, setName] = useState<string>("");
    const [expiry, setExpiry] = useState<string | number>("");
    const [cvc, setCvc] = useState<string | number>("");
    const [focus, setFocus] = useState<Focused>();

    const onFocusEventHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocus(event.target.name as Focused);
    }

    useEffect(() => {
        onChange?.call(null, { number, name, expiry, cvc });
    }, [number, name, expiry, cvc]);

    return (
        <div className="credit-card-input">
            <Cards cvc={cvc}
                expiry={expiry}
                name={name}
                number={number} 
                focused={focus}/>
            <form name="credit-card-form">
                <div className="input-block">
                    <label htmlFor="number">Card Number</label>
                    <input type="tel" 
                           name="number" 
                           placeholder="4242 4242 4242 4242" 
                           pattern="[\d| ]{16,22}"
                           maxLength={20}
                           required
                           value={number}
                           onFocus={onFocusEventHandler}
                           onChange={(e) => setNumber(e.target.value)}/>
                </div>
                <div className="input-block">
                    <label htmlFor="name">Cardholder</label> 
                    <input type="text" 
                           name="name" 
                           placeholder="John Smith"
                           required
                           value={name}
                           onFocus={onFocusEventHandler}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="input-block">
                    <label htmlFor="expires">Expires</label>
                    <input type="text" 
                           name="expiry" 
                           pattern="\d\d/\d\d"
                           placeholder="MM / YY" 
                           required
                           maxLength={4}
                           value={expiry}
                           onFocus={onFocusEventHandler}
                           onChange={(e) => setExpiry(e.target.value)}/>
                </div>
                <div className="input-block">
                    <label htmlFor="cvc">CVC (CVV)</label>
                    <input type="text" 
                           name="cvc" 
                           placeholder="123" 
                           pattern="\d{3,4}"
                           required
                           maxLength={3}
                           value={cvc}
                           onFocus={onFocusEventHandler}
                           onChange={(e) => setCvc(e.target.value)}/>
                </div>
            </form>
        </div>
    )
}

export default CreditCardInput

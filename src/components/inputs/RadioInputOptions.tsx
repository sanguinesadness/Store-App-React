import React, { FC, SetStateAction } from 'react';
import { IconType } from 'react-icons/lib';
import { RadioOption } from './RadioInput';

interface RadioInputOptionsProps {
    options: RadioOption[];
    selectedOption: RadioOption | undefined;
    setSelectedOption: React.Dispatch<SetStateAction<RadioOption | undefined>>;
}

const RadioInputOptions: FC<RadioInputOptionsProps> = ({ options, selectedOption, setSelectedOption }) => {
    return (
        <div className="radio-options">
            {
                options.map(option => (
                    <div key={option.id} 
                         className={`radio-option ${selectedOption?.id === option.id ? "selected" : ""}`}
                         onClick={() => setSelectedOption(option)}>
                        <div className="check-circle__wrapper">
                            <div className="check-circle" />
                        </div>
                        <div className="content">
                            <div className="left-side">
                                <span className="main-title">{option.title}</span>
                                { option.subTitle ? <span className="sub-title">{option.subTitle}</span> : <></> }
                            </div>
                            <div className="right-side">
                                {
                                    option.icon ?
                                        <span className="icon">
                                            {React.createElement(option.icon as IconType)}
                                        </span>
                                    : <></>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RadioInputOptions

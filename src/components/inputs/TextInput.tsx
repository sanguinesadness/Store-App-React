import React, { SetStateAction } from 'react';
import { FC } from 'react';
import { RiInformationFill } from 'react-icons/ri';
import { IoIosCloseCircle } from 'react-icons/io';
import { useEffect } from 'react';
import { useRef } from 'react';
import gsap from 'gsap';
import { useState } from 'react';

interface TextInputProps {
    label?: string;
    value?: string;
    setValue?: React.Dispatch<SetStateAction<string>>;
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    wrapperClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    error?: string;
    setError?: React.Dispatch<SetStateAction<string>>;
    placeholder?: string;
    type: "text" | "email" | "tel";
}

const TextInput: FC<TextInputProps> = (props) => {
    const clearInput = () => {
        if (props.setValue) {
            props.setValue("");
        }
        else if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const clearError = () => {
        if (props.setError) {
            props.setError("");
        }
    }

    const clearButtonClickHandler = () => {
        clearInput();
        inputRef.current?.focus();
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.setError) {
            if (props.error) {
                gsap.fromTo(errorRef.current, {
                    yPercent: -100,
                    opacity: 0
                }, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.2,
                    ease: "power1.out"
                });
            }
        }
    }, [props.error]);

    const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onValueChange?.call(null, event);
        clearError();
    }

    return (
        <div className={`text-input ${props.wrapperClassName}`}>
            {
                props.label ?
                    <span className={`label ${props.labelClassName}`}>{props.label}</span>
                : <></>
            }
            <div className={`input-field ${props.error ? "validation-error" : ""}`}>
                <input className={`input ${props.inputClassName}`}
                       value={props.value} 
                       onChange={onInputValueChange}
                       onKeyPress={props.onKeyPress}
                       placeholder={props.placeholder}
                       type={props.type}
                       ref={inputRef}/>
                <div className="overlay">
                    {
                        <span className="clear-button"
                            onClick={clearButtonClickHandler}>
                            <IoIosCloseCircle className="clear-icon" />
                        </span>
                    }
                </div>
            </div>
            {
                props.error && props.setError ?
                    <div className="error" ref={errorRef}>
                        <RiInformationFill className="error-icon"/>
                        <span className="error-text">{props.error}</span>
                    </div>
                    : <></>
            }
        </div>
    )
}

export default TextInput

import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IconType } from 'react-icons';
import RadioInputOptions from './RadioInputOptions';

export interface RadioOption {
    id: number | string;
    title: number | string;
    subTitle?: number | string;
    icon?: IconType;
}

export interface RadioInputEvent {
    option: RadioOption | undefined;
}

interface RadioInputProps {
    label?: string;
    options: RadioOption[];
    selectedOptionId?: number | string;
    onChange?: (event: RadioInputEvent) => void;
}

const RadioInput: FC<RadioInputProps> = ({ label, options, onChange, selectedOptionId }) => {
    const [selectedOption, setSelectedOption] = useState<RadioOption | undefined>(
        options.find(op => op.id === selectedOptionId)
    );

    useEffect(() => {
        onChange?.call(null, { option: selectedOption });
    }, [selectedOption]);

    return (
        <div className="radio-input">
            {
                label ? 
                    <span className="label">{label}</span>
                : <></>
            }
            <RadioInputOptions options={options}
                               selectedOption={selectedOption}
                               setSelectedOption={setSelectedOption}/>
        </div>
    )
}

export default RadioInput

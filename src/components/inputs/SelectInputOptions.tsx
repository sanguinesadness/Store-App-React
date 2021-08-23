import React, { FC, SetStateAction } from 'react';
import { SelectOption } from './SelectInput';

interface SelectInputOptionsProps {
    options: SelectOption[];
    selectedOption: SelectOption | undefined;
    setSelectedOption: React.Dispatch<SetStateAction<SelectOption | undefined>>;
}

const SelectInputOptions: FC<SelectInputOptionsProps> = ({ options, setSelectedOption, selectedOption }) => {
    return (
        <div className="select-options">
            {
                options.length > 0 ? 
                options.map(option => (
                    <span className={`select-option ${selectedOption?.id === option.id ? "selected" : ""}`}
                          onClick={() => setSelectedOption(option)}
                          key={option.id}>
                        <span className="id" hidden>{option.id}</span>
                        <span className="value">{option.value}</span>
                    </span>
                ))
                :
                <span className="empty-label">Not found</span>
            }
        </div>
    )
}

export default SelectInputOptions

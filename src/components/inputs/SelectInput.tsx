import React, { FC, useEffect, useRef } from 'react';
import { useState } from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';
import SelectInputOptions from './SelectInputOptions';

export interface SelectOption {
    id: number | string;
    value: number | string;
}

interface SelectInputProps {
    label?: string;
    options: SelectOption[];
    selectedOptionId?: number | string;
    placeholder?: string;
    onChange?: (event: SelectInputEvent) => void;
}

export interface SelectInputEvent {
    option: SelectOption | undefined;
}
 
const SelectInput: FC<SelectInputProps> = ({ label, options, placeholder, selectedOptionId, onChange }) => {
    const [visibleOptions, setVisibleOptions] = useState<SelectOption[]>(options);
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(options.find(op => op.id === selectedOptionId));
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const wrapperRef = useRef<HTMLDivElement>(null);

    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            // if clicked on outside of element
            function handleClickOutside(event: MouseEvent) {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    setIsExpanded(false);
                }
            }
    
            // bind the event listener
            document.addEventListener("click", handleClickOutside);
            return () => {
                // unbind the event listener on clean up
                document.removeEventListener("click", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(wrapperRef);

    useEffect(() => {
        setVisibleOptions(options);
    }, [options]);

    useEffect(() => {
        setIsExpanded(false);

        onChange?.call(null, { option: selectedOption });
    }, [selectedOption]);

    useEffect(() => {
        const filteredOptions = options.filter(op => 
            op.value.toLocaleString().toLowerCase().includes(searchValue.toLowerCase())
        );

        setVisibleOptions(filteredOptions);
    }, [searchValue]);

    useEffect(() => {
        if (isExpanded) {
            setSearchValue("");
        }
    }, [isExpanded]);

    return (
        <div className={`select-input ${isExpanded ? "expanded" : ""}`}
             ref={wrapperRef}>
            <div className="visible-content">
                {
                    label ?
                        <span className="label">{label}</span>
                    : <></>
                }
                <div className="selected-option-area"
                     onClick={() => setIsExpanded(!isExpanded)}>
                    <span className="selected-value">
                        {
                            selectedOption ?
                                <span className="value">{selectedOption.value}</span>
                            :
                                <span className="placeholder">{placeholder || "Select one option"}</span>
                        }
                    </span>
                    <BsFillCaretDownFill className="expand-icon"/>
                </div>
            </div>
            <div className="expandable-content">
                <div className="content">
                    <input className="search-input" 
                           type="text" 
                           placeholder="Search" 
                           value={searchValue}
                           onChange={(e) => setSearchValue(e.currentTarget.value)}/>
                    <SelectInputOptions options={visibleOptions} 
                                        selectedOption={selectedOption}
                                        setSelectedOption={setSelectedOption}/>
                </div>
            </div>
        </div>
    )
}

export default SelectInput

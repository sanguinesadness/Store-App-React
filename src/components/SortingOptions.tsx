import React, {FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { SortingOption as SortingOptionType, SortingOptionAction, SortingOptionState } from '../types/sortingOption';
import SortingOption from './SortingOption';


const SortingOptions: FC = () => {
    const { availableOptions, activeOption } = useTypedSelector(root => root.sorting);

    const [selectedOption, setSelectedOption] = useState<SortingOptionType | null>(activeOption);

    useEffect(() => {
        setSelectedOption(activeOption);
    }, [activeOption]);
    
    return (
        <div className="sorting-options">
            {availableOptions.map(option => 
                <SortingOption key={option.name} 
                               sortingOption={option}
                               setSelectedOption={setSelectedOption}
                               isSelected={Boolean(selectedOption && option.name === selectedOption.name)}/>    
            )}
        </div>
    )
}

export default SortingOptions
import React, { FC, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSortingOptionAction, SortingOption as SortingOptionType } from '../types/sortingOption';

interface SortingOptionProps {
    sortingOption: SortingOptionType;
    setSelectedOption: React.Dispatch<SetStateAction<SortingOptionType | null>>;
    isSelected: boolean;
}

const SortingOption: FC<SortingOptionProps> = ({ sortingOption, setSelectedOption, isSelected }) => {
    const dispatch = useDispatch();
    const [optionState, setOptionState] = useState<SortingOptionType>(sortingOption);

    useEffect(() => {
        dispatch(setActiveSortingOptionAction(optionState));
    }, [optionState]);

    const clickHandler = () => {
        if (isSelected) {
            setOptionState({ ...optionState, ascending: !optionState.ascending });
        }
        else {
            setSelectedOption(optionState);
            dispatch(setActiveSortingOptionAction(optionState));
        }
    }

    return (
        <div className={`sorting-option ${isSelected ? "active" : ""}`} onClick={clickHandler}>
            <span className="name">{optionState.name}</span>
            <span className="type">
                {optionState.ascending ? "🠕" : "🠗"}
            </span>
        </div>
    )
}

export default SortingOption

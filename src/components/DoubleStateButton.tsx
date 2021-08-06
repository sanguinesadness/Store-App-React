import React, { FC, SetStateAction, useState } from 'react';
import { useEffect } from 'react';
import { IconType } from 'react-icons/lib';

export interface DoubleButtonState {
    icon: IconType;
    title: string;
    activeClassName?: string;
    action?: (() => ActionResults) | (() => Promise<ActionResults>);
}

interface DoubleStateButtonProps {
    firstState: DoubleButtonState;
    secondState: DoubleButtonState;
    className?: string;

    // if you want to toggleState() externally, just pass TRUE value as a property
    changeState?: boolean;
    // and do not forget about setting external state to initial (FALSE)
    setChangeState?: React.Dispatch<SetStateAction<boolean>>;
}

export enum ActionResults {
    SUCCESS = "SUCCESS",
    FAIL = "FAIL"
}

enum ButtonStateNames {
    FIRST = "first-state",
    SECOND = "second-state"
}

const DoubleStateButton: FC<DoubleStateButtonProps> = (props) => {
    const [buttonState, setButtonState] = useState<DoubleButtonState>(props.firstState);
    const [buttonStateName, setButtonStateName] = useState<ButtonStateNames>(ButtonStateNames.FIRST);
    const [buttonStateIcon, setButtonStateIcon] = useState<IconType>(props.firstState.icon);

    useEffect(() => {
        if (props.changeState && props.setChangeState) {
            toggleState();
            props.setChangeState(false);
        }
    }, [props.changeState]);

    const toggleState = () => {
        switch (buttonStateName) {
            case ButtonStateNames.FIRST:
                setButtonState(props.secondState);
                setButtonStateName(ButtonStateNames.SECOND);
                setButtonStateIcon(props.secondState.icon);
                break;
            case ButtonStateNames.SECOND:
                setButtonState(props.firstState);
                setButtonStateName(ButtonStateNames.FIRST);
                setButtonStateIcon(props.firstState.icon);
                break;
        }
    }

    const clickHandler = () => {
        let action;

        switch (buttonStateName) {
            case ButtonStateNames.FIRST:
                action = props.firstState.action;
                break;
            case ButtonStateNames.SECOND:
                action = props.secondState.action;
                break;
        }

        if (action) {
            Promise.resolve(action?.()).then(result => {
                if (result === ActionResults.SUCCESS) {
                    toggleState();
                }
            });
        }
        else {
            toggleState();
        }
    }

    return (
        <div className={`double-state-button 
                        ${props.className} 
                        ${buttonState.activeClassName ? buttonState.activeClassName : ""}`} 
                        onClick={clickHandler}>
           <span className="icon-wrapper">{buttonStateIcon}</span>
           <span className="title">{buttonState.title}</span>
        </div>
    )
}

export default DoubleStateButton

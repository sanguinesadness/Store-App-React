import React, { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { setScrollPercentAction } from '../types/scroll';

const calculateScrollPercent = (): number => {
    let doc = document.documentElement;
    let body = document.body;
    let percent = (doc.scrollTop || body.scrollTop) / ((doc.scrollHeight || body.scrollHeight) - doc.clientHeight) * 100;

    return Math.round(percent);
}

const ScrollBar: FC = () => {
    const { percent } = useTypedSelector(root => root.scroll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setScrollPercentAction(calculateScrollPercent()));
        window.addEventListener('scroll', () => dispatch(setScrollPercentAction(calculateScrollPercent())))
    }, [])

    return (
        <div className="scroll-bar">
            <span className="display-bar" style={{ width: `${percent}%` }}></span>
        </div>
    )
}

export default ScrollBar

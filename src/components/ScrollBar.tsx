import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { setScrollPercentAction } from '../types/scroll';

const ScrollBar: FC = () => {
    const calculatePercent = (): number => {
        let doc = document.documentElement;
        let body = document.body;
        let percent = (doc.scrollTop||body.scrollTop) / ((doc.scrollHeight||body.scrollHeight) - doc.clientHeight) * 100;

        return Math.round(percent);
    }

    const { percent } = useTypedSelector(root => root.scroll);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setScrollPercentAction(calculatePercent()));
        window.addEventListener('scroll', () => dispatch(setScrollPercentAction(calculatePercent())))
    }, [])

    return (
        <div className="scroll-bar">
            <span className="display-bar" style={{ width: `${percent}%` }}></span>
        </div>
    )
}

export default ScrollBar

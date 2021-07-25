import React, { FC, useState } from 'react'
import { useEffect } from 'react'

const ScrollBar: FC = () => {
    const calculatePercent = (): number => {
        let doc = document.documentElement;
        let body = document.body;
        let percent = (doc.scrollTop||body.scrollTop) / ((doc.scrollHeight||body.scrollHeight) - doc.clientHeight) * 100;

        return Math.round(percent);
    }

    const [percent, setPercent] = useState<number>(calculatePercent());

    useEffect(() => {
        window.addEventListener('scroll', () => setPercent(calculatePercent()))
    }, [])

    return (
        <div className="scroll-bar">
            <span className="display-bar" style={{ width: `${percent}%` }}></span>
        </div>
    )
}

export default ScrollBar

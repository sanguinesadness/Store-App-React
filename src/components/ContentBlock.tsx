import React, { FC } from 'react';
import { ReactNode } from 'react';

interface ContentBlockProps {
    title?: string;
    className?: string;
    children: ReactNode;
}

const ContentBlock: FC<ContentBlockProps> = ({ title, className, children } ) => {
    return (
        <div className={`content-block ${className}`}>
            {
                title ?
                <span className="content-block__title">{title}</span>
                :
                <></>
            }
            
            <div className="content-block__body">{children}</div>
        </div>
    )
}

export default ContentBlock

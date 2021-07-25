import React, { FC } from 'react';
import idea from '../icons/idea.svg';
import idea_bg from '../icons/idea-bg.svg';
import github from '../icons/github.svg';
import cart from '../icons/wheel-cart.svg';

interface AboutProps {
    onClickScroll: () => void;
}

const About: FC<AboutProps> = (props) => {
    return (
        <div id="about-screen">
            <div className="container">
                <section className="info-section">
                    <h3 className="title">
                        Welcome to our <span className="red-text">fake store</span>, Stranger!
                    </h3>
                    <div className="text">
                        <p>Here you can buy the highest quality and prettiest goods at prices lower than the market average.</p>
                        <p>
                            Our web platform offers four different categories of products: clothing for <b>men</b>, <b>women</b>, <b>jewelry</b> and even <b>electronics</b>. Interested? Then go agead!
                        </p>
                    </div>
                    <div className="buttons">
                        <a className="button with-icon blue" href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <span>View on GitHub</span>
                            <img src={github} alt="" />
                        </a>
                        <button className="with-icon green" onClick={props.onClickScroll}>
                            <span>Start shopping</span>
                            <img src={cart} alt="" />
                        </button>
                    </div>
                </section>
                <section className="picture-section">
                    <img className="picture" src={idea} alt="" />
                    <img className="background" src={idea_bg} alt="" />
                </section>
            </div>
        </div>
    )
}

export default About

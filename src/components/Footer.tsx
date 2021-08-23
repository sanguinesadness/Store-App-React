import React, { FC } from 'react';
import github from '../icons/github-dark.svg';
import vk from '../icons/vk-dark.svg';
import facebook from '../icons/facebook-dark.svg';
import instagram from '../icons/instagram-dark.svg';

const Footer: FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="credits">
                    <span>&copy; Rustam, {new Date().getFullYear()}</span>
                </div>
                <div className="purpose">
                    <span>📚 Made for <b>educational</b> purposes only</span>
                </div>
                <div className="social-links">
                    <a className="vk social-link" href="https://vk.com/id152544760" target="_blank" rel="noopener noreferrer">
                        <img src={vk} alt=""/>
                    </a>
                    <a className="github social-link" href="https://github.com/sanguinesadness" target="_blank" rel="noopener noreferrer">
                        <img src={github} alt=""/>
                    </a>
                    <a className="facebook social-link" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebook} alt=""/>
                    </a>
                    <a className="instagram social-link" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} alt=""/>
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer

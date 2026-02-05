import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './Home.css'; // We will create this specific CSS file or put valid styles in index.css

const Home = () => {
    const navigate = useNavigate();
    const [yesScale, setYesScale] = useState(1);
    const [noPosition, setNoPosition] = useState({ top: '55%', left: '50%', position: 'absolute' });
    const noBtnRef = useRef(null);
    const boundingBoxRef = useRef(null);

    const moveNoButton = () => {
        if (boundingBoxRef.current && noBtnRef.current) {
            const boxRect = boundingBoxRef.current.getBoundingClientRect();
            const btnRect = noBtnRef.current.getBoundingClientRect();

            const newLeft = Math.random() * (boxRect.width - btnRect.width);
            const newTop = Math.random() * (boxRect.height - btnRect.height);

            setNoPosition({
                position: 'absolute',
                left: `${newLeft}px`,
                top: `${newTop}px`
            });
        }
    };

    const increaseYesButtonSize = () => {
        setYesScale(prev => prev * 1.5);
    };

    const handleNoInteraction = () => {
        moveNoButton();
        increaseYesButtonSize();
    };

    const handleYesClick = () => {
        // Send Email
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
            emailjs.send(serviceId, templateId, {}, publicKey)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                }, (error) => {
                    console.log('FAILED...', error);
                });
        } else {
            console.log("EmailJS keys missing in .env");
        }

        navigate('/yes');
    };

    useEffect(() => {
        // Create balloons logic if not strictly CSS
        const createBalloon = () => {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            balloon.style.left = `${Math.random() * window.innerWidth}px`;
            balloon.style.animationDelay = `${Math.random() * 0.1}s`;
            document.body.appendChild(balloon);
            balloon.addEventListener('animationend', () => {
                balloon.remove();
            });
        };

        const intervalId = setInterval(createBalloon, 400);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div id="bounding-box" ref={boundingBoxRef} style={{ width: '90%', height: '90%', position: 'relative', border: '2px dashed transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 className="romantic-title">Will you be my Valentine <span style={{ fontFamily: 'initial' }}>💖</span>?</h1>

            {/* Yes Button */}
            <button
                id="yes-button"
                className="romantic-btn yes-btn"
                onClick={handleYesClick}
                style={{
                    position: 'absolute',
                    left: '40%',
                    top: '55%',
                    zIndex: 1,
                    transform: `scale(${yesScale})`,
                }}
            >
                YES
            </button>

            {/* No Button */}
            <button
                id="no-button"
                className="romantic-btn no-btn"
                ref={noBtnRef}
                onMouseEnter={handleNoInteraction}
                onClick={handleNoInteraction}
                style={{
                    position: 'absolute', // Default, overridden by noPosition
                    ...noPosition
                }}
            >
                NO
            </button>
        </div>
    );
};

export default Home;

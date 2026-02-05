import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import './YesPage.css';

import con1 from '../images/con1.png';
import con2 from '../images/con2.png';
import con3 from '../images/con3.png';

const YesPage = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Use imported images for reliability
        const images = [con1, con2, con3, con1];
        let currentImageIndex = 0;

        const createConfetti = () => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundImage = `url(${images[currentImageIndex]})`;
            currentImageIndex = (currentImageIndex + 1) % images.length;
            document.body.appendChild(confetti);

            // Remove the confetti after the animation to avoid clutter
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 10000);
        };

        // Spawn a confetti immediately
        createConfetti();

        // Spawn a new confetti every 3 seconds
        const interval = setInterval(createConfetti, 3000);

        return () => clearInterval(interval);
    }, []);

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

    const handleSendEmail = (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('sending');
        setErrorMessage('');

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        // Debugging
        console.log("Service ID:", serviceId);
        console.log("Template ID:", templateId);
        console.log("Public Key:", publicKey);

        const templateParams = {
            user_email: email,
            to_email: email,    // Common default
            reply_to: email,    // Common default for auto-replies
            email: email,       // Generic fallback
            to_name: "Valentine", // Fallback for greeting
        };

        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then(() => {
                setStatus('success');
                setEmail('');
            }, (error) => {
                console.error('FAILED...', error);
                setStatus('error');
                setErrorMessage(JSON.stringify(error));
            });
    };

    return (
        <div className="yes-container">
            <div className="content-card">
                <div id="yipee">Yipee! <span style={{ fontFamily: 'initial' }}>🥳</span></div>
                <img id="couple" src="/src/images/image7.gif" alt="Cute couple" />

                <p className="subtitle">I'm so happy! <span style={{ fontFamily: 'initial' }}>💖</span></p>

                <div className="email-section">
                    <p>Enter your email to receive a confirmation:</p>
                    <form onSubmit={handleSendEmail} className="email-form">
                        <input
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'sending' || status === 'success'}
                            className="email-input"
                        />
                        <button
                            type="submit"
                            disabled={status === 'sending' || status === 'success'}
                            className={`send-btn ${status}`}
                        >
                            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent! 💌' : 'Send Confirmation'}
                        </button>
                    </form>
                    {status === 'error' && (
                        <div className="error-msg">
                            <p>Oops, something went wrong.</p>
                            <small style={{ fontSize: '0.7em', color: '#a00' }}>Error: {errorMessage}</small>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YesPage;

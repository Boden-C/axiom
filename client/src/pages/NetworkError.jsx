import React, { useState } from "react";

const NetworkError = () => {
    const [apiEndpoint, setApiEndpoint] = useState("");

    const handleInputChange = (event) => {
        setApiEndpoint(event.target.value);
    };

    return (
        <div className="error-page">
            <div className="error-icon">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <h1>Unable to connect to server</h1>
            <h2>This is either due to network issues or an improper server</h2>
            <p>Try coming back later</p>
            <p>If you are a developer, try a different link to the server</p>
            <div className="input-container">
                <span>Endpoint</span>
                <div className="input-wrapper">
                    <input type="text" value={apiEndpoint} onChange={handleInputChange} placeholder="localhost:5000" />
                    <span>/api</span>
                </div>
            </div>
            <style jsx>{`
                :root {
                    --bg-color: #ffffff;
                    --text-color: #333333;
                    --input-bg: #f0f0f0;
                    --input-text: #333333;
                    --icon-color: #ff4444;
                }

                @media (prefers-color-scheme: dark) {
                    :root {
                        --text-color: #ffffff;
                        --input-bg: #333333;
                        --input-text: #ffffff;
                        --icon-color: #ff6666;
                    }
                }

                .error-page {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    padding: 20px;
                    color: var(--text-color);
                    font-family: Arial, sans-serif;
                }

                .error-icon {
                    width: 64px;
                    height: 64px;
                    margin-bottom: 20px;
                    color: var(--icon-color);
                }

                h1 {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-align: center;
                }

                h2 {
                    font-size: 18px;
                    margin-bottom: 20px;
                    text-align: center;
                    opacity: 0.8;
                }

                p {
                    margin-bottom: 10px;
                    text-align: center;
                    color: gray;
                }

                .input-container {
                    display: flex;
                    align-items: center;
                    background-color: var(--input-bg);
                    border-radius: 4px;
                    padding: 10px;
                    margin-top: 20px;
                    width: 100%;
                    max-width: 400px;
                }

                .input-container span {
                    margin-right: 10px;
                }

                .input-wrapper {
                    display: flex;
                    flex-grow: 1;
                    background-color: var(--bg-color);
                    border-radius: 4px;
                    padding: 5px 10px;
                }

                input {
                    flex-grow: 1;
                    border: none;
                    background: transparent;
                    color: var(--input-text);
                    outline: none;
                }

                input::placeholder {
                    color: var(--input-text);
                    opacity: 0.5;
                }

                .input-wrapper span {
                    color: var(--input-text);
                    opacity: 0.7;
                }
            `}</style>
        </div>
    );
};

export default NetworkError;

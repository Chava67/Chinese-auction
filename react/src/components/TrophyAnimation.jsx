import { useState } from 'react';

const TrophyAnimation = () => {
    const [animate, setAnimate] = useState(false);

    const handleAnimation = () => {
        setAnimate(true);
        setTimeout(() => {
            setAnimate(false);
        }, 3000); // כדי להציג את האנימציה ל-3 שניות
    };

    return (
        <div>
            <button onClick={handleAnimation}>הגרלה</button>
            {animate && (
                <div className="trophy-animation">
                    <svg
                        width="100"
                        height="100"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C9.29 2 7.11 3.91 6.67 6.48H2V9.33C2 11.97 3.92 14 6.5 14C6.19 14.67 6 15.39 6 16.14C6 18.76 8.24 21 10.86 21C13.48 21 15.72 18.76 15.72 16.14C15.72 15.39 15.53 14.67 15.22 14C17.8 14 20 11.8 20 9.33V6.48H15.33C14.89 3.91 12.71 2 10 2ZM6 8.5C6 7.12 7.12 6 8.5 6C9.88 6 11 7.12 11 8.5V9.98C11.03 10 11.05 10.02 11.08 10.04C11.34 10.34 11.7 10.5 12.09 10.5C12.49 10.5 12.86 10.34 13.12 10.04C13.15 10.02 13.17 10 13.2 9.98V8.5C13.2 7.12 14.32 6 15.7 6C17.08 6 18.2 7.12 18.2 8.5V9.33H6V8.5Z"
                            fill="#FFD700"
                        />
                    </svg>
                </div>
            )}
            <style>
                {`
                .trophy-animation {
                    width: 100px;
                    height: 100px;
                    animation: bounce 1s infinite alternate; /* אנימציה בסגנון CSS */
                }

                @keyframes bounce {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-10px);
                    }
                }
                `}
            </style>
        </div>
    );
};

export default TrophyAnimation;

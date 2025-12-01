import React from 'react';

const TextSplitter = ({ text, className = '', delay = 50 }) => {
  return (
    <div className={className} aria-label={text}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            opacity: 0,
            animation: `fadeInUp 0.5s forwards`,
            animationDelay: `${index * delay}ms`,
            whiteSpace: 'pre'
          }}
        >
          {char}
        </span>
      ))}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default TextSplitter;
/**
 * ProgressHearts.jsx
 * Five tiny hearts that fill as the user progresses through slides.
 */
import React from 'react';

function ProgressHearts({ total, current }) {
  return (
    <div className="progress-hearts" aria-label={`Slide ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <svg
          key={i}
          className={`progress-heart ${i <= current ? 'filled' : ''}`}
          width="16" height="15"
          viewBox="0 0 24 22"
        >
          <path
            d="M12 22S0 14 0 7c0-3.9 3.1-7 7-7 2.3 0 4.3 1.1 5 2.8C12.7 1.1 14.7 0 17 0c3.9 0 7 3.1 7 7 0 7-12 15-12 15z"
            fill={i <= current ? '#ff6b8a' : 'rgba(255,107,138,0.2)'}
          />
        </svg>
      ))}
    </div>
  );
}

export default ProgressHearts;

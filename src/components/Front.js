import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CirlImageAnimation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate the total time for the last animation to complete
    // Last letter ('l') has index 3, so delay is 3 * 0.2s = 0.6s, plus 2s animation duration
    const totalAnimationTime = (3 * 0.2 + 2) * 1000; // 2.6s in milliseconds

    const timer = setTimeout(() => {
      // Redirect to the next route after the last animation completes
      navigate('/landing');
    }, totalAnimationTime);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mobile-viewport">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '1px'
      }}>
        {/* Woman Image with Background Square and Bottom-Up Animation */}
        <div style={{
          position: 'relative',
          width: '150px',
          height: '295px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeFromBottom 2s ease-out forwards',
          opacity: 0,
          overflow: 'hidden'
        }}>
          <img
            src="/women.png"
            alt="Woman Silhouette"
            style={{
              width: '120px',
              height: '295px',
              filter: 'brightness(70%) contrast(120%)'
            }}
          />
        </div>

        {/* Letters Container */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '2px',
            alignItems: 'flex-end'
          }}>
            {['c', 'i', 'r', 'l'].map((letter, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: letter === 'l' ? '75px' : '75px',
                  overflow: 'hidden',
                  animation: `fadeFromBottom 2s ease-out ${index * 0.2}s forwards`,
                  opacity: 0
                }}
              >
                <img
                  src={`/${letter}.png`}
                  alt={letter}
                  style={{
                    width: letter === 'i' || letter === 'r' ? '35px' : '55px',
                    height: letter === 'i' || letter === 'r' ? '35px' : '55px',
                    transform: letter === 'l' ? 'rotate(-10deg)' : 'none',
                    transformOrigin: letter === 'l' ? 'bottom center' : 'center',
                    filter: 'brightness(70%) contrast(120%)',
                    position: letter === 'l' ? 'relative' : 'static',
                    top: letter === 'l' ? '-5px' : '0'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Keyframes for Animations */}
      <style>
        {`
          @keyframes fadeFromBottom {
            0% {
              opacity: 0;
              clip-path: inset(100% 0 0 0);
            }
            100% {
              opacity: 1;
              clip-path: inset(0 0 0 0);
            }
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .mobile-viewport {
            width: 375px;
            height: 696px;
            margin: 0 auto;
            border-radius: 20px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            font-family: Arial, sans-serif;
            color: #333333;
            position: relative;
          }
        `}
      </style>
    </div>
  );
};

export default CirlImageAnimation;
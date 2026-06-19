import React, { useEffect, useState, useRef } from 'react';
import { Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [opacity, setOpacity] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Smooth fade-in at startup
    const fadeInTimeout = setTimeout(() => {
      setOpacity(1);
    }, 100);

    // 2. Smooth fade-out before navigation (starts at 9 seconds)
    const fadeOutTimeout = setTimeout(() => {
      setOpacity(0);
    }, 9000);

    // 3. Complete and redirect after exactly 10 seconds
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 10000);

    // Attempt video playback on mount
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Auto-play blocked or failed:', err);
      });
    }

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(fadeOutTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  const handleCanPlay = () => {
    setVideoLoaded(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: '#060913',
        position: 'relative',
        overflow: 'hidden',
        opacity: opacity,
        transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 9999
      }}
    >
      {/* Background radial glow accents */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Main Content Card Wrapper */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          zIndex: 10,
          width: '100%',
          maxWidth: '640px',
          padding: '0 24px',
          boxSizing: 'border-box'
        }}
      >
        {/* Healthcare Animation Video Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: 'rgba(11, 18, 38, 0.6)',
            borderRadius: '24px',
            border: '1px solid rgba(16, 185, 129, 0.15)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.05)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Heartbeat / DNA Helix loading indicator when video is not yet loaded */}
          {!videoLoaded && (
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                zIndex: 2
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 100 30"
                style={{
                  color: 'var(--color-primary, #10b981)',
                  filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))'
                }}
              >
                <path
                  d="M0,15 L30,15 L35,5 L42,28 L48,10 L52,18 L55,15 L100,15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  style={{
                    animation: 'heartbeat-draw 2.5s infinite linear'
                  }}
                />
              </svg>
              <span style={{ fontSize: '12px', color: 'rgba(16, 185, 129, 0.7)', fontWeight: '600', letterSpacing: '0.1em' }}>
                INITIALIZING CLINICAL INTERFACE...
              </span>
            </div>
          )}

          {/* HTML5 Video element */}
          <video
            ref={videoRef}
            muted
            playsInline
            autoPlay
            onCanPlay={handleCanPlay}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: videoLoaded ? 'block' : 'none'
            }}
          >
            {/* Try local path first */}
            <source src="/healthcare_animation.mp4" type="video/mp4" />
            {/* Fallback premium healthcare DNA animation URL */}
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-dna-strand-rotating-on-a-blue-background-49033-large.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Branding details */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'pulse-subtle 2s infinite ease-in-out'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)'
              }}
            >
              <Heart size={18} style={{ color: 'white', fill: 'white' }} />
            </div>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: '800',
                background: 'linear-gradient(90deg, #10b981, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0,
                letterSpacing: '-0.02em'
              }}
            >
              Rural AI Health Assistant
            </h1>
          </div>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--color-text-secondary, #94a3b8)',
              margin: 0,
              fontWeight: '500',
              letterSpacing: '0.01em'
            }}
          >
            Secure access to healthcare assistance
          </p>
        </div>
      </div>

      {/* Inline styles for heartbeat and pulse animation */}
      <style>{`
        @keyframes heartbeat-draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

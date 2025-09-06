import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { colors, gradients, fonts, shadows, textStyles } from '../DesignSystem';
import { TypewriterText } from '../shared/TypewriterText';
import { CameraTransition } from '../shared/CameraTransition';

export const YCProblemSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: gradients.background,
        fontFamily: fonts.family,
      }}
    >
      {/* Problem Section with Dramatic Entrance */}
      <CameraTransition
        type="pan-right"
        startFrame={0}
        endFrame={fps * 3.5} // Extended to 3.5 seconds for problem section
        duration={25}
        easing="spring"
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Problem Background Effects */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${colors.danger[200]}40, ${colors.orange[200]}40)`,
              filter: 'blur(60px)',
              opacity: interpolate(frame, [10, 30], [0, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '15%',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${colors.danger[300]}30, ${colors.slate[400]}30)`,
              filter: 'blur(40px)',
              opacity: interpolate(frame, [15, 35], [0, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          />

          <div style={{ maxWidth: '1000px', zIndex: 2 }}>
            <h1 style={{ margin: '0 0 32px 0' }}>
              <TypewriterText
                text="The Problem"
                startFrame={5}
                fontSize="96px"
                useGradient={true}
                speed={3}
              />
            </h1>
            
            <div style={{ marginBottom: '40px' }}>
              <TypewriterText
                text="70% of investors lose to the market • Investing is lonely and confusing • Most people give up"
                startFrame={50} // Delayed to give more time for title
                fontSize="42px"
                useGradient={false}
                fontWeight="500"
                speed={3} // Slower for better readability
              />
            </div>

            {/* Problem Statistics */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '40px', 
                marginTop: '40px',
                opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), // Delayed for subtitle completion
              }}
            >
              {[
                { stat: '70%', label: 'Underperform Market' },
                { stat: '80%', label: 'Invest Alone' },
                { stat: '60%', label: 'Give Up in 2 Years' },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '12px',
                    border: `2px solid ${colors.danger[200]}`,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div style={{ 
                    fontSize: '32px', 
                    fontWeight: '800', 
                    color: colors.danger[600],
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    {item.stat}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.slate[700], fontWeight: '500' }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </CameraTransition>

      {/* Solution Section with Zoom-in Effect */}
      <CameraTransition
        type="zoom-in"
        startFrame={fps * 3.5} // Start at 3.5s
        endFrame={fps * 6.5} // End at 6.5s (3s duration)
        duration={30}
        easing="spring"
      >
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '80px',
            position: 'relative',
          }}
        >
          {/* Solution Background Effects */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              right: '20%',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${colors.success[200]}50, ${colors.primary[200]}50)`,
              filter: 'blur(80px)',
              opacity: interpolate(frame - fps * 2.5, [20, 40], [0, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '10%',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${colors.primary[300]}40, ${colors.blue[200]}40)`,
              filter: 'blur(50px)',
              opacity: interpolate(frame - fps * 2.5, [25, 45], [0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          />

          <div style={{ maxWidth: '1200px', zIndex: 2 }}>
            <h1 style={{ margin: '0 0 32px 0' }}>
              <TypewriterText
                text="Tickker Changes Everything"
                startFrame={fps * 3.5 + 20} // Adjusted for new timing with more delay
                fontSize="96px"
                useGradient={true}
                speed={3}
              />
            </h1>
            
            <div style={{ marginBottom: '40px' }}>
              <TypewriterText
                text="Join investment groups • Track real performance • Beat the market together"
                startFrame={fps * 3.5 + 60} // Adjusted for new timing with proper spacing
                fontSize="42px"
                useGradient={false}
                fontWeight="500"
                speed={3} // Slower for better readability
              />
            </div>

            {/* Solution Benefits */}
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '32px', 
                marginTop: '40px',
                opacity: interpolate(frame - fps * 3.5, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }), // Delayed for subtitle completion
              }}
            >
              {[
                { icon: '👥', stat: '1,200+', label: 'Active Investors', color: colors.primary[500] },
                { icon: '📈', stat: '+6.3%', label: 'Avg Outperformance', color: colors.success[500] },
                { icon: '🏆', stat: '73%', label: 'Beat the Market', color: colors.blue[500] },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: '24px 20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '16px',
                    border: `2px solid ${item.color}30`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 8px 32px ${item.color}20`,
                    transform: `translateY(${interpolate(frame - fps * 3.5, [80 + index * 8, 100 + index * 8], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ 
                    fontSize: '28px', 
                    fontWeight: '800', 
                    color: item.color,
                    fontFamily: 'JetBrains Mono, monospace',
                    marginBottom: '4px'
                  }}>
                    {item.stat}
                  </div>
                  <div style={{ fontSize: '14px', color: colors.slate[700], fontWeight: '600' }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AbsoluteFill>
      </CameraTransition>

      {/* Transition Text with Slide-up Effect */}
      <CameraTransition
        type="slide-up"
        startFrame={fps * 6.5} // Start near the end
        endFrame={fps * 7} // End at 7s
        duration={15}
        easing="spring"
      >
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <TypewriterText
            text="Here's how it works..."
            startFrame={fps * 6.7} // Start typewriter slightly after transition
            fontSize="28px"
            useGradient={true}
            speed={4}
          />
        </div>
      </CameraTransition>
    </AbsoluteFill>
  );
};
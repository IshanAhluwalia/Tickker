import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { gradients, fonts, textStyles, colors } from '../DesignSystem';
import { TypewriterText } from '../shared/TypewriterText';

export const YCHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Define text sequences with faster overall timing
  const sequences = [
    {
      mainText: "70% of investors",
      subText: "lose to the market every year",
      startFrame: 0,
      endFrame: fps * 2.5,
    },
    {
      mainText: "Most people",  
      subText: "invest alone without guidance or community",
      startFrame: fps * 2.5,
      endFrame: fps * 5,
    },
    {
      mainText: "What if you could",
      subText: "join groups, track performance, and actually win?",
      startFrame: fps * 5,
      endFrame: fps * 8,
    }
  ];

  // Get current sequence
  const currentSequence = sequences.find(seq => 
    frame >= seq.startFrame && frame < seq.endFrame
  ) || sequences[sequences.length - 1]; // Default to last sequence

  return (
    <AbsoluteFill
      style={{
        background: gradients.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: fonts.family,
        padding: '40px',
      }}
    >
      {/* Main text with typewriter and consistent gradient */}
      <div style={{ margin: '0 0 40px 0', textAlign: 'center' }}>
        <TypewriterText
          text={currentSequence.mainText}
          startFrame={currentSequence.startFrame + 2}
          fontSize="120px"
          useGradient={true}
          speed={4}
        />
      </div>

      {/* Sub text with typewriter */}
      <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
        <TypewriterText
          text={currentSequence.subText}
          startFrame={currentSequence.startFrame + 15}
          fontSize="48px"
          useGradient={false}
          fontWeight="500"
          speed={5}
          color={colors.slate[900]}
        />
      </div>

      {/* Brand text at bottom with gradient */}
      {frame >= fps * 7.5 && (
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            textAlign: 'center',
          }}
        >
          <TypewriterText
            text="Meet Tickker"
            startFrame={fps * 7.5}
            fontSize="32px"
            useGradient={true}
            speed={4}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
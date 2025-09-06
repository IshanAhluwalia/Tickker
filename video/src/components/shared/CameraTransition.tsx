import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';

export type TransitionType = 
  | 'pan-right' 
  | 'pan-left' 
  | 'pan-up' 
  | 'pan-down'
  | 'zoom-in' 
  | 'zoom-out'
  | 'rotate-in'
  | 'slide-up'
  | 'slide-down'
  | 'fade';

interface CameraTransitionProps {
  children: React.ReactNode;
  type: TransitionType;
  duration?: number; // frames for transition
  startFrame: number;
  endFrame: number;
  easing?: 'spring' | 'ease' | 'linear';
}

export const CameraTransition: React.FC<CameraTransitionProps> = ({
  children,
  type,
  duration = 30,
  startFrame,
  endFrame,
  easing = 'spring'
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const isActive = frame >= startFrame && frame <= endFrame;
  const isTransitionIn = frame >= startFrame && frame <= startFrame + duration;
  const isTransitionOut = frame >= endFrame - duration && frame <= endFrame;
  const transitionProgress = isTransitionIn 
    ? (frame - startFrame) / duration
    : isTransitionOut 
    ? 1 - (frame - (endFrame - duration)) / duration
    : frame >= startFrame + duration && frame <= endFrame - duration ? 1 : 0;
  
  let transform = '';
  let opacity = 1;
  let scale = 1;
  
  // Apply easing
  let progress = transitionProgress;
  if (easing === 'spring') {
    progress = spring({
      frame: frame - startFrame,
      fps,
      config: {
        damping: 100,
        stiffness: 200,
      },
    });
    progress = Math.min(progress, 1);
  } else if (easing === 'ease') {
    progress = interpolate(transitionProgress, [0, 1], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => t * t * (3 - 2 * t), // smoothstep
    });
  }
  
  switch (type) {
    case 'pan-right':
      transform = `translateX(${interpolate(progress, [0, 1], [-width, 0])}px)`;
      break;
    case 'pan-left':
      transform = `translateX(${interpolate(progress, [0, 1], [width, 0])}px)`;
      break;
    case 'pan-up':
      transform = `translateY(${interpolate(progress, [0, 1], [height, 0])}px)`;
      break;
    case 'pan-down':
      transform = `translateY(${interpolate(progress, [0, 1], [-height, 0])}px)`;
      break;
    case 'zoom-in':
      scale = interpolate(progress, [0, 1], [0.3, 1]);
      opacity = interpolate(progress, [0, 0.3], [0, 1], {
        extrapolateRight: 'clamp',
      });
      break;
    case 'zoom-out':
      scale = interpolate(progress, [0, 1], [1.5, 1]);
      opacity = interpolate(progress, [0, 0.3], [0, 1], {
        extrapolateRight: 'clamp',
      });
      break;
    case 'rotate-in':
      const rotation = interpolate(progress, [0, 1], [45, 0]);
      scale = interpolate(progress, [0, 1], [0.8, 1]);
      transform = `rotate(${rotation}deg)`;
      opacity = interpolate(progress, [0, 0.4], [0, 1], {
        extrapolateRight: 'clamp',
      });
      break;
    case 'slide-up':
      transform = `translateY(${interpolate(progress, [0, 1], [50, 0])}px)`;
      opacity = interpolate(progress, [0, 0.6], [0, 1], {
        extrapolateRight: 'clamp',
      });
      break;
    case 'slide-down':
      transform = `translateY(${interpolate(progress, [0, 1], [-50, 0])}px)`;
      opacity = interpolate(progress, [0, 0.6], [0, 1], {
        extrapolateRight: 'clamp',
      });
      break;
    case 'fade':
    default:
      opacity = progress;
      break;
  }
  
  // Combine transforms
  const finalTransform = `${transform} scale(${scale})`;
  
  if (!isActive) return null;
  
  return (
    <AbsoluteFill
      style={{
        transform: finalTransform,
        opacity,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Pre-configured transition presets for common VC presentation patterns
export const PresenterTransition: React.FC<{
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
}> = ({ children, startFrame, endFrame }) => (
  <CameraTransition
    type="zoom-in"
    startFrame={startFrame}
    endFrame={endFrame}
    duration={20}
    easing="spring"
  >
    {children}
  </CameraTransition>
);

export const FeatureRevealTransition: React.FC<{
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
}> = ({ children, startFrame, endFrame }) => (
  <CameraTransition
    type="slide-up"
    startFrame={startFrame}
    endFrame={endFrame}
    duration={25}
    easing="spring"
  >
    {children}
  </CameraTransition>
);

export const DramaticEntranceTransition: React.FC<{
  children: React.ReactNode;
  startFrame: number;
  endFrame: number;
}> = ({ children, startFrame, endFrame }) => (
  <CameraTransition
    type="rotate-in"
    startFrame={startFrame}
    endFrame={endFrame}
    duration={35}
    easing="spring"
  >
    {children}
  </CameraTransition>
);
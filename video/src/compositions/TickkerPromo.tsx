import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { YCHook } from '../components/ycstyle/YCHook';
import { YCProblemSolution } from '../components/ycstyle/YCProblemSolution';
import { YCFeatureMontage } from '../components/ycstyle/YCFeatureMontage';
import { YCGroupsShowcase } from '../components/ycstyle/YCGroupsShowcase';
import { YCSocialProof } from '../components/ycstyle/YCSocialProof';
import { YCCallToAction } from '../components/ycstyle/YCCallToAction';

export interface TickkerPromoProps {
  titleText: string;
  titleColor: string;
  subtitleText: string;
}

export const TickkerPromo: React.FC<TickkerPromoProps> = ({
  titleText,
  titleColor,
  subtitleText,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Scene timings (in frames) - Extended for proper component rendering
  const hookDuration = fps * 8.5; // 255 frames - Opening hook with full typewriter rendering
  const problemSolutionDuration = fps * 7; // 210 frames - Extended for complete problem/solution rendering
  const featureMontageeDuration = fps * 12; // 360 frames - Extended for all 5 features with full rendering time
  const groupsShowcaseDuration = fps * 7.5; // 225 frames - Groups with live activity and network effects
  const socialProofDuration = fps * 5; // 150 frames - Stats and testimonials
  const ctaDuration = fps * 7; // 210 frames - Complete CTA with all elements
  
  // Total: 8.5 + 7 + 12 + 7.5 + 5 + 7 = 47 seconds = 1410 frames

  // Calculate start times for better readability and debugging
  let currentStartTime = 0;
  const hookStartTime = currentStartTime;
  currentStartTime += hookDuration;
  
  const problemSolutionStartTime = currentStartTime;
  currentStartTime += problemSolutionDuration;
  
  const featureMontageStartTime = currentStartTime;
  currentStartTime += featureMontageeDuration;
  
  const groupsShowcaseStartTime = currentStartTime;
  currentStartTime += groupsShowcaseDuration;
  
  const socialProofStartTime = currentStartTime;
  currentStartTime += socialProofDuration;
  
  const ctaStartTime = currentStartTime;

  return (
    <AbsoluteFill style={{backgroundColor: 'white'}}>
      {/* Hook - Opening attention grabber (0-8.5s) */}
      <Sequence from={hookStartTime} durationInFrames={hookDuration}>
        <YCHook />
      </Sequence>

      {/* Problem/Solution (8.5-15.5s) */}
      <Sequence from={problemSolutionStartTime} durationInFrames={problemSolutionDuration}>
        <YCProblemSolution />
      </Sequence>

      {/* Feature Montage (15.5-27.5s) */}
      <Sequence from={featureMontageStartTime} durationInFrames={featureMontageeDuration}>
        <YCFeatureMontage />
      </Sequence>

      {/* Groups Showcase (27.5-35s) */}
      <Sequence from={groupsShowcaseStartTime} durationInFrames={groupsShowcaseDuration}>
        <YCGroupsShowcase />
      </Sequence>

      {/* Social Proof (35-40s) */}
      <Sequence from={socialProofStartTime} durationInFrames={socialProofDuration}>
        <YCSocialProof />
      </Sequence>

      {/* Call to Action (40-47s) */}
      <Sequence from={ctaStartTime} durationInFrames={ctaDuration}>
        <YCCallToAction />
      </Sequence>
    </AbsoluteFill>
  );
};
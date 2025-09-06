# Tickker Video Timing Guide

## Overall Structure
- **Total Duration**: 47 seconds (1410 frames at 30fps)
- **Resolution**: 1920x1080

## Sequence Breakdown

### 1. YCHook (0-8.5s)
- **Duration**: 8.5 seconds (255 frames)
- **Content**: Opening attention-grabbing statistics with typewriter animations
- **Timing**: Three sequential text blocks with sufficient rendering time

### 2. YCProblemSolution (8.5-15.5s) 
- **Duration**: 7 seconds (210 frames) - Extended for complete problem/solution rendering
- **Content**: Problem statement with camera transitions to solution
- **Camera Effects**:
  - Problem section: Pan-right (0-3.5s) - Extended with proper spacing
  - Solution section: Zoom-in (3.5-6.5s) - Extended timing
  - Transition text: Slide-up (6.5-7s)

### 3. YCFeatureMontage (15.5-27.5s)
- **Duration**: 12 seconds (360 frames) - Extended for all 5 features with full rendering time
- **Content**: Five feature demonstrations with smooth transitions
- **Feature Timing**: Each feature gets 2.4 seconds (72 frames) - Extended for complete animations
  1. Upload & Analyze: 0-2.4s
  2. Smart Stock Search: 2.4-4.8s
  3. Beat the Market: 4.8-7.2s
  4. Track Everything: 7.2-9.6s
  5. Know Your Portfolio: 9.6-12s

### 4. YCGroupsShowcase (27.5-35s)
- **Duration**: 7.5 seconds (225 frames)
- **Content**: Social features with network effects and live activity
- **Feature Timing**: Each feature gets 2.5 seconds (75 frames)
  1. Join Investment Groups: 0-2.5s
  2. Live Group Activity: 2.5-5s
  3. Learn & Win Together: 5-7.5s

### 5. YCSocialProof (35-40s)
- **Duration**: 5 seconds (150 frames)  
- **Content**: Statistics, testimonials, and social validation
- **Timing**: Animated counters and testimonial with spring animations

### 6. YCCallToAction (40-47s)
- **Duration**: 7 seconds (210 frames)
- **Content**: Final call-to-action with value propositions
- **Timing**: Typewriter text, button pulses, and urgency elements

## Animation Principles
- **Fade In/Out**: 0.67 second overlaps between sections for extended components
- **Typewriter Speed**: 3-5 characters per frame for readability
- **Spring Animations**: damping: 100, stiffness: 200 for consistency
- **Progress Timing**: Animations complete at 80% to allow fade-out time
- **Extended Timing**: Components now have 33% more time for complete rendering

## Quality Assurance
- No timing conflicts between sequences
- All animations have sufficient time to complete
- Smooth transitions between sections
- Extended fade timing prevents flashing
- Problem/Solution section properly spaced for complete typewriter animations
- Feature montage allows full rendering of complex demos (file upload, search, charts)
- Total duration matches composition settings (1410 frames)
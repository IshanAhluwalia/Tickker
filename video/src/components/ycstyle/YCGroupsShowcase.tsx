import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from 'remotion';
import { colors, gradients, fonts, shadows, textStyles } from '../DesignSystem';
import { TypewriterText } from '../shared/TypewriterText';
import { CameraTransition } from '../shared/CameraTransition';

export const YCGroupsShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Enhanced social features with proper timing for 7.5-second duration (225 frames)
  const features = [
    {
      title: "Join Investment Groups",
      subtitle: "Connect with like-minded investors instantly",
      startFrame: 0,
      duration: fps * 2.5, // 75 frames (0-2.5s)
      demo: "Groups",
    },
    {
      title: "Live Group Activity", 
      subtitle: "See real-time trades, discussions, and performance",
      startFrame: fps * 2.5, // Start at frame 75
      duration: fps * 2.5, // 75 frames (2.5-5s)
      demo: "LiveActivity",
    },
    {
      title: "Learn & Win Together",
      subtitle: "Share strategies and outperform the market as a team", 
      startFrame: fps * 5, // Start at frame 150
      duration: fps * 2.5, // 75 frames (5-7.5s, ends at frame 225)
      demo: "Community",
    },
  ];

  const renderDemo = (demoType: string, progress: number) => {
    const scale = 1.2;
    
    switch (demoType) {
      case "Groups":
        const groups = [
          { name: 'Growth Investors', members: 127, activity: 'High', color: colors.success[500], icon: '📈' },
          { name: 'Value Hunters', members: 89, activity: 'Active', color: colors.blue[500], icon: '💎' },
          { name: 'Tech Enthusiasts', members: 156, activity: 'Very High', color: colors.purple[500], icon: '🚀' }
        ];
        
        return (
          <div
            style={{
              transform: `scale(${scale})`,
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Network Effect Visualization */}
            <svg 
              width="800" 
              height="300" 
              style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
            >
              {progress > 0.5 && groups.map((_, groupIndex) => 
                groups.slice(groupIndex + 1).map((_, targetIndex) => {
                  const actualTargetIndex = targetIndex + groupIndex + 1;
                  return (
                    <line
                      key={`${groupIndex}-${actualTargetIndex}`}
                      x1={150 + groupIndex * 240}
                      y1={150}
                      x2={150 + actualTargetIndex * 240}
                      y2={150}
                      stroke={colors.primary[300]}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity={progress > 0.5 + (groupIndex + actualTargetIndex) * 0.1 ? 0.6 : 0}
                      style={{
                        animation: 'dash 2s linear infinite'
                      }}
                    />
                  );
                })
              )}
            </svg>
            
            {groups.map((group, index) => {
              const cardProgress = Math.max(0, (progress - index * 0.2) / 0.8);
              const memberCount = Math.floor(group.members * Math.min(cardProgress * 1.2, 1));
              
              return (
                <div
                  key={group.name}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    border: `2px solid ${group.color}40`,
                    minWidth: '220px',
                    textAlign: 'center',
                    opacity: progress > index * 0.2 ? 1 : 0.2,
                    transform: `translateY(${progress > index * 0.2 ? 0 : 20}px) scale(${progress > index * 0.2 ? 1 : 0.95})`,
                    boxShadow: `0 8px 32px ${group.color}20`,
                    position: 'relative',
                    zIndex: 2,
                    transition: 'all 0.4s ease',
                  }}
                >
                  <div style={{ 
                    fontSize: '32px', 
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    {group.icon}
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: group.color,
                      animation: progress > index * 0.2 + 0.3 ? 'pulse 2s infinite' : 'none'
                    }} />
                  </div>
                  
                  <h4 style={{ fontSize: '18px', margin: '0 0 12px 0', color: colors.slate[900], fontWeight: '600' }}>
                    {group.name}
                  </h4>
                  
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: group.color,
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      {memberCount}
                    </span>
                    <span style={{ fontSize: '14px', color: colors.slate[600], marginLeft: '4px' }}>
                      members
                    </span>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    backgroundColor: `${group.color}10`,
                    borderRadius: '6px',
                    border: `1px solid ${group.color}30`,
                  }}>
                    <span style={{ fontSize: '12px', color: group.color, fontWeight: '600' }}>
                      {group.activity} Activity
                    </span>
                  </div>
                  
                  {/* Join Button Animation */}
                  {progress > index * 0.2 + 0.5 && (
                    <div style={{
                      marginTop: '16px',
                      opacity: progress > index * 0.2 + 0.5 ? 1 : 0,
                    }}>
                      <button style={{
                        backgroundColor: group.color,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transform: `scale(${spring({
                          frame: frame - index * 15,
                          fps,
                          config: { damping: 100, stiffness: 200 }
                        })})`,
                      }}>
                        Join Group
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
        
      case "LiveActivity":
        const activities = [
          { user: 'Alex M.', action: 'bought', symbol: 'NVDA', amount: '$2.3K', time: '2m ago', type: 'trade' },
          { user: 'Sarah K.', action: 'shared analysis', symbol: 'AAPL', content: '"Bullish on earnings"', time: '4m ago', type: 'insight' },
          { user: 'Mike R.', action: 'achieved', symbol: '🏆', content: '+30% milestone', time: '6m ago', type: 'achievement' },
          { user: 'Emma L.', action: 'joined group', symbol: '👋', content: 'Growth Investors', time: '8m ago', type: 'social' },
        ];
        
        return (
          <div
            style={{
              transform: `scale(${scale})`,
              display: 'flex',
              gap: '32px',
              alignItems: 'flex-start',
            }}
          >
            {/* Live Activity Feed */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: `2px solid ${colors.primary[200]}`,
              minWidth: '400px',
              boxShadow: shadows.lg,
              position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', margin: 0, color: colors.slate[900], fontWeight: '600' }}>
                  Live Group Activity
                </h3>
                <div style={{
                  marginLeft: '8px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: colors.success[500],
                  animation: 'pulse 2s infinite'
                }} />
              </div>
              
              {activities.map((activity, index) => (
                <div
                  key={index}
                  style={{
                    opacity: progress > index * 0.2 ? 1 : 0,
                    transform: `translateY(${progress > index * 0.2 ? 0 : 10}px)`,
                    transition: 'all 0.4s ease',
                    marginBottom: '16px',
                    padding: '16px',
                    backgroundColor: colors.slate[50],
                    borderRadius: '12px',
                    border: `1px solid ${colors.slate[200]}`,
                    position: 'relative',
                  }}
                >
                  {/* Activity Type Indicator */}
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    top: '12px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: activity.type === 'trade' ? colors.success[500] :
                                    activity.type === 'insight' ? colors.blue[500] :
                                    activity.type === 'achievement' ? colors.orange[500] :
                                    colors.primary[500],
                  }} />
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: colors.slate[900] }}>
                          {activity.user}
                        </span>
                        <span style={{ fontSize: '14px', color: colors.slate[600] }}>
                          {activity.action}
                        </span>
                        <span style={{ 
                          fontSize: '14px', 
                          fontWeight: '600', 
                          color: activity.type === 'trade' ? colors.primary[600] : colors.slate[700],
                          fontFamily: activity.type === 'trade' ? 'JetBrains Mono, monospace' : 'inherit'
                        }}>
                          {activity.symbol}
                        </span>
                      </div>
                      {activity.content && (
                        <div style={{ fontSize: '12px', color: colors.slate[600], fontStyle: 'italic' }}>
                          {activity.content}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.slate[500] }}>
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* More Activity Indicator */}
              {progress > 0.8 && (
                <div style={{
                  textAlign: 'center',
                  padding: '12px',
                  color: colors.primary[600],
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: progress > 0.8 ? 1 : 0,
                }}>
                  + 23 more activities in the last hour
                </div>
              )}
            </div>
            
            {/* Real-time Performance Panel */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              border: `2px solid ${colors.success[200]}`,
              minWidth: '300px',
              boxShadow: shadows.lg,
            }}>
              <h3 style={{ fontSize: '18px', margin: '0 0 20px 0', color: colors.slate[900], fontWeight: '600', textAlign: 'center' }}>
                Group Performance
              </h3>
              
              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '36px', 
                  fontWeight: '800', 
                  color: colors.success[600],
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  +{Math.floor(progress * 8.7 + 25.3)}%
                </div>
                <div style={{ fontSize: '14px', color: colors.slate[600] }}>
                  Group Average Return
                </div>
              </div>
              
              {/* Active Traders */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: colors.slate[700], fontWeight: '600', marginBottom: '8px' }}>
                  Active Now ({Math.floor(progress * 12 + 8)})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['AM', 'SK', 'MR', 'EL', 'JD', 'TC'].slice(0, Math.floor(progress * 6) + 2).map((initials, index) => (
                    <div
                      key={index}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: colors.primary[100],
                        border: `2px solid ${colors.primary[300]}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: colors.primary[700],
                        position: 'relative',
                      }}
                    >
                      {initials}
                      <div style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: colors.success[500],
                        border: '2px solid white',
                      }} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Network Effect Stats */}
              <div style={{ 
                padding: '16px', 
                backgroundColor: colors.primary[50], 
                borderRadius: '12px',
                border: `1px solid ${colors.primary[200]}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: colors.slate[600] }}>Network Boost</span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: colors.success[600] }}>
                    +{(progress * 2.3 + 4.2).toFixed(1)}%
                  </span>
                </div>
                <div style={{ fontSize: '10px', color: colors.slate[500] }}>
                  vs individual investing
                </div>
              </div>
            </div>
          </div>
        );
        
      case "Leaderboard":
        const leaderboard = [
          { name: 'You', return: '+28.4%', rank: 2, trend: '+0.8%', avatar: 'YOU' },
          { name: 'Alex M.', return: '+31.2%', rank: 1, trend: '+1.2%', avatar: 'AM' },
          { name: 'Sarah K.', return: '+24.1%', rank: 3, trend: '+0.5%', avatar: 'SK' },
          { name: 'Mike R.', return: '+22.8%', rank: 4, trend: '+2.1%', avatar: 'MR' },
          { name: 'Emma L.', return: '+21.3%', rank: 5, trend: '+0.3%', avatar: 'EL' },
        ];
        
        return (
          <div
            style={{
              transform: `scale(${scale})`,
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              border: `2px solid ${colors.success[300]}`,
              minWidth: '700px',
              boxShadow: shadows.lg,
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '24px', margin: 0, color: colors.slate[900], textAlign: 'center' }}>
                Growth Investors Leaderboard
              </h3>
              <div style={{
                marginLeft: '12px',
                padding: '4px 8px',
                backgroundColor: colors.success[100],
                color: colors.success[700],
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '6px',
                border: `1px solid ${colors.success[300]}`,
              }}>
                Live Updates
              </div>
            </div>
            
            {leaderboard.map((member, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  marginBottom: '12px',
                  backgroundColor: member.name === 'You' ? colors.primary[50] : colors.slate[50],
                  borderRadius: '12px',
                  border: member.name === 'You' ? `2px solid ${colors.primary[300]}` : `1px solid ${colors.slate[200]}`,
                  opacity: progress > index * 0.15 ? 1 : 0,
                  transform: `translateY(${progress > index * 0.15 ? 0 : 10}px)`,
                  transition: 'all 0.4s ease',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: index === 0 ? colors.orange[500] : 
                          index === 1 ? colors.slate[400] :
                          index === 2 ? colors.orange[600] : colors.slate[600],
                    minWidth: '24px',
                    textAlign: 'center',
                  }}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${member.rank}`}
                  </div>
                  
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: member.name === 'You' ? colors.primary[100] : colors.slate[200],
                    border: `2px solid ${member.name === 'You' ? colors.primary[300] : colors.slate[300]}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: member.name === 'You' ? colors.primary[700] : colors.slate[700],
                  }}>
                    {member.avatar}
                  </div>
                  
                  <span style={{ fontSize: '16px', fontWeight: '600', color: colors.slate[900] }}>
                    {member.name}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '18px', 
                      fontWeight: '700', 
                      color: colors.success[600],
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      {member.return}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: member.trend.startsWith('+') ? colors.success[600] : colors.danger[600],
                      fontWeight: '500'
                    }}>
                      {member.trend} today
                    </div>
                  </div>
                  
                  {/* Position Change Indicator */}
                  {progress > index * 0.15 + 0.3 && index < 3 && (
                    <div style={{
                      fontSize: '12px',
                      color: colors.success[600],
                      backgroundColor: colors.success[100],
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: `1px solid ${colors.success[200]}`,
                      opacity: progress > index * 0.15 + 0.3 ? 1 : 0,
                    }}>
                      ↗ +{index + 1}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Competition Stats */}
            {progress > 0.7 && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                backgroundColor: colors.success[50],
                borderRadius: '12px',
                border: `1px solid ${colors.success[200]}`,
                textAlign: 'center',
                opacity: progress > 0.7 ? 1 : 0,
              }}>
                <div style={{ fontSize: '14px', color: colors.slate[700], marginBottom: '8px' }}>
                  Group vs Market: <span style={{ fontWeight: '700', color: colors.success[600] }}>+6.3% ahead of SPY</span>
                </div>
                <div style={{ fontSize: '12px', color: colors.slate[600] }}>
                  127 members • Updated every 5 minutes
                </div>
              </div>
            )}
          </div>
        );
        
      case "Community":
        return (
          <div
            style={{
              transform: `scale(${scale})`,
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            {/* Chat mockup */}
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                border: `2px solid ${colors.slate[300]}`,
                minWidth: '300px',
                boxShadow: shadows.md,
              }}
            >
              <h4 style={{ fontSize: '18px', margin: '0 0 16px 0', color: colors.slate[900] }}>
                💬 Group Chat
              </h4>
              {[
                { user: 'Alex', msg: 'Just bought more AAPL!' },
                { user: 'You', msg: 'Nice! I\'m up 8% this month' },
                { user: 'Sarah', msg: 'Check out my analysis 📊' },
              ].map((chat, index) => (
                <div
                  key={index}
                  style={{
                    opacity: progress > index * 0.3 ? 1 : 0,
                    marginBottom: '8px',
                    padding: '8px',
                    backgroundColor: chat.user === 'You' ? colors.primary[100] : colors.slate[100],
                    borderRadius: '8px',
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: '600', color: colors.slate[700] }}>
                    {chat.user}:
                  </span>
                  <span style={{ fontSize: '12px', color: colors.slate[600], marginLeft: '4px' }}>
                    {chat.msg}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Performance boost */}
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                border: `2px solid ${colors.success[300]}`,
                textAlign: 'center',
                minWidth: '250px',
                boxShadow: shadows.md,
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
              <h4 style={{ fontSize: '20px', margin: '0 0 8px 0', color: colors.slate[900] }}>
                Group Boost
              </h4>
              <p style={{ fontSize: '32px', fontWeight: '700', color: colors.success[600], margin: 0 }}>
                +6.3%
              </p>
              <p style={{ fontSize: '14px', color: colors.slate[600], margin: '4px 0 0 0' }}>
                vs individual investing
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <AbsoluteFill
      style={{
        background: gradients.background, // Consistent light background
        fontFamily: fonts.family,
        padding: '80px',
      }}
    >
      {features.map((feature, index) => {
        const isActive = frame >= feature.startFrame && frame < (feature.startFrame + feature.duration);
        if (!isActive) return null;

        const featureFrame = frame - feature.startFrame;
        const progress = Math.min(featureFrame / (feature.duration * 0.8), 1); // Animation completes at 80% to allow fade out
        
        // Smooth fade in/out with sufficient overlap to prevent flashing  
        const fadeInDuration = 12; // 0.4 seconds
        const fadeOutDuration = 12; // 0.4 seconds
        const opacity = interpolate(
          featureFrame, 
          [0, fadeInDuration, feature.duration - fadeOutDuration, feature.duration], 
          [0, 1, 1, 0], 
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const slideY = interpolate(featureFrame, [0, 18], [15, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              opacity,
              transform: `translateY(${slideY}px)`,
              padding: '80px',
            }}
          >
            {/* Feature title with purple gradient */}
            <div style={{ textAlign: 'center', marginBottom: '20px', maxWidth: '1000px' }}>
              <h2 style={{ margin: '0 0 16px 0' }}>
                <TypewriterText
                  text={feature.title}
                  startFrame={feature.startFrame + 5}
                  fontSize="80px"
                  useGradient={true} // Purple gradient
                  speed={5}
                />
              </h2>
              <p style={{ margin: 0 }}>
                <TypewriterText
                  text={feature.subtitle}
                  startFrame={feature.startFrame + 20}
                  fontSize="36px"
                  useGradient={false} // Black text
                  fontWeight="500"
                  speed={6}
                />
              </p>
            </div>

            {/* Feature demo */}
            <div>
              {renderDemo(feature.demo, progress)}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
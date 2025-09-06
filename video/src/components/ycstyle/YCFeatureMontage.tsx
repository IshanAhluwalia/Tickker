import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { colors, gradients, fonts, shadows } from '../DesignSystem';
import { TypewriterText } from '../shared/TypewriterText';

export const YCFeatureMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Feature showcases with proper timing for 12-second total duration (360 frames) - Extended for full rendering
  const features = [
    {
      title: "Upload & Analyze",
      subtitle: "Drag. Drop. Done.",
      demo: "FileUpload",
      startFrame: 0,
      duration: fps * 2.4, // 72 frames (0-2.4s)
    },
    {
      title: "Smart Stock Search", 
      subtitle: "Find and analyze any stock instantly",
      demo: "Search",
      startFrame: fps * 2.4, // Start at frame 72
      duration: fps * 2.4, // 72 frames (2.4-4.8s)
    },
    {
      title: "Beat the Market",
      subtitle: "See exactly how you perform vs SPY", 
      demo: "GrowthChart",
      startFrame: fps * 4.8, // Start at frame 144
      duration: fps * 2.4, // 72 frames (4.8-7.2s)
    },
    {
      title: "Track Everything",
      subtitle: "Performance metrics that matter",
      demo: "Metrics",
      startFrame: fps * 7.2, // Start at frame 216
      duration: fps * 2.4, // 72 frames (7.2-9.6s)
    },
    {
      title: "Know Your Portfolio", 
      subtitle: "Allocation breakdown at a glance",
      demo: "Allocation",
      startFrame: fps * 9.6, // Start at frame 288
      duration: fps * 2.4, // 72 frames (9.6-12s, ends at frame 360)
    },
  ];

  const renderFeatureDemo = (demo: string, progress: number) => {
    const scale = 1.2; // Make components larger to fill 80% of screen
    
    switch (demo) {
      case "FileUpload":
        const uploadProgress = Math.min(progress * 1.2, 1);
        const isUploading = progress > 0.3 && progress < 0.8;
        const isComplete = progress >= 0.8;
        
        return (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              position: 'relative',
            }}
          >
            {/* Drag & Drop Zone */}
            <div
              style={{
                border: `2px dashed ${isUploading || isComplete ? colors.primary[400] : colors.primary[300]}`,
                borderRadius: '16px',
                padding: '60px 40px',
                backgroundColor: isUploading || isComplete ? colors.primary[100] : colors.primary[50],
                textAlign: 'center',
                width: '500px',
                position: 'relative',
                transition: 'all 0.3s ease',
                transform: isUploading ? 'scale(0.98)' : 'scale(1)',
              }}
            >
              {!isUploading && !isComplete && (
                <>
                  <div style={{ fontSize: '48px', marginBottom: '20px', opacity: progress > 0.1 ? 1 : 0 }}>
                    📊
                  </div>
                  <h3 style={{ 
                    fontSize: '24px', 
                    color: colors.slate[900], 
                    margin: '0 0 12px 0',
                    fontWeight: '600',
                    opacity: progress > 0.15 ? 1 : 0
                  }}>
                    Drop your portfolio file here
                  </h3>
                  <p style={{ 
                    fontSize: '16px', 
                    color: colors.slate[600], 
                    margin: '0 0 16px 0',
                    opacity: progress > 0.2 ? 1 : 0
                  }}>
                    Supports CSV, Excel, and brokerage exports
                  </p>
                  
                  {/* Simulated file hovering */}
                  {progress > 0.25 && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      opacity: progress > 0.25 ? 1 : 0,
                      transform: `translateY(${progress > 0.28 ? 0 : -10}px)`,
                    }}>
                      <div style={{ fontSize: '16px' }}>📄</div>
                      <span style={{ fontSize: '14px', color: colors.slate[700], fontWeight: '500' }}>
                        Accounts_History.csv
                      </span>
                      <span style={{ fontSize: '12px', color: colors.slate[500] }}>
                        156 KB
                      </span>
                    </div>
                  )}
                </>
              )}
              
              {/* Upload Progress */}
              {isUploading && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                  <div style={{ fontSize: '48px' }}>⬆️</div>
                  <h3 style={{ fontSize: '20px', color: colors.primary[700], margin: 0, fontWeight: '600' }}>
                    Analyzing your portfolio...
                  </h3>
                  
                  {/* Progress Bar */}
                  <div style={{ width: '300px', height: '8px', backgroundColor: colors.slate[200], borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: colors.primary[500],
                      borderRadius: '4px',
                      width: `${(uploadProgress - 0.3) / 0.5 * 100}%`,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                    <span style={{ fontSize: '12px', color: colors.slate[600] }}>
                      ✓ {Math.floor((uploadProgress - 0.3) / 0.5 * 347)} transactions processed
                    </span>
                    <span style={{ fontSize: '12px', color: colors.primary[600], fontWeight: '500' }}>
                      {Math.floor((uploadProgress - 0.3) / 0.5 * 100)}%
                    </span>
                  </div>
                </div>
              )}
              
              {/* Upload Complete */}
              {isComplete && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '48px' }}>✅</div>
                  <h3 style={{ fontSize: '20px', color: colors.success[700], margin: 0, fontWeight: '600' }}>
                    Portfolio uploaded successfully!
                  </h3>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '16px', 
                    marginTop: '16px',
                    width: '100%',
                    maxWidth: '350px'
                  }}>
                    <div style={{ textAlign: 'center', padding: '12px', backgroundColor: 'white', borderRadius: '8px' }}>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary[600] }}>347</div>
                      <div style={{ fontSize: '12px', color: colors.slate[600] }}>Transactions</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '12px', backgroundColor: 'white', borderRadius: '8px' }}>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary[600] }}>23</div>
                      <div style={{ fontSize: '12px', color: colors.slate[600] }}>Holdings</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '12px', backgroundColor: 'white', borderRadius: '8px' }}>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: colors.success[600] }}>+28.4%</div>
                      <div style={{ fontSize: '12px', color: colors.slate[600] }}>Total Return</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '12px', backgroundColor: 'white', borderRadius: '8px' }}>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary[600] }}>A+</div>
                      <div style={{ fontSize: '12px', color: colors.slate[600] }}>Grade</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
        
      case "Search":
        const searchSteps = [
          { text: '', suggestions: [] },
          { text: 'A', suggestions: ['AAPL', 'AMD', 'AMZN', 'ADBE', 'AVGO'] },
          { text: 'AP', suggestions: ['AAPL - Apple Inc.', 'APH - Amphenol Corp.', 'APD - Air Products'] },
          { text: 'APP', suggestions: ['AAPL - Apple Inc.'] },
          { text: 'APPL', suggestions: ['AAPL - Apple Inc.'] },
          { text: 'APPLE', suggestions: ['AAPL - Apple Inc.'] },
          { text: 'AAPL', suggestions: ['AAPL - Apple Inc.'], selected: true }
        ];
        
        const currentStepIndex = Math.min(Math.floor(progress * searchSteps.length), searchSteps.length - 1);
        const currentStep = searchSteps[currentStepIndex];
        const isAnalyzing = progress > 0.7 && currentStep.selected;
        
        return (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {/* Search Interface */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              border: `1px solid ${colors.slate[200]}`,
              width: '600px',
              boxShadow: shadows.lg,
              position: 'relative',
            }}>
              <h3 style={{ 
                fontSize: '20px', 
                color: colors.slate[900], 
                margin: '0 0 24px 0', 
                fontWeight: '600',
                textAlign: 'center'
              }}>
                Add New Stock to Portfolio
              </h3>
              
              {/* Search Bar */}
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  border: `2px solid ${currentStep.selected ? colors.success[400] : colors.primary[300]}`,
                  borderRadius: '12px',
                  backgroundColor: colors.slate[50],
                  padding: '16px 20px',
                  fontSize: '18px',
                  fontFamily: 'JetBrains Mono, monospace',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{ fontSize: '20px', marginRight: '12px', color: colors.slate[500] }}>🔍</div>
                  <span style={{ color: colors.slate[900], fontWeight: '500' }}>
                    {currentStep.text}
                    {progress < 0.7 && (
                      <span style={{ 
                        animation: 'blink 1s infinite',
                        color: colors.primary[500],
                        fontWeight: '300'
                      }}>|</span>
                    )}
                  </span>
                </div>
                
                {/* Search Suggestions Dropdown */}
                {currentStep.suggestions.length > 0 && !isAnalyzing && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    border: `1px solid ${colors.slate[200]}`,
                    borderRadius: '8px',
                    boxShadow: shadows.lg,
                    zIndex: 10,
                    marginTop: '4px',
                    overflow: 'hidden',
                  }}>
                    {currentStep.suggestions.slice(0, 3).map((suggestion, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '12px 16px',
                          borderBottom: index < 2 ? `1px solid ${colors.slate[100]}` : 'none',
                          backgroundColor: index === 0 ? colors.primary[50] : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          backgroundColor: colors.primary[100],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: '600',
                          color: colors.primary[700],
                        }}>
                          {suggestion.split(' ')[0]}
                        </div>
                        <div>
                          <div style={{ 
                            fontSize: '14px', 
                            fontWeight: '600', 
                            color: colors.slate[900],
                            fontFamily: 'JetBrains Mono, monospace'
                          }}>
                            {suggestion.includes(' - ') ? suggestion.split(' - ')[0] : suggestion}
                          </div>
                          {suggestion.includes(' - ') && (
                            <div style={{ fontSize: '12px', color: colors.slate[600] }}>
                              {suggestion.split(' - ')[1]}
                            </div>
                          )}
                        </div>
                        {index === 0 && (
                          <div style={{ marginLeft: 'auto', fontSize: '12px', color: colors.primary[600] }}>
                            ↵ Select
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Stock Analysis Results */}
              {isAnalyzing && (
                <div style={{
                  padding: '24px',
                  backgroundColor: colors.success[50],
                  borderRadius: '12px',
                  border: `1px solid ${colors.success[200]}`,
                  marginBottom: '16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: colors.primary[100],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: colors.primary[700],
                      marginRight: '16px',
                    }}>
                      AAPL
                    </div>
                    <div>
                      <h4 style={{ 
                        fontSize: '18px', 
                        color: colors.slate[900], 
                        margin: '0 0 4px 0', 
                        fontWeight: '600' 
                      }}>
                        Apple Inc.
                      </h4>
                      <p style={{ fontSize: '14px', color: colors.slate[600], margin: 0 }}>
                        Technology • NASDAQ
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '24px', 
                        fontWeight: '700', 
                        color: colors.success[600],
                        fontFamily: 'JetBrains Mono, monospace'
                      }}>
                        $173.50
                      </div>
                      <div style={{ fontSize: '12px', color: colors.slate[600] }}>Current Price</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '24px', 
                        fontWeight: '700', 
                        color: colors.success[600],
                        fontFamily: 'JetBrains Mono, monospace'
                      }}>
                        +2.8%
                      </div>
                      <div style={{ fontSize: '12px', color: colors.slate[600] }}>Today</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ 
                        fontSize: '24px', 
                        fontWeight: '700', 
                        color: colors.primary[600],
                        fontFamily: 'JetBrains Mono, monospace'
                      }}>
                        A+
                      </div>
                      <div style={{ fontSize: '12px', color: colors.slate[600] }}>Grade</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button style={{
                  backgroundColor: isAnalyzing ? colors.success[500] : colors.slate[300],
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}>
                  {isAnalyzing ? '+ Add to Portfolio' : 'Search Stock'}
                </button>
                <button style={{
                  backgroundColor: 'transparent',
                  color: colors.slate[600],
                  border: `1px solid ${colors.slate[300]}`,
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}>
                  View Analysis
                </button>
              </div>
            </div>
            
            {/* Quick Stats */}
            {progress > 0.5 && (
              <div style={{ 
                display: 'flex', 
                gap: '16px', 
                opacity: progress > 0.6 ? 1 : 0,
                transition: 'all 0.4s ease'
              }}>
                {[
                  { label: 'Stocks Analyzed', value: '2.3K+', icon: '📊' },
                  { label: 'Avg Search Time', value: '<0.5s', icon: '⚡' },
                  { label: 'Success Rate', value: '99.8%', icon: '🎯' }
                ].map((stat, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '16px 20px',
                      textAlign: 'center',
                      border: `1px solid ${colors.slate[200]}`,
                      boxShadow: shadows.sm,
                      minWidth: '120px',
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                    <div style={{ 
                      fontSize: '18px', 
                      fontWeight: '700', 
                      color: colors.primary[600],
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.slate[600] }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case "GrowthChart":
        return (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '32px',
                border: `1px solid ${colors.slate[200]}`,
                width: '600px',
                height: '350px',
                boxShadow: shadows.lg,
                position: 'relative',
              }}
            >
              {/* Chart Title */}
              <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '18px', color: colors.slate[900], margin: '0 0 4px 0', fontWeight: '600' }}>
                  Portfolio vs Market Performance
                </h3>
                <p style={{ fontSize: '12px', color: colors.slate[600], margin: 0 }}>Last 12 months</p>
              </div>
              
              <svg width="100%" height="220" viewBox="0 0 500 200">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <g key={`grid-${i}`}>
                    <line
                      x1="40" y1={30 + i * 35} x2="460" y2={30 + i * 35}
                      stroke={colors.slate[200]}
                      strokeWidth="1"
                      opacity={progress > 0.1 ? 0.5 : 0}
                    />
                    <text
                      x="30" y={35 + i * 35}
                      fontSize="10"
                      fill={colors.slate[500]}
                      textAnchor="end"
                      opacity={progress > 0.1 ? 1 : 0}
                    >
                      {40 - i * 10}%
                    </text>
                  </g>
                ))}
                
                {/* X-axis labels */}
                {['Jan', 'Apr', 'Jul', 'Oct', 'Dec'].map((month, i) => (
                  <text
                    key={month}
                    x={60 + i * 85}
                    y="195"
                    fontSize="10"
                    fill={colors.slate[500]}
                    textAnchor="middle"
                    opacity={progress > 0.2 ? 1 : 0}
                  >
                    {month}
                  </text>
                ))}
                
                {/* Data points for portfolio */}
                {progress > 0.3 && [
                  { x: 60, y: 150, value: '+12.3%' },
                  { x: 145, y: 130, value: '+18.7%' },
                  { x: 230, y: 110, value: '+24.2%' },
                  { x: 315, y: 95, value: '+29.8%' },
                  { x: 400, y: 70, value: '+35.1%' }
                ].map((point, i) => (
                  <g key={`point-${i}`} opacity={progress > 0.3 + i * 0.1 ? 1 : 0}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="4"
                      fill={colors.primary[600]}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="8"
                      fill={colors.primary[600]}
                      opacity="0.2"
                    />
                  </g>
                ))}
                
                {/* Portfolio line with sophisticated animation */}
                <path
                  d="M60,150 L145,130 L230,110 L315,95 L400,70"
                  fill="none"
                  stroke={colors.primary[600]}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 340} 340`}
                  filter="drop-shadow(0 2px 4px rgba(79, 70, 229, 0.2))"
                />
                
                {/* SPY line */}
                <path
                  d="M60,150 L145,140 L230,125 L315,115 L400,105"
                  fill="none"
                  stroke={colors.slate[400]}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  strokeDashoffset={`${(1 - progress) * 340}`}
                  opacity={progress > 0.4 ? 1 : 0}
                />
                
                {/* Performance highlight area */}
                <path
                  d="M60,150 L145,130 L230,110 L315,95 L400,70 L400,105 L315,115 L230,125 L145,140 L60,150"
                  fill="url(#performanceGradient)"
                  opacity={progress > 0.7 ? 0.2 : 0}
                />
                
                <defs>
                  <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={colors.primary[500]} />
                    <stop offset="100%" stopColor={colors.success[400]} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Enhanced performance metrics */}
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
                <div style={{ textAlign: 'center', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      backgroundColor: colors.primary[600],
                      marginRight: '6px'
                    }} />
                    <p style={{ fontSize: '12px', color: colors.slate[600], margin: 0 }}>Your Portfolio</p>
                  </div>
                  <p style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: colors.success[600], 
                    margin: 0,
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    +35.1%
                  </p>
                  <p style={{ fontSize: '10px', color: colors.success[600], margin: 0 }}>
                    ↗ +6.7% vs SPY
                  </p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
                    <div style={{ 
                      width: '8px', 
                      height: '2px', 
                      backgroundColor: colors.slate[400],
                      marginRight: '6px'
                    }} />
                    <p style={{ fontSize: '12px', color: colors.slate[600], margin: 0 }}>SPY Benchmark</p>
                  </div>
                  <p style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: colors.slate[600], 
                    margin: 0,
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    +28.4%
                  </p>
                  <p style={{ fontSize: '10px', color: colors.slate[500], margin: 0 }}>
                    Market average
                  </p>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: colors.slate[600], margin: 0 }}>Sharpe Ratio</p>
                  <p style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: colors.primary[600], 
                    margin: 0,
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    1.84
                  </p>
                  <p style={{ fontSize: '10px', color: colors.success[600], margin: 0 }}>
                    Excellent
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "Metrics":
        return (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              display: 'flex',
              gap: '16px',
            }}
          >
            {['1M', '3M', '6M', '1Y'].map((period, index) => (
              <div
                key={period}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  border: `2px solid ${colors.success[200]}`,
                  backgroundColor: colors.success[25],
                  textAlign: 'center',
                  minWidth: '80px',
                  opacity: progress > index * 0.25 ? 1 : 0.3,
                }}
              >
                <p style={{ fontSize: '12px', color: colors.slate[600], margin: 0 }}>{period}</p>
                <p style={{ fontSize: '16px', fontWeight: '700', color: colors.success[600], margin: 0 }}>+{2 + index}%</p>
              </div>
            ))}
          </div>
        );
        
      case "Allocation":
        const holdings = [
          { symbol: 'AAPL', name: 'Apple Inc.', percentage: 22.5, value: '$45,800', color: colors.primary[500], change: '+2.8%' },
          { symbol: 'GOOGL', name: 'Alphabet Inc.', percentage: 18.3, value: '$37,200', color: colors.success[500], change: '+1.2%' },
          { symbol: 'MSFT', name: 'Microsoft Corp.', percentage: 15.7, value: '$31,900', color: colors.purple[500], change: '+3.1%' },
          { symbol: 'NVDA', name: 'NVIDIA Corp.', percentage: 12.4, value: '$25,200', color: colors.blue[500], change: '+5.7%' },
          { symbol: 'TSLA', name: 'Tesla Inc.', percentage: 9.8, value: '$19,900', color: colors.orange[500], change: '-1.4%' },
          { symbol: 'Others', name: '18 Holdings', percentage: 21.3, value: '$43,300', color: colors.slate[400], change: '+1.9%' }
        ];

        return (
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: '48px',
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: shadows.lg,
              border: `1px solid ${colors.slate[200]}`,
            }}
          >
            {/* Enhanced Donut Chart */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="75"
                  fill="none"
                  stroke={colors.slate[200]}
                  strokeWidth="20"
                />
                
                {/* Animated segments */}
                {holdings.map((holding, index) => {
                  const circumference = 2 * Math.PI * 75;
                  const segmentLength = (holding.percentage / 100) * circumference;
                  const prevPercentage = holdings.slice(0, index).reduce((sum, h) => sum + h.percentage, 0);
                  const offset = -prevPercentage / 100 * circumference;
                  
                  return (
                    <circle
                      key={holding.symbol}
                      cx="100"
                      cy="100"
                      r="75"
                      fill="none"
                      stroke={holding.color}
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray={`${segmentLength} ${circumference}`}
                      strokeDashoffset={offset}
                      opacity={progress > index * 0.15 ? 1 : 0.2}
                      style={{
                        transition: 'all 0.6s ease',
                        filter: progress > index * 0.15 ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : 'none'
                      }}
                    />
                  );
                })}
              </svg>
              
              {/* Center value */}
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: colors.slate[900],
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  $203.3K
                </div>
                <div style={{ fontSize: '12px', color: colors.slate[600] }}>
                  Total Value
                </div>
              </div>
            </div>
            
            {/* Enhanced Holdings List */}
            <div style={{ minWidth: '350px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', color: colors.slate[900], margin: '0 0 8px 0', fontWeight: '600' }}>
                  Portfolio Allocation
                </h3>
                <p style={{ fontSize: '14px', color: colors.slate[600], margin: 0 }}>
                  23 total holdings • Last updated 2 hours ago
                </p>
              </div>
              
              {holdings.map((holding, index) => (
                <div
                  key={holding.symbol}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    padding: '12px 16px',
                    backgroundColor: progress > index * 0.15 ? colors.slate[50] : 'transparent',
                    borderRadius: '8px',
                    border: `1px solid ${progress > index * 0.15 ? colors.slate[200] : 'transparent'}`,
                    opacity: progress > index * 0.15 ? 1 : 0.3,
                    transform: `translateX(${progress > index * 0.15 ? 0 : -10}px)`,
                    transition: 'all 0.4s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: holding.color,
                        marginRight: '12px',
                        boxShadow: `0 2px 4px ${holding.color}40`,
                      }}
                    />
                    <div>
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        color: colors.slate[900],
                        fontFamily: 'JetBrains Mono, monospace'
                      }}>
                        {holding.symbol}
                      </div>
                      <div style={{ fontSize: '12px', color: colors.slate[600] }}>
                        {holding.name}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right', marginRight: '16px' }}>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: colors.slate[900],
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      {holding.value}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: holding.change.startsWith('+') ? colors.success[600] : colors.danger[600]
                    }}>
                      {holding.change} today
                    </div>
                  </div>
                  
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '700', 
                    color: colors.primary[600],
                    minWidth: '60px',
                    textAlign: 'right',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>
                    {holding.percentage}%
                  </div>
                </div>
              ))}
              
              {/* Portfolio Metrics */}
              {progress > 0.8 && (
                <div style={{ 
                  marginTop: '24px', 
                  padding: '16px', 
                  backgroundColor: colors.primary[50], 
                  borderRadius: '12px',
                  border: `1px solid ${colors.primary[200]}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', color: colors.slate[600] }}>Diversity Score</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: colors.primary[600] }}>8.4/10</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', color: colors.slate[600] }}>Risk Level</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: colors.success[600] }}>Moderate</div>
                    </div>
                  </div>
                </div>
              )}
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
        background: gradients.background,
        fontFamily: fonts.family,
      }}
    >
      {features.map((feature, index) => {
        const isActive = frame >= feature.startFrame && frame < (feature.startFrame + feature.duration);
        if (!isActive) return null;

        const featureFrame = frame - feature.startFrame;
        const progress = Math.min(featureFrame / (feature.duration * 0.8), 1); // Animation completes at 80% to allow fade out
        
        // Smooth fade in/out with extended timing for better rendering
        const fadeInDuration = 20; // 0.67 seconds
        const fadeOutDuration = 20; // 0.67 seconds
        const opacity = interpolate(
          featureFrame, 
          [0, fadeInDuration, feature.duration - fadeOutDuration, feature.duration], 
          [0, 1, 1, 0], 
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const slideY = interpolate(featureFrame, [0, 20], [20, 0], {
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
            }}
          >
            {/* Feature title */}
            <div style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontSize: '56px',
                  fontWeight: '800',
                  color: colors.slate[900],
                  margin: '0 0 8px 0',
                  background: gradients.brand,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {feature.title}
              </h2>
              <p
                style={{
                  fontSize: '24px',
                  color: colors.slate[600],
                  margin: 0,
                  fontWeight: '500',
                }}
              >
                {feature.subtitle}
              </p>
            </div>

            {/* Feature demo */}
            <div>
              {renderFeatureDemo(feature.demo, progress)}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
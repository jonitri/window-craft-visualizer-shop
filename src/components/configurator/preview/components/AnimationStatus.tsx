
interface AnimationStatusProps {
  animationPhase: 'closed' | 'opening' | 'open';
}

export const AnimationStatus = ({ animationPhase }: AnimationStatusProps) => (
  <div className="animation-status" style={{
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px'
  }}>
    {animationPhase.charAt(0).toUpperCase() + animationPhase.slice(1)}
  </div>
);

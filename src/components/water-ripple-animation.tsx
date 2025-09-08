export default function WaterRippleAnimation() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="ripple-background">
        <div className="circle xxl"></div>
        <div className="circle xl"></div>
        <div className="circle l"></div>
        <div className="circle m"></div>
        <div className="circle s"></div>
      </div>
    </div>
  );
}

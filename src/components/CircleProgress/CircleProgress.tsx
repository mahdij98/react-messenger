import React, { useEffect, useState } from "react";

interface CircleProgressProps {
  progress: number; // Progress value between 0 and 100
  size?: number; // Size of the circle
  strokeWidth?: number; // Width of the stroke
  circleColor?: string; // Color of the circle
  progressColor?: string; // Color of the progress
  animationDuration?: number; // Duration of the animation in milliseconds
  showCancel?: boolean; // Whether to show the cancel button
  onCancelClick?: () => void; // Callback when the cancel button is clicked
  className?: string;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  progress,
  size = 100,
  strokeWidth = 10,
  circleColor = "#e0e0e0",
  progressColor = "#3b82f6",
  animationDuration = 1000,
  showCancel = false,
  onCancelClick,
  className,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  useEffect(() => {
    // Animate the progress value
    const startTime = Date.now();
    const endTime = startTime + animationDuration;

    const animate = () => {
      const now = Date.now();
      const timeFraction = Math.min(1, (now - startTime) / animationDuration);
      const currentProgress = timeFraction * progress;

      setAnimatedProgress(currentProgress);

      if (now < endTime) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedProgress(progress); // Ensure it ends at the exact progress value
      }
    };

    requestAnimationFrame(animate);
  }, [progress, animationDuration]);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute animate-[spin_2s_ease-in-out_infinite] "
        width={size}
        height={size}
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={circleColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all ease-linear duration-1000" // Tailwind animation classes
        />
      </svg>
      {/* Progress Text or Cancel Button */}
      {showCancel ? (
        <button
          onClick={onCancelClick}
          className="absolute flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Cancel"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={progressColor}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      ) : (
        <span
          className="absolute text-lg font-bold"
          style={{ color: progressColor }}
        >
          {Math.round(animatedProgress)}%
        </span>
      )}
    </div>
  );
};

export default CircleProgress;

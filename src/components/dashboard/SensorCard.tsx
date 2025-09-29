import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: number;
  icon: LucideIcon;
  color: string;
  trend: "up" | "down" | "stable";
}

interface SensorCardProps {
  sensor: SensorData;
}

export function SensorCard({ sensor }: SensorCardProps) {
  const { name, value, unit, threshold, icon: Icon, color, trend } = sensor;
  
  const isOverThreshold = value > threshold;
  const percentage = Math.min((value / threshold) * 100, 100);

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      case "stable":
        return "→";
    }
  };

  return (
    <Card className="sensor-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon 
            className="h-5 w-5" 
            style={{ color }} 
          />
          <h3 className="font-semibold text-sm">{name}</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {getTrendIcon()}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{value.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Threshold: {threshold} {unit}
          </p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              isOverThreshold ? "bg-danger" : "bg-gradient-to-r from-safe to-warning"
            }`}
            style={{ 
              width: `${Math.min(percentage, 100)}%`,
              background: isOverThreshold ? undefined : `linear-gradient(90deg, ${color}22, ${color})`
            }}
          />
        </div>
        
        {isOverThreshold && (
          <p className="text-xs text-danger font-medium">
            ⚠ Above threshold
          </p>
        )}
      </div>
    </Card>
  );
}
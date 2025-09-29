import { Shield, AlertTriangle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export type RiskLevel = "safe" | "warning" | "danger";

interface StatusIndicatorProps {
  riskLevel: RiskLevel;
  lastUpdate: Date;
}

export function StatusIndicator({ riskLevel, lastUpdate }: StatusIndicatorProps) {
  const getStatusConfig = (level: RiskLevel) => {
    switch (level) {
      case "safe":
        return {
          icon: Shield,
          label: "SAFE",
          message: "No fire risk detected",
          className: "status-safe",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          label: "WARNING",
          message: "Elevated fire risk detected",
          className: "status-warning",
        };
      case "danger":
        return {
          icon: AlertCircle,
          label: "HIGH RISK",
          message: "Critical fire risk detected",
          className: "status-danger",
        };
    }
  };

  const config = getStatusConfig(riskLevel);
  const Icon = config.icon;

  return (
    <Card className="p-6 border-2">
      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg font-bold text-lg ${config.className}`}>
        <Icon className="h-6 w-6" />
        <span>{config.label}</span>
      </div>
      <div className="mt-4">
        <p className="text-foreground font-medium">{config.message}</p>
        <p className="text-muted-foreground text-sm mt-2">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </div>
    </Card>
  );
}
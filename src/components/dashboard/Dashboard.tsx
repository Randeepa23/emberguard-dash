import { StatusIndicator } from "./StatusIndicator";
import { SensorCard } from "./SensorCard";
import { SensorChart } from "./SensorChart";
import { useDashboardData } from "./MockDataProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Database, Shield, Activity } from "lucide-react";

export function Dashboard() {
  const { riskLevel, sensors, chartData, lastUpdate } = useDashboardData();

  const systemStats = [
    { label: "NodeMCU Status", value: "Online", icon: Wifi, status: "safe" },
    { label: "ML Model", value: "Active", icon: Database, status: "safe" },
    { label: "Data Points", value: "1,247", icon: Activity, status: "safe" },
    { label: "Uptime", value: "99.8%", icon: Shield, status: "safe" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              🔥 Fire Risk Detection System
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring with AI-powered risk assessment
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-card">
              <Activity className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
            <Badge variant="outline" className="bg-card">
              NodeMCU Connected
            </Badge>
          </div>
        </div>

        {/* Risk Status */}
        <StatusIndicator riskLevel={riskLevel} lastUpdate={lastUpdate} />

        {/* System Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {systemStats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="p-4">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-safe" />
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sensor Data Grid */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Sensor Readings</h2>
          <div className="dashboard-grid">
            {sensors.map((sensor) => (
              <SensorCard key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Data Trends</h2>
          <SensorChart data={chartData} />
        </div>

        {/* Risk Assessment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🤖 ML Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Detection Algorithm</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced decision tree model running on NodeMCU ESP32, trained on 10,000+ 
                  fire incident datasets. Real-time inference with sub-second response time.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Sensor Fusion</h4>
                <p className="text-sm text-muted-foreground">
                  Multi-sensor data correlation analyzing temperature patterns, gas concentrations, 
                  and environmental conditions for comprehensive fire risk evaluation.
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs font-mono">
                Last ML inference: {lastUpdate.toISOString()} | 
                Model accuracy: 94.7% | 
                Response time: 0.23ms
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
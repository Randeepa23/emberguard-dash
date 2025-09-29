import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ChartDataPoint {
  time: string;
  temperature: number;
  humidity: number;
  co2: number;
  co: number;
  hydrogen: number;
}

interface SensorChartProps {
  data: ChartDataPoint[];
  selectedSensors?: string[];
}

export function SensorChart({ data, selectedSensors = ["temperature", "humidity", "co2"] }: SensorChartProps) {
  const sensorConfig = {
    temperature: { color: "hsl(var(--temperature))", name: "Temperature (°C)" },
    humidity: { color: "hsl(var(--humidity))", name: "Humidity (%)" },
    co2: { color: "hsl(var(--co2))", name: "CO₂ (ppm)" },
    co: { color: "hsl(var(--co))", name: "CO (ppm)" },
    hydrogen: { color: "hsl(var(--hydrogen))", name: "H₂ (ppm)" },
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Sensor Data Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Legend />
              
              {selectedSensors.map((sensor) => (
                <Line
                  key={sensor}
                  type="monotone"
                  dataKey={sensor}
                  stroke={sensorConfig[sensor as keyof typeof sensorConfig].color}
                  strokeWidth={2}
                  dot={{ fill: sensorConfig[sensor as keyof typeof sensorConfig].color, strokeWidth: 2, r: 4 }}
                  name={sensorConfig[sensor as keyof typeof sensorConfig].name}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
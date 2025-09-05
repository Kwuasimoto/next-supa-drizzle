import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, Info, Zap, Server, RefreshCw, Monitor } from "lucide-react";
import type { DemoCardProps } from "@/types";

export default async function DemoCard({
  title,
  description,
  strategy,
  fetchedAt,
  children,
  explanation,
  isLoading,
  strategyType,
  buildTime,
  renderTime,
}: DemoCardProps) {
  // Get strategy-specific styling and icons
  const getStrategyDetails = (type?: string) => {
    switch (type) {
      case "SSG":
        return {
          icon: <Zap className="h-4 w-4" />,
          color:
            "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
          badgeVariant: "default" as const,
          timeLabel: "Built at",
          timeValue: buildTime,
        };
      case "SSR":
        return {
          icon: <Server className="h-4 w-4" />,
          color:
            "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
          badgeVariant: "secondary" as const,
          timeLabel: "Rendered at",
          timeValue: renderTime || fetchedAt,
        };
      case "ISR":
        return {
          icon: <RefreshCw className="h-4 w-4" />,
          color:
            "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400",
          badgeVariant: "outline" as const,
          timeLabel: "Last updated",
          timeValue: fetchedAt,
        };
      case "CSR":
        return {
          icon: <Monitor className="h-4 w-4" />,
          color:
            "bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-400",
          badgeVariant: "destructive" as const,
          timeLabel: "Loaded at",
          timeValue: fetchedAt,
        };
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          color: "bg-muted/50 border-muted text-muted-foreground",
          badgeVariant: "outline" as const,
          timeLabel: "Data fetched at",
          timeValue: fetchedAt,
        };
    }
  };

  const strategyDetails = getStrategyDetails(strategyType);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                {strategyDetails.icon}
                {title}
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                {description}
              </CardDescription>
            </div>
            <Badge variant={strategyDetails.badgeVariant}>{strategy}</Badge>
          </div>
          {strategyDetails.timeValue && (
            <div
              className={`flex items-center rounded-lg border p-3 text-sm ${strategyDetails.color}`}
            >
              {strategyDetails.icon}
              <span className="ml-2">
                {strategyDetails.timeLabel}: {strategyDetails.timeValue}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <div className="bg-muted h-4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
            </div>
          ) : (
            children
          )}
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-base leading-relaxed">
          {explanation}
        </AlertDescription>
      </Alert>
    </div>
  );
}

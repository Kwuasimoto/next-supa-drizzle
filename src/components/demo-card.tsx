import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, Info } from "lucide-react";
import type { DemoCardProps } from "@/types";

export default async function DemoCard({
  title,
  description,
  strategy,
  children,
  explanation,
}: DemoCardProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription className="mt-1 text-base">
                {description}
              </CardDescription>
            </div>
            <Badge variant="outline">{strategy}</Badge>
          </div>
          <div className="text-muted-foreground bg-muted/50 flex items-center rounded-lg p-3 text-sm">
            <Clock className="mr-2 h-4 w-4" />
            <span>Statically Generated Content</span>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
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

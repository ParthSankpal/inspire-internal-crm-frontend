import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";

type StatVariant = "default" | "success" | "warning" | "danger" | "info";

interface StatCardProps {
  label: string;
  value: number | string;
  info?: string;
loading?:boolean;
  /** Visual meaning */
  variant?: StatVariant;
}

export default function StatCard({
  label,
  value,
  info,
  loading,
  variant = "default",
}: StatCardProps) {
  const valueColor = clsx({
    "text-foreground": variant === "default",
    "text-green-600": variant === "success",
    "text-yellow-600": variant === "warning",
    "text-red-600": variant === "danger",
    "text-blue-600": variant === "info",
  });


  
  if (loading ) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">
            Loading finance configuration...
          </p>
        </div>
      </div>
    );
  }
  return (
    <Card className="py-0">
      <CardContent className="p-4">
        <div className="flex items-center gap-1">
          <p className="text-sm text-muted-foreground">
            {label}
          </p>

          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  className="max-w-xs text-xs"
                >
                  {info}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <p className={clsx("text-2xl font-semibold mt-1", valueColor)}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

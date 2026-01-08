import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatCardProps {
  label: string;
  value: number | string;

  /** Optional tooltip text */
  info?: string;
}

export default function StatCard({
  label,
  value,
  info,
}: StatCardProps) {
  return (
    <Card className=" py-0">
      <CardContent className="p-4">
        <div className="flex items-center gap-1">
          <p className="text-sm text-muted-foreground">
            {label}
          </p>

          {/* ℹ️ Only show if info is provided */}
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

        <p className="text-2xl font-semibold mt-1">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

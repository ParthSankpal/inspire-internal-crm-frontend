import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";


export default function PublishBar({
  status,
  canPublish,
  onPublish,
  onUnpublish,
}: {
  status: "Draft" | "Published" | "Completed";
  canPublish: boolean;
  onPublish: () => void;
  onUnpublish: () => void;
}) {
  return (
    <div className="sticky bottom-0 bg-background border-t p-4 flex justify-between items-center">
      <Badge >
        {status}
      </Badge>

      {status === "Draft" ? (
        <Button disabled={!canPublish} onClick={onPublish}>
          Publish Test
        </Button>
      ) : (
        <Button variant="outline" onClick={onUnpublish}>
          Unpublish
        </Button>
      )}
    </div>
  );
}

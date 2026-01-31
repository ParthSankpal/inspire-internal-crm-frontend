import { FollowUp } from "@/features/enquiries/types";

export default function FollowUpTimeline({
  followUps,
}: {
  followUps: FollowUp[];
}) {
  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold mb-3">Follow-ups</h3>

      {followUps.length === 0 && (
        <p className="text-sm text-gray-500">No follow-ups yet</p>
      )}

      {followUps.map((f, idx) => (
        <div key={idx} className="border-b py-2">
          <p className="font-medium">
            {f.outcome} ({f.mode})
          </p>
          <p className="text-sm text-gray-500">{f.note}</p>
          <p className="text-xs text-gray-400">
            {new Date(f.date).toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

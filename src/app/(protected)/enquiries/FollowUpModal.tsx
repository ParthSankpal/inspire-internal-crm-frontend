import { useState } from "react";
import { useForm } from "react-hook-form";
import { FollowUpFormData, Enquiry } from "@/features/enquiries/types";
import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { FormInput } from "@/components/common/Forms/FormInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IsoDate } from "@/components/common/IsoDate";
import { FormDatePicker } from "@/components/common/Forms/FormDatePicker";

type Props = {
  open: boolean;
  onClose: () => void;
  enquiry: Enquiry | null;
  onSubmit: (data: FollowUpFormData) => Promise<void>;
};


export default function FollowUpModal({
  open,
  onClose,
  enquiry,
  onSubmit,
}: Props) {
  const [showForm, setShowForm] = useState(false);

  const { control, handleSubmit, reset } = useForm<FollowUpFormData>();
  const handleDialogSubmit = () => {
    if (!showForm) return;

    handleSubmit(async (data) => {
      await onSubmit(data);
      reset();
      setShowForm(false);
    })(); // 👈 invoke immediately
  };
  return (
    <FormDialog
      open={open}
      onOpenChange={() => {
        setShowForm(false);
        onClose();
      }}
      title="Follow-ups"
      onSubmit={handleDialogSubmit}
      submitLabel={showForm ? "Save Follow-up" : undefined}
    >

      <div className=" space-y-4">

        {/* =====================
          PREVIOUS FOLLOW-UPS
      ===================== */}
        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
          {enquiry?.followUps?.length ? (
            enquiry.followUps
              .slice()
              .reverse()
              .map((fu, idx) => (
                <div
                  key={idx}
                  className="border rounded p-3 text-sm bg-muted"
                >
                  <div className="flex justify-between">
                    <span className="font-medium capitalize">
                      {fu.outcome.replace("_", " ")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      <IsoDate value={fu.follow_up_date} />
                    </span>
                  </div>

                  <div className="text-xs mt-1">
                    Mode: {fu.mode}
                  </div>

                  {fu.note && (
                    <div className="text-xs mt-1 italic">
                      {fu.note}
                    </div>
                  )}

                  {fu.nextFollowUpDate && (
                    <div className="text-xs text-blue-600 mt-1">
                      Next:{" "}
                      {new Date(fu.nextFollowUpDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No follow-ups yet
            </p>
          )}
        </div>

        <Separator className="my-4" />

        {/* =====================
          ADD FOLLOW-UP BUTTON
      ===================== */}
        <div className=" flex justify-end">

          {!showForm && (
            <Button
              variant="outline"
              onClick={() => setShowForm(true)}
            >
              Add Follow-up
            </Button>
          )}
        </div>

        {/* =====================
          FOLLOW-UP FORM
      ===================== */}
        {showForm && (
          <div className="space-y-4 py-4 grid gap-4 grid-cols-2">
            <FormSelect
              name="mode"
              label="Mode"
              control={control}
              options={[
                { value: "call", label: "Call" },
                { value: "whatsapp", label: "WhatsApp" },
                { value: "in_person", label: "In Person" },
              ]}
            />

            <FormDatePicker
              name="follow_up_date"
              label="Followup Date"
              control={control}
            />

            <FormSelect
              name="outcome"
              label="Outcome"
              control={control}
              options={[
                { value: "interested", label: "Interested" },
                { value: "call_back", label: "Call Back" },
                { value: "demo_attended", label: "Demo Attended" },
                { value: "test_given", label: "Test Given" },
                { value: "not_interested", label: "Not Interested" },
              ]}
            />

            <FormInput
              name="note"
              label="Notes"
              control={control}
            />
          </div>
        )}
      </div>
    </FormDialog>
  );
}

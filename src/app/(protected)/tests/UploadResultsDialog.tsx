"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNotify } from "@/components/common/NotificationProvider";
import { parseCsvInput } from "@/utils/parseCsv";
import { importTestResults } from "@/api/testApi";

export default function UploadResultsDialog({
    open,
    onOpenChange,
    testId,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    testId: string;
}) {
    const notify = useNotify();
    const [file, setFile] = useState<File | null>(null);
    const [pastedText, setPastedText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {
        if (!file && !pastedText.trim()) {
            notify("Upload a CSV file or paste data", "error");
            return;
        }

        try {
            setLoading(true);

            const rows = file
                ? await parseCsvInput(file)
                : await parseCsvInput(pastedText);

            const res = await importTestResults(testId, rows);

            if (res.rejected > 0) {
                notify(
                    `Uploaded ${res.total} rows | Verified: ${res.verified} | Rejected: ${res.rejected}`,
                    "warning"
                );
            } else {
                notify(`All ${res.total} students verified successfully 🎉`, "success");
            }

            onOpenChange(false);
        } catch (err) {
            console.error(err);
            notify("Failed to process results", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Upload or Paste Test Results</DialogTitle>
                </DialogHeader>

                {/* File Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Upload CSV file</label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>

                <div className="text-center text-sm text-muted-foreground">OR</div>

                {/* Paste Area */}
                <div className="space-y-2 scroll-auto max-h-20">
                    <label className="text-sm font-medium">Paste from Excel / Sheets</label>
                    <Textarea
                        rows={8}
                        placeholder="Paste copied Excel data here..."
                        value={pastedText}
                        onChange={(e) => setPastedText(e.target.value)}
                    />
                </div>

                <Button onClick={handleUpload} disabled={loading}>
                    {loading ? "Processing..." : "Upload & Calculate"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}

"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNotify } from "@/components/common/NotificationProvider";
import { parseCsvInput } from "@/utils/parseCsv";
import { importTestResults } from "@/api/testApi";
import { StudentMismatch } from "@/features/test/types";

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
    const [mismatchOpen, setMismatchOpen] = useState(false);
    const [mismatches, setMismatches] = useState<StudentMismatch[]>([]);



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

            if (!res.success && res.mismatches?.length) {
                setMismatches(res.mismatches);
                setMismatchOpen(true);

                notify(
                    `${res.mismatches.length} students have result mismatches`,
                    "warning"
                );
                return;
            }

            if (res.rejected > 0) {
                notify(
                    `Uploaded ${res.total} rows | Verified: ${res.verified} | Rejected: ${res.rejected}`,
                    "warning"
                );
            } else {
                notify(
                    `All ${res.total} students verified successfully 🎉`,
                    "success"
                );
                onOpenChange(false);
            }
        } catch (err: any) {
            const data = err?.response?.data;

            if (data?.mismatches?.length) {
                setMismatches(data.mismatches);
                setMismatchOpen(true);
                return;
            }

            notify("Failed to process results", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-4xl max-h-[90svh] overflow-y-scroll">
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
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Paste from Excel / Sheets</label>
                        <Textarea
                            className="min-h-[250px] max-h-[400px] overflow-y-auto resize-none"
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

            <Dialog open={mismatchOpen} onOpenChange={setMismatchOpen}>
                <DialogContent className="sm:max-w-3xl max-h-[90svh] overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle>
                            Result Validation Failed
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {mismatches.map((student) => (
                            <div
                                key={student.rollNo}
                                className="border rounded-lg p-4"
                            >
                                <div className="font-semibold mb-3">
                                    {student.rollNo} - {student.studentName}
                                </div>

                                <table className="w-full text-sm border">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="p-2 text-left">Question</th>
                                            <th className="p-2 text-left">Subject</th>
                                            <th className="p-2 text-left">Selected</th>
                                            <th className="p-2 text-left">Config Answer</th>
                                            <th className="p-2 text-left">Excel Marks</th>
                                            <th className="p-2 text-left">Software Marks</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {student.mismatches.map((m) => (
                                            <tr
                                                key={`${student.rollNo}-${m.questionNo}`}
                                                className="border-b"
                                            >
                                                <td className="p-2">
                                                    Q{m.questionNo}
                                                </td>
                                                <td className="p-2">
                                                    {m.subject}
                                                </td>
                                                <td className="p-2">
                                                    {m.selectedOption}
                                                </td>
                                                <td className="p-2">
                                                    {m.correctOption}
                                                </td>
                                                <td className="p-2">
                                                    {m.excelMarks}
                                                </td>
                                                <td className="p-2 text-red-600 font-medium">
                                                    {m.softwareMarks}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

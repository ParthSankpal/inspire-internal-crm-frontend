"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
    getEnquiryById,
    addFollowUp,
    markEnquiryAdmitted,
    markEnquiryLost,
} from "@/api/enquiries";

import { AdmissionFormData, Enquiry, FollowUpFormData, LostFormData } from "@/features/enquiries/types";
import FollowUpModal from "../FollowUpModal";
import AdmitModal from "../AdmitModal";
import LostModal from "../LostModal";
import { IsoDate } from "@/components/common/IsoDate";
import { ArrowLeft } from "lucide-react";


export default function EnquiryDetailPage() {
    const router = useRouter();
    const { enqId } = useParams();
    const [enquiry, setEnquiry] = useState<Enquiry | null>(null);

    const [followUpOpen, setFollowUpOpen] = useState(false);
    const [admitOpen, setAdmitOpen] = useState(false);
    const [lostOpen, setLostOpen] = useState(false);

    const load = async () => {
        const data = await getEnquiryById(enqId as string);
        setEnquiry(data);
    };

    useEffect(() => {
        load();
    }, [enqId]);

    if (!enquiry) return null;

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>

                <h1 className="text-2xl font-semibold">
                    {enquiry.studentName}
                </h1>
            </div>
            <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setFollowUpOpen(true)}>Add Follow-up</Button>

                {enquiry.status !== "admitted" && (
                    <Button variant="outline" onClick={() => setAdmitOpen(true)}>Mark Admitted</Button>
                )}

                {enquiry.status !== "lost" && (
                    <Button variant="destructive" onClick={() => setLostOpen(true)}>
                        Mark Lost
                    </Button>
                )}
            </div>
            <div className="border rounded-md p-4">
                <h2 className="text-xl font-semibold">{enquiry.studentName}</h2>
                <p>{enquiry.school?.name} | Class {enquiry.standard}</p>
                <p>Status: <b>{enquiry.status}</b></p>
            </div>


            {/* FOLLOWUPS */}
            <div className="border  rounded-md p-4">
                <h3 className="font-semibold mb-2">Follow-ups</h3>
                {enquiry.followUps?.length ? (
                    enquiry.followUps.map((f, i) => (
                        <div key={i} className="border-b  flex justify-between py-2">
                            <p>{f.outcome} ({f.mode})</p>
                            <p className="text-sm text-gray-500">{f.note}</p>
                            <p className="text-sm text-gray-500"> <IsoDate value={f.follow_up_date} /></p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No follow-ups yet</p>
                )}
            </div>


            <FollowUpModal
                open={followUpOpen}
                onClose={() => setFollowUpOpen(false)}
                enquiry={enquiry}
                onSubmit={async (data) => {
                    if (!enquiry?._id) return;

                    await addFollowUp(enquiry._id, {
                        ...data,
                        date: new Date(),
                    });

                    await load(); // refresh table & follow-ups
                }}
            />


            <AdmitModal
                open={admitOpen}
                onClose={() => setAdmitOpen(false)}
                onSubmit={async (data) => {
                    if (!enquiry?._id) return;

                    await markEnquiryAdmitted(enquiry._id, {
                        ...data,
                        admissionDate: new Date(),
                    });

                    setAdmitOpen(false);
                    load();
                }}
            />

            <LostModal
                open={lostOpen}
                onClose={() => setLostOpen(false)}
                onSubmit={async (data) => {
                    if (!enquiry?._id) return;

                    await markEnquiryLost(enquiry._id, {
                        lostReason: data,
                    });

                    setLostOpen(false);
                    load();
                }}
            />

        </div>
    );
}

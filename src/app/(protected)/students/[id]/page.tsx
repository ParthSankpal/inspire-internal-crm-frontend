"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getStudentById } from "@/api/students";
import { Student } from "@/features/students/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { IsoDate } from "@/components/common/IsoDate";
// import html2pdf from "html2pdf.js";

export default function StudentDetailsPage() {
    const router = useRouter();

    const { id } = useParams();
    const [student, setStudent] = useState<Student | null>(null);

    const pdfRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) {
            getStudentById(id as string).then((res) => {
                setStudent(res);
            });
        }
    }, [id]);

    if (!student) return <p className="p-6">Loading...</p>;

    const exportPDF = () => {
        // const element = pdfRef.current;

        // const options = {
        //     filename: `${student.firstName}-${student.lastName}-details.pdf`,
        //     html2canvas: { scale: 2 },
        //     jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
        //     pagebreak: { mode: ["avoid-all"] },
        // };

        // html2pdf().set(options).from(element).save();
    };

    const getTotalPaid = () => {
        return student.fees.installments.reduce((sum, ins) => sum + (ins?.paidAmount || 0), 0);
    };

    const totalPaid = getTotalPaid();
    const pending = student.fees.finalFees - totalPaid;

    return (
        <div className="p-6 space-y-6 montserrat-500">

            {/* TOP BAR */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>

                    <h1 className="text-2xl font-semibold">
                        {student.firstName} {student.lastName} — {student.studentId}
                    </h1>
                </div>

                <Button variant="outline" onClick={() => router.push(`/students/${id}/analytics`)} >
                    View Analytics
                </Button>
            </div>


            {/* PDF WRAPPER */}
            <div ref={pdfRef} className="space-y-6 bg-white p-6 rounded-md">

                {/* INSPIRE ACADEMY HEADER */}
                <div className="text-center border-b pb-4">
                    <h1 className="text-3xl font-bold">Inspire Academy Kolhapur</h1>
                    <p className="text-sm text-gray-600">
                        Student Admission & Fees Summary
                    </p>
                </div>

                {/* PERSONAL */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <p><b>Name:</b> {student.firstName} {student.lastName}</p>
                        <p><b>Gender:</b> {student.gender}</p>
                        <p><b>DOB:</b> <IsoDate value={student.dob} /></p>
                        <p><b>Aadhaar:</b> {student.aadhaarNo}</p>
                    </CardContent>
                </Card>

                {/* CONTACT */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <p><b>Phone:</b> {student.contact.phone}</p>
                        <p><b>Email:</b> {student.contact.email}</p>
                    </CardContent>
                </Card>

                {/* PARENT */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Parent Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <p><b>Father:</b> {student.parent.fatherName} ({student.parent.fatherPhone})</p>
                        <p><b>Mother:</b> {student.parent.motherName} ({student.parent.motherPhone})</p>
                        <p><b>Occupation:</b> {student.parent.occupation}</p>
                    </CardContent>
                </Card>

                {/* ADDRESS */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{student.address.line1}</p>
                        <p>{student.address.line2}</p>
                        <p>
                            {student.address.city}, {student.address.state} - {student.address.pincode}
                        </p>
                    </CardContent>
                </Card>

                {/* ACADEMIC */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Academic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <p><b>School:</b> {student.academicInfo.schoolName}</p>
                        <p><b>10th Marks:</b> {student.academicInfo.grade10Marks}</p>
                        <p><b>Passing Year:</b> {student.academicInfo.grade10PassingYear}</p>
                    </CardContent>
                </Card>

                {/* FEES SUMMARY */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Fees Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <p><b>Base Fees:</b> ₹{student.fees.baseFees}</p>
                        <p><b>Discount:</b> ₹{student.fees.discountValue}</p>
                        <p><b>Final Fees:</b> ₹{student.fees.finalFees}</p>

                        <p className="col-span-3">
                            <b>Total Paid:</b> ₹{totalPaid}
                        </p>
                        <p className="col-span-3  font-semibold">
                            <b>Pending Amount:</b>₹ <span className=" text-red-600">{pending} </span> 
                        </p>
                    </CardContent>
                </Card>

                {/* INSTALLMENTS */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle>Installments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {student.fees.installments.map((ins) => (
                            <div key={ins.installmentNo} className="border rounded-md p-4 grid grid-cols-5 gap-4">
                                <p><b>No:</b> {ins.installmentNo}</p>
                                <p><b>Payment Date:</b> <IsoDate value={ins.paidDate} /> </p>
                                <p><b>Due Date:</b> <IsoDate value={ins.dueDate} /></p>
                                <p><b>Amount:</b> ₹{ins.amount}</p>
                                <p><b>Status:</b> {ins.status}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

import { Enquiry } from "@/features/enquiries/types";


export default function EnquirySummary({ enquiry }: { enquiry: Enquiry }) {
  return (
    <div className="border rounded p-4 space-y-1">
      <h2 className="text-xl font-semibold">
        {enquiry.studentName}
      </h2>
      <p>
        {enquiry.school.name} | Class {enquiry.standard}
      </p>
      <p>Phone: {enquiry.phoneNo}</p>
      <p>Status: <b>{enquiry.status}</b></p>
    </div>
  );
}

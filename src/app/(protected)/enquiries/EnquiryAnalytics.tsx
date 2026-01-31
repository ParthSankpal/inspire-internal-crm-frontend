"use client";

import { useEffect, useState } from "react";
import {
  getEnquiryFunnelAnalytics,
  getSourceWiseAnalytics,
  getSchoolWiseAnalytics,
  getLostReasonAnalytics,
  getCounselorWiseAnalytics,
} from "@/api/enquiryAnalytics";

import {
  EnquiryFunnelAnalytics,
  SourceWiseAnalytics,
  SchoolWiseAnalytics,
  LostReasonAnalytics,
  CounselorWiseAnalytics,
} from "@/api/enquiryAnalytics";
import StatCard from "@/components/common/StatCard";

export default function EnquiryAnalytics() {
  const [funnel, setFunnel] = useState<EnquiryFunnelAnalytics | null>(null);
  const [sourceWise, setSourceWise] = useState<SourceWiseAnalytics[]>([]);
  const [schoolWise, setSchoolWise] = useState<SchoolWiseAnalytics[]>([]);
  const [lostReasons, setLostReasons] = useState<LostReasonAnalytics[]>([]);
  const [counselorWise, setCounselorWise] = useState<CounselorWiseAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [
          funnelRes,
          sourceRes,
          schoolRes,
          lostRes,
          counselorRes,
        ] = await Promise.all([
          getEnquiryFunnelAnalytics(),
          getSourceWiseAnalytics(),
          getSchoolWiseAnalytics(),
          getLostReasonAnalytics(),
          getCounselorWiseAnalytics(),
        ]);

        setFunnel(funnelRes);
        setSourceWise(sourceRes);
        setSchoolWise(schoolRes);
        setLostReasons(lostRes);
        setCounselorWise(counselorRes);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading || !funnel) return null;

  return (
    <div className="space-y-6 mb-8">
      {/* =====================
         FUNNEL SUMMARY
      ====================== */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total" value={funnel.totalEnquiries} variant="info" />
        <StatCard label="Active" value={funnel.active} variant="warning" />
        <StatCard label="Admitted" value={funnel.admitted} variant="success"/>
        <StatCard label="Lost" value={funnel.lost} variant="danger"/>
        <StatCard
          label="Conversion %"
          value={`${funnel.conversionRate}%`}
        />
      </div>

      {/* =====================
         SOURCE WISE
      ====================== */}
      <AnalyticsTable
        title="Source-wise Conversion"
        headers={["Source", "Enquiries", "Admissions", "Conversion %"]}
        rows={sourceWise.map((s) => [
          s.source,
          s.enquiries,
          s.admissions,
          `${s.conversionRate}%`,
        ])}
      />

      {/* =====================
         SCHOOL WISE
      ====================== */}
      <AnalyticsTable
        title="School-wise Conversion"
        headers={["School", "Enquiries", "Admissions", "Conversion %"]}
        rows={schoolWise.map((s) => [
          s.schoolName,
          s.enquiries,
          s.admissions,
          `${s.conversionRate}%`,
        ])}
      />

      {/* =====================
         LOST REASONS
      ====================== */}
      <AnalyticsTable
        title="Lost Reasons"
        headers={["Reason", "Count"]}
        rows={lostReasons.map((l) => [
          l.reason,
          l.count,
        ])}
      />

      {/* =====================
         COUNSELOR PERFORMANCE
      ====================== */}
      <AnalyticsTable
        title="Counselor Performance"
        headers={["Counselor", "Enquiries", "Admissions", "Conversion %"]}
        rows={counselorWise.map((c) => [
          c.counselorName || "—",
          c.enquiries,
          c.admissions,
          `${c.conversionRate}%`,
        ])}
      />
    </div>
  );
}



function AnalyticsTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: any[][];
}) {
  return (
    <div className="border rounded p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {headers.map((h) => (
              <th key={h} className="text-left py-1">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b last:border-0">
              {r.map((cell, j) => (
                <td key={j} className="py-1">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

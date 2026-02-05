"use client";

import { useEffect, useState } from "react";

/* ======================
   API CALLS
====================== */
import {
  getEnquiryFunnelAnalytics,
  getSourceWiseAnalytics,
  getSchoolWiseAnalytics,
  getLostReasonAnalytics,
  getCounselorWiseAnalytics,
  getSchoolAreaWiseAnalytics,
  getSchoolMediumWiseAnalytics,
  getEnquiryQualityAnalytics,
  getPriceSensitivityAnalytics,
  getFollowUpOutcomeAnalytics,
} from "@/api/enquiryAnalytics";

/* ======================
   TYPES
====================== */
import {
  EnquiryFunnelAnalytics,
  SourceWiseAnalytics,
  SchoolWiseAnalytics,
  LostReasonAnalytics,
  CounselorWiseAnalytics,
  SchoolAreaWiseAnalytics,
  SchoolMediumWiseAnalytics,
  EnquiryQualityAnalytics,
  PriceSensitivityAnalytics,
  FollowUpOutcomeAnalytics,
} from "@/api/enquiryAnalytics";

/* ======================
   UI COMPONENTS
====================== */
import StatCard from "@/components/common/StatCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

/* ======================
   PAGE
====================== */
export default function EnquiryAnalytics() {
  const router = useRouter();
  /* ---------- STATE ---------- */
  const [loading, setLoading] = useState(true);

  const [funnel, setFunnel] = useState<EnquiryFunnelAnalytics | null>(null);

  const [sourceWise, setSourceWise] = useState<SourceWiseAnalytics[]>([]);
  const [schoolWise, setSchoolWise] = useState<SchoolWiseAnalytics[]>([]);
  const [schoolAreaWise, setSchoolAreaWise] = useState<SchoolAreaWiseAnalytics[]>([]);
  const [schoolMediumWise, setSchoolMediumWise] = useState<SchoolMediumWiseAnalytics[]>([]);

  const [enquiryQualityWise, setEnquiryQualityWise] = useState<EnquiryQualityAnalytics[]>([]);
  const [priceSensitivityWise, setPriceSensitivityWise] = useState<PriceSensitivityAnalytics[]>([]);
  const [followUpOutcomeWise, setFollowUpOutcomeWise] = useState<FollowUpOutcomeAnalytics[]>([]);

  const [lostReasons, setLostReasons] = useState<LostReasonAnalytics[]>([]);
  const [counselorWise, setCounselorWise] = useState<CounselorWiseAnalytics[]>([]);

  /* ---------- LOAD ANALYTICS ---------- */
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [
          funnelRes,
          sourceRes,
          schoolRes,
          areaRes,
          mediumRes,
          qualityRes,
          priceRes,
          followUpRes,
          lostRes,
          counselorRes,
        ] = await Promise.all([
          getEnquiryFunnelAnalytics(),
          getSourceWiseAnalytics(),
          getSchoolWiseAnalytics(),
          getSchoolAreaWiseAnalytics(),
          getSchoolMediumWiseAnalytics(),
          getEnquiryQualityAnalytics(),
          getPriceSensitivityAnalytics(),
          getFollowUpOutcomeAnalytics(),
          getLostReasonAnalytics(),
          getCounselorWiseAnalytics(),
        ]);

        setFunnel(funnelRes);
        setSourceWise(sourceRes);
        setSchoolWise(schoolRes);
        setSchoolAreaWise(areaRes);
        setSchoolMediumWise(mediumRes);
        setEnquiryQualityWise(qualityRes);
        setPriceSensitivityWise(priceRes);
        setFollowUpOutcomeWise(followUpRes);
        setLostReasons(lostRes);
        setCounselorWise(counselorRes);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading || !funnel) return (
    <div className="flex min-h-[70svh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <p className="text-sm text-muted-foreground">
          Loading enquiry analytics....
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 mb-10">
      <div className="flex items-center gap-3">
                      <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.back()}
                      >
                          <ArrowLeft className="h-5 w-5" />
                      </Button>
      
                    
                  </div>

      {/* =====================
         FUNNEL SUMMARY
      ====================== */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total Enquiries" value={funnel.totalEnquiries} variant="info" />
        <StatCard label="Active" value={funnel.active} variant="warning" />
        <StatCard label="Admitted" value={funnel.admitted} variant="success" />
        <StatCard label="Lost" value={funnel.lost} variant="danger" />
        <StatCard label="Conversion %" value={`${funnel.conversionRate}%`} />
      </div>

      {/* =====================
         SOURCE & SCHOOL
      ====================== */}
      <AnalyticsTable
        title="Source-wise Conversion"
        headers={["Source", "Enquiries", "Admissions", "Conversion %"]}
        rows={sourceWise.map(s => [
          s.source,
          s.enquiries,
          s.admissions,
          `${s.conversionRate}%`,
        ])}
      />

      <AnalyticsTable
        title="School-wise Conversion"
        headers={["School", "Enquiries", "Admissions", "Conversion %"]}
        rows={schoolWise.map(s => [
          s.schoolName,
          s.enquiries,
          s.admissions,
          `${s.conversionRate}%`,
        ])}
      />

      <AnalyticsTable
        title="School Area-wise Performance"
        headers={["Area", "Enquiries", "Admissions", "Conversion %"]}
        rows={schoolAreaWise.map(a => [
          a.area,
          a.enquiries,
          a.admissions,
          `${a.conversionRate}%`,
        ])}
      />

      <AnalyticsTable
        title="School Medium-wise Performance"
        headers={["Medium", "Enquiries", "Admissions", "Conversion %"]}
        rows={schoolMediumWise.map(m => [
          m.medium,
          m.enquiries,
          m.admissions,
          `${m.conversionRate}%`,
        ])}
      />

      {/* =====================
         STUDENT QUALITY
      ====================== */}
      <AnalyticsTable
        title="Enquiry Quality vs Conversion"
        headers={["Quality", "Enquiries", "Admissions", "Conversion %"]}
        rows={enquiryQualityWise.map(q => [
          q.quality.toUpperCase(),
          q.enquiries,
          q.admissions,
          `${q.conversionRate}%`,
        ])}
      />

      <AnalyticsTable
        title="Price Sensitivity Impact"
        headers={["Price Sensitive", "Enquiries", "Admissions", "Conversion %"]}
        rows={priceSensitivityWise.map(p => [
          p.priceSensitive ? "Yes" : "No",
          p.enquiries,
          p.admissions,
          `${p.conversionRate}%`,
        ])}
      />

      {/* =====================
         FOLLOW-UP & LOSS
      ====================== */}
      <AnalyticsTable
        title="Follow-up Outcomes"
        headers={["Outcome", "Count"]}
        rows={followUpOutcomeWise.map(f => [
          f.outcome?.replace("_", " ").toUpperCase(),
          f.count,
        ])}
      />

      <AnalyticsTable
        title="Lost Reasons"
        headers={["Reason", "Count"]}
        rows={lostReasons.map(l => [
          l.reason?.replace("_", " ").toUpperCase(),
          l.count,
        ])}
      />

      {/* =====================
         COUNSELOR PERFORMANCE
      ====================== */}
      <AnalyticsTable
        title="Counselor Performance"
        headers={["Counselor", "Enquiries", "Admissions", "Conversion %"]}
        rows={counselorWise.map(c => [
          c.counselorName || "—",
          c.enquiries,
          c.admissions,
          `${c.conversionRate}%`,
        ])}
      />
    </div>
  );
}

/* ======================
   REUSABLE TABLE
====================== */
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
    <div className="rounded-xl border bg-background">
      {/* Header */}
      <div className="border-b px-4 py-3">
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((h) => (
              <TableHead className="" key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j}>{cell}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

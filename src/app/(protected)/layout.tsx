"use client";

import MainSection from "@/components/common/MainSection";


export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  

  return <MainSection>{children}</MainSection>;
}

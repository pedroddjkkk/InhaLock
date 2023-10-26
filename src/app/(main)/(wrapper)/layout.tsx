"use client";

import { PageWrapper } from "@/app/wrapper";

export default function WrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper className="overflow-hidden">{children}</PageWrapper>;
}

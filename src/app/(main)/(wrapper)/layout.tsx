"use client";

import { PageWrapper } from "@/app/wrapper";

export const revalidate = 0;

export default function WrapperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWrapper className="overflow-hidden">{children}</PageWrapper>;
}

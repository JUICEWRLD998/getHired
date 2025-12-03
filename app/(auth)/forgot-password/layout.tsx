import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - GetHired",
  description: "Reset your GetHired password",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

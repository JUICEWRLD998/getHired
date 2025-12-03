import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - GetHired",
  description: "Create your GetHired account",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

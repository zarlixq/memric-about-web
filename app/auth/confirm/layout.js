// "use client" YOK — server component
export const metadata = {
  robots: { index: false, follow: false },
  title: "E-posta Doğrulama | Memric",
};

export default function ConfirmLayout({ children }) {
  return <>{children}</>;
}

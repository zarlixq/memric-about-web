// server component — burada config var, "use client" yok
export const dynamic = "force-dynamic"; // prerender etme
export const revalidate = 0;            // cache alma

import { Suspense } from "react";
import ConfirmClient from "./ConfirmClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen grid place-items-center">
          <div className="opacity-70">Doğrulanıyor…</div>
        </main>
      }
    >
      <ConfirmClient />
    </Suspense>
  );
}

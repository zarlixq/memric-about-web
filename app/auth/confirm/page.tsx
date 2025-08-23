export const dynamic = "force-dynamic"; 
export const revalidate = 0;            

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

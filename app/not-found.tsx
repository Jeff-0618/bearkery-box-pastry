import Link from "next/link";
import Stamp from "@/components/shared/Stamp";

export default function NotFound() {
  return (
    <div className="container-bx page-center flex flex-col items-center gap-4">
      <Stamp className="w-24 text-lg" />
      <h1 className="text-3xl font-medium">This page wandered off</h1>
      <p className="max-w-sm text-taupe">
        We couldn&apos;t find that one. Let&apos;s get you back to something sweet.
      </p>
      <Link href="/" className="btn-primary mt-2">Back to Home</Link>
    </div>
  );
}

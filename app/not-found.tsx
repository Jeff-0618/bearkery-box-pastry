import Link from "next/link";
import Bear from "@/components/shared/Bear";

export default function NotFound() {
  return (
    <div className="container-bx flex flex-col items-center gap-4 py-28 text-center">
      <div className="h-32 w-32">
        <Bear slot="sleeping" priority />
      </div>
      <h1 className="text-3xl font-medium">Our teddy dozed off</h1>
      <p className="max-w-sm text-taupe">
        This page must have wandered away while he was napping. Let's get you
        back to something sweet.
      </p>
      <Link href="/" className="btn-primary mt-2">Back to Home</Link>
    </div>
  );
}

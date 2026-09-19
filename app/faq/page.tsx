import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about preordering, pickup, and ordering from Bearkery Box Pastry.",
};

export default function FaqPage() {
  return <FaqClient />;
}

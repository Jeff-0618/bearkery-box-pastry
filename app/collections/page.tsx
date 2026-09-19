import type { Metadata } from "next";
import CollectionsClient from "./CollectionsClient";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse Bearkery Box Pastry collections — Pudding Burnt Cake, Everyday Favourites and Hand-Drawn Cakes.",
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}

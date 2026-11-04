import type { Metadata } from "next";
import MotionPage from "@/components/Motion";
import JsonLd from "@/components/JsonLd";
import { MOTION } from "@/lib/motion";
import { motionSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: MOTION.title,
  description: MOTION.description,
  path: MOTION.path,
  ownImage: true,
});

export default function Motion() {
  return (
    <>
      {motionSchema().map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <MotionPage />
    </>
  );
}

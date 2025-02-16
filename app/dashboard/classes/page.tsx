import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Класове",
};

export default function Classes() {
  return (
    <>
      <h1 className="text-2xl font-semibold p-5">Класове</h1>
    </>
  );
}

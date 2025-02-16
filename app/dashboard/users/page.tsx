import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Потребители",
};

export default function Users() {
  return (
    <>
      <h1 className="text-2xl font-semibold p-5">Потребители</h1>
    </>
  );
}

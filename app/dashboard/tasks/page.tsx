import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Задачи",
};

export default function Tasks() {
  return (
    <>
      <h1 className="text-2xl font-semibold p-5">Задачи</h1>
    </>
  );
}

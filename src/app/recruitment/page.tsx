import Form from "@/components/form";
import { redirect } from "next/navigation";

export default function Home() {
  if (process.env.RECRUITMENT_CLOSED === "true") {
    redirect("/closed");
  }
  return (
    <section className="p-12 md:p-24 overflow-x-hidden flex w-full justify-center items-center">
      <div className="container">
        <Form />
      </div>
    </section>
  );
}

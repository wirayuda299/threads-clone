import { CreateThreadForm } from "@/components/index";

export const metadata = {
  title: "Create",
};

export default function Create() {
  return (
    <div className="h-full w-full p-3 ">
      <CreateThreadForm />;
    </div>
  );
}

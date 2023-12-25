import { Card } from "@/components/index";
import { getActivities } from "@/lib/actions/thread.action";

export const metadata = {
  title: "Activity",
};

export default async function Activity() {
  const acitivities = await getActivities();

  return (
    <section className="flex h-full min-h-screen w-full flex-col gap-5 overflow-y-auto px-5 pb-44 pt-5">
      <h1 className="py-5 text-2xl font-bold lg:text-4xl">Activity</h1>
      {acitivities?.map((activity) => (
        <Card {...activity} key={activity.id} cardType="activity" />
      ))}
    </section>
  );
}

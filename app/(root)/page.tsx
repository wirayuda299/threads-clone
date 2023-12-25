import { Card, Pagination } from "@/components/index";
import { getThreads } from "@/lib/actions/thread.action";

type Params = {
  searchParams: {
    page: string;
  };
};

export const metadata = {
  title: "Home",
};

export default async function Home({ searchParams }: Params) {
  const page = searchParams.page ? +searchParams.page : 1;
  const { threads, totalPages } = await getThreads(page);

  return (
    <section className="flex h-full min-h-screen w-full flex-col gap-5 overflow-y-auto px-5 pb-44 pt-5">
      {threads?.map((thread) => (
        <Card cardType={"thread"} {...thread} key={thread.id} />
      ))}
      <Pagination totalPage={totalPages} />
    </section>
  );
}

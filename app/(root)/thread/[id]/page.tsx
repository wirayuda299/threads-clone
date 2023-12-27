import { Card, CommentForm } from "@/components/index";
import { getThreadById } from "@/lib/actions/thread.action";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function ThreadDetail({ params: { id } }: Props) {
  const { thread, comments } = await getThreadById(id);

  return (
    <div className="no-scrollbar h-full w-full flex-1 overflow-y-auto px-8 pb-24 pt-5">
      <Card {...thread} key={thread.id} />
      <CommentForm id={id} />
      <section className="flex flex-col gap-5 pt-5">
        {comments.map((comment) => (
          <Card key={comment.id} {...comment} />
        ))}
      </section>
    </div>
  );
}

import AddBlogDetails from "@/src/components/Ui/Dashboard/Blog/BlogDetails/AddBlogDetails";

interface PageProps {
  searchParams: Promise<{ blog_id?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { blog_id } = await searchParams;

  return (
    <>
      <AddBlogDetails defaultBlogId={blog_id} />
    </>
  );
};

export default Page;

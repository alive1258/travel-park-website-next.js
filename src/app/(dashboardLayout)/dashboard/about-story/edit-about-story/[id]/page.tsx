import EditAboutStory from "@/src/components/Ui/Dashboard/AboutStory/EditAboutStory";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditAboutStory id={id} />
    </div>
  );
};

export default Page;

import EditGallery from "@/src/components/Ui/Dashboard/Gallery/EditGallery";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditGallery id={id} />
    </div>
  );
};

export default Page;

import EditHero from "@/src/components/Ui/Dashboard/Hero/EditHero";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditHero id={id} />
    </div>
  );
};

export default Page;

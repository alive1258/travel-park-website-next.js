import EditEmployee from "@/src/components/Ui/Dashboard/Employees/EditEmployee";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  return (
    <div>
      <EditEmployee id={id} />
    </div>
  );
};

export default Page;

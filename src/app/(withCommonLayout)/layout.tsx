import Footer from "@/src/components/Shared/Footer/Footer";
import Navbar from "@/src/components/Shared/Navbar/Navbar";

const CommonLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />

      {/* clears the fixed mobile bottom nav so it never covers page content */}
      <div className="h-24 lg:hidden" />
    </>
  );
};

export default CommonLayout;

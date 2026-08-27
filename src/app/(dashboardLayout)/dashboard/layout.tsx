"use client";

import { DNavbar } from "@/src/components/Ui/Dashboard/DNavbar/DNavbar";
import { Sidebar } from "@/src/components/Ui/Dashboard/Sidebar/Sidebar";
import React, { useState, ReactNode } from "react";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleCloseSidebar = () => setSidebarOpen(false);
  const handleOpenSidebar = () => setSidebarOpen(true);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={handleCloseSidebar}
        />
      )}

      <div className="print:hidden contents">
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden print:overflow-visible">
        <div className="print:hidden contents">
          <DNavbar onOpenSidebar={handleOpenSidebar} />
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 print:overflow-visible print:p-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

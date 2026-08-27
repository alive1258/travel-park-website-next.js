import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Breadcrumb {
  title: string;
  link?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs = [] }) => {
  return (
    <div className="flex flex-col gap-1.5 border-b border-gray-200 pb-5">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

      {breadcrumbs.length > 0 && (
        <nav className="flex items-center flex-wrap gap-1.5 text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <span key={`${crumb.title}-${index}`} className="flex items-center gap-1.5">
                {crumb.link && !isLast ? (
                  <Link href={crumb.link} className="hover:text-emerald-600 transition">
                    {crumb.title}
                  </Link>
                ) : (
                  <span className={isLast ? "text-gray-700 font-medium" : ""}>
                    {crumb.title}
                  </span>
                )}
                {!isLast && <ChevronRight size={14} className="text-gray-300" />}
              </span>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default PageHeader;

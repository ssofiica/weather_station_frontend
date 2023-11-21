import React from 'react';

export interface BreadcrumbLink {
    label: string;
    url: string;
  }

interface BreadcrumbsProps {
  links: BreadcrumbLink[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ links }) => {
  return (
    <div className="breadcrumbs">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          <span>{link.label}</span>
          {index < links.length - 1 && <span className="separator">/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
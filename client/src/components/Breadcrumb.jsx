import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className="breadcrumb_section">
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
          <span>/</span>
        </li>
        {pathnames.map((value, index) => {
          const pathTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <li key={pathTo} className="breadcrumb-item">
              <Link to={pathTo}>{value}</Link>
              <span>/</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;

import React from "react";
import { Link } from "react-router-dom";

const sidebarItems = [
  { id: 2, name: "Departments", link: "/departments" },
  { id: 3, name: "Employees", link: "/employees" },
  { id: 4, name: "Vehicles", link: "/vehicles" },
  { id: 5, name: "Parking Areas", link: "/parkings" },
  { id: 2, name: "X=Departments=X", link: "/register-company" },
  { id: 3, name: "X=Employees=X", link: "/book" },
  { id: 4, name: "X=Vehicles=X", link: "/home" },
  { id: 5, name: "X=Parking Areas=X", link: "/company" },
];

const userType = "employee";

userType === "employee"
  ? sidebarItems.unshift({ id: 1, name: "Companies", link: "/companies" })
  : sidebarItems.unshift({ id: 1, name: "Company", link: "/companies" });

const Sidebar = () => {
  // return <div className="sidebar"></div>;
  return (
    <div className="sidebar">
      <ul className="">
        {sidebarItems.map((item) => {
          return (
            <li className="nav-item" key={item.id}>
              <Link className="nav-link active" to={item.link}>
                {item.name}
              </Link>
              {/* <a className="nav-link active" href={item.link}>
                {item.name}
              </a> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navStyle.css";
import AddItemForm from "./AddItemForm";
import ProductTable from "./ProductTable";
import CreateUserForm from "./CreateUserForm";
import SalesReport from "./SalesReport";
import CalendarPage from "../pages/CalenderPage";

const AdminNavbar = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();

  const handleLinkClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-navbar-container">
      <div className="admin-vertical-navbar">
        <nav className="navbar navbar-expand-md navbar-black bg-black">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav flex-column">
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  href="#"
                  onClick={() => handleLinkClick(null)}
                >
                  Admin Portal
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link text-white ${
                    activeComponent === "AddItemForm" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleLinkClick("AddItemForm")}
                >
                  Add New Product
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link text-white ${
                    activeComponent === "ProductTable" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleLinkClick("ProductTable")}
                >
                  Edit Product
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link text-white ${
                    activeComponent === "CreateUserForm" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleLinkClick("CreateUserForm")}
                >
                  Add User
                </a>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link text-white ${
                    activeComponent === "SalesReport" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleLinkClick("SalesReport")}
                >
                  Sales
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link text-white ${
                    activeComponent === "CalendarPage" ? "active" : ""
                  }`}
                  href="#"
                  onClick={() => handleLinkClick("CalendarPage")}
                >
                  Calendar
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  href="#"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main-content">
        {activeComponent === "AddItemForm" && (
          <div className="add-item-form">
            <AddItemForm show={true} handleClose={handleLinkClick} />
          </div>
        )}
        {activeComponent === "ProductTable" && (
          <div className="product-table">
            <ProductTable />
          </div>
        )}
        {activeComponent === "CreateUserForm" && (
          <div className="create-user-form">
            <CreateUserForm />
          </div>
        )}
        {activeComponent === "SalesReport" && (
          <div className="sales-report">
            <SalesReport />
          </div>
        )}
        {activeComponent === "CalendarPage" && (
          <div className="calendar-page">
            <CalendarPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;

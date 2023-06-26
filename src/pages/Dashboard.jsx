import React, { useState } from "react";
import SalesReport from "../components/SalesReport";
import AdminNavbar from "../components/AdminNavbar";

function Dashboard() {
  const [mostOrderedItem, setMostOrderedItem] = useState(null);
  const [mostOrderedItemCount, setMostOrderedItemCount] = useState(0);

  const handleMostOrderedItemChange = (item, count) => {
    setMostOrderedItem(item);
    setMostOrderedItemCount(count);
  };

  return (
    <>
      <AdminNavbar />
      <div className="dash" style={{ marginTop: "20px", marginLeft: "20px" }}>
        <h1></h1>
      </div>
    </>
  );
}

export default Dashboard;

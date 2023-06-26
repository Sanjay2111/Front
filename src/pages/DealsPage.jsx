import React from "react";
import CNavbar from "../components/Navbar";
import Navbar2 from "../components/Navbar2";

function DealsPage() {
  return (
    <>
      <div>
        <CNavbar />
        <Navbar2 />
        <div className="ad-container animate__animated animate__fadeInDown bg-light p-4 rounded">
          <h3 className="ad-title">Independence Day Special</h3>
          <p className="ad-description">10% off any laptop</p>
          <p className="ad-promocode">
            Use promo code:{" "}
            <span style={{ color: "red", fontWeight: "bold" }}>July4</span>
          </p>
        </div>

        <div className="ad-container animate__animated animate__fadeInDown bg-light p-4 rounded mt-4">
          <h3 className="ad-title">Free Shipping</h3>
          <p className="ad-description">
            Get free shipping on orders over $150
          </p>
        </div>

        <div className="ad-container animate__animated animate__fadeInDown bg-light p-4 rounded mt-4">
          <h3 className="ad-title">Special Offer</h3>
          <p className="ad-description">
            Get a free LogicTech Mouse with the purchase of any Laptop
          </p>
        </div>

        <div className="ad-container animate__animated animate__fadeInDown bg-light p-4 rounded mt-4">
          <h3 className="ad-title">No Interest Installment Plans</h3>
          <p className="ad-description">
            No interest for phones on 30-month installment plans
          </p>
        </div>
      </div>
    </>
  );
}

export default DealsPage;

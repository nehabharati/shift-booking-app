import React, { useState } from "react";
import CurrentShift from "./CurrentShift";
import AvailableShift from "./AvailableShift";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="myNav">
      <nav>
        <Link to="current" onClick={() => <CurrentShift />}>
          My Shifts
        </Link>
        <Link to="available" onClick={() => <AvailableShift />}>
          Available Shifts
        </Link>
      </nav>
    </div>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";
import NexusNav from "./NexusNav";
import NexusFooter from "./NexusFooter";

export default function NexusLayout() {
  return (
    <div className="min-h-screen bg-void grid-bg">
      <NexusNav />
      <main className="lg:ml-20">
        <Outlet />
      </main>
      <NexusFooter />
    </div>
  );
}
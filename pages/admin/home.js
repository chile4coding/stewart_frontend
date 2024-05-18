import AdminLayout from "@/components/admin/AdminLayout";
import OverviewDetails from "@/components/admin/overview/OverviewDetails";
import React from "react";
import { MetaDataC } from "../orders";

export default function AdminHome() {
  return (
    <>
      <MetaDataC title="Admin Dashboard" />

      <AdminLayout>
        <div className=" px-10 sm:px-4 max-h-[100vh]  overflow-y-scroll">
          <OverviewDetails />
        </div>
      </AdminLayout>
    </>
  );
}

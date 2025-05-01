"use client";
import React from "react";
import ReportCard from "../components/Report/ReportCard";
import { Input } from "../components/ui/input";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Button } from "../components/ui/button";
import { FilePlus } from "lucide-react";
import Link from "next/link";

const Report = () => {
  const reports = useQuery(api.reports.listReports, {}) || [];
  reports.reverse();

  return (
    <div className="flex flex-col items-center justify-center md:mt-20 mb-5 md:mx-10 lg:mx-30 xl:mx-40 overflow-scroll-y">
      <div className="flex flex-row gap-5 items-center justify-center">
        <h3 className="text-2xl md:text-3xl font-semi-bold text-center ">
          List of reports
        </h3>
        <Link href="/report/addreport">
          <Button variant={"outline"} className="text-slate-500">
            <FilePlus /> Add Report
          </Button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-5 md:mx-5">
        <div className="w-full md:w-[300px] lg:w-[300px] xl:w-[400px]">
          <Input
            type="text"
            className="rounded-lg h-12"
            placeholder="Search"
            disabled={true}
          />
        </div>
        <div className="w-full md:w-[300px] lg:w-[300px] xl:w-[400px]">
          <Input
            type="text"
            className="rounded-lg h-12"
            placeholder="Business Unit"
            disabled={true}
          />
        </div>
      </div>
      <div className="flex items-center justify-center flew-row flex-wrap gap-5 my-5 w-full">
        {reports.map((report) => (
          <ReportCard key={report._id} report={report} />
        ))}
      </div>
    </div>
  );
};

export default Report;

"use client";
import React from "react";
import ReportForm from "./ReportForm";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type updateFormProp = {
  id: Id<"reports">;
};
const UpdateForm = ({ id }: updateFormProp) => {
  const report = useQuery(api.reports.getReport, { id: id });
  return <ReportForm type="update" report={report as Doc<"reports">} />;
};

export default UpdateForm;

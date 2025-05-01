import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
type ReportCardProp = {
  report: {
    _id: string;
    reportTitle: string;
    reportOwner: string;
    businessUnit: string;
    reportUrl: string;
    briefDescription: string;
  };
};
const ReportCard = ({ report }: ReportCardProp) => {
  function capFirstWord(word: string) {
    if (word.length > 70) {
      word = word.slice(0, 70) + "...";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  function capWords(words: string) {
    if (words.length > 50) {
      words = words.slice(0, 50) + "...";
    }
    return words
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <Card className="p-0 m-0 w-[300px]">
      <CardHeader className="p-0 m-0">
        <a href={report.reportUrl} target="_blank" className="cursor-pointer">
          <Image
            className="rounded-t-md object-cover"
            src="/gsc.jpg"
            alt="gsc"
            width={300}
            height={100}
            priority={true}
          />
        </a>
        <CardTitle className="text-lg px-4 mt-1 text-wrap">
          {capWords(report.reportTitle)}
        </CardTitle>
        <CardDescription className="text-md px-4 mt-1">{`Author | ${capWords(report.reportOwner)}`}</CardDescription>
      </CardHeader>
      <CardContent className="text-md my-0 px-4  ">
        <p>{capFirstWord(report.briefDescription)}</p>
      </CardContent>
      <CardFooter className="mt-2 mb-4 px-4">
        <Link href={`/report/${report._id}`}>
          <Button size={"default"} className="cursor-pointer">
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormDropDownProps = {
  onChangeHandler: (value: string) => void;
  value: string;
};

const businessUnits: string[] = [
  "Finance",
  "Global Supply Chain (GSC)",
  "Segments",
  "Development",
];

const FormDropdown = ({ onChangeHandler, value }: FormDropDownProps) => {
  return (
    <Select onValueChange={onChangeHandler} value={value}>
      <SelectTrigger className="w-full ">
        <SelectValue placeholder="the report's business unit" />
      </SelectTrigger>
      <SelectContent>
        {businessUnits.map((item, index) => (
          <SelectItem
            value={item}
            key={index}
            className="text-lg text-slate-500"
          >
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FormDropdown;

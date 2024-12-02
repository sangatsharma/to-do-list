import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";

interface ISelectInputProps {
  label: string;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
  value: string;
  className?: string;
}

const SelectInput = React.forwardRef<HTMLDivElement, ISelectInputProps>(
  ({ label, options, onValueChange, value, className }, ref) => {
    return (
      <div ref={ref}>
        <Select
          onValueChange={(newValue) => {
            onValueChange(newValue);
          }}
          defaultValue={value}
          value={value}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder="Low" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {options.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }
);

export default SelectInput;

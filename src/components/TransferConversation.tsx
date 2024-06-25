import * as React from "react";
import { MenuItem, TextField, SelectChangeEvent } from "@mui/material";

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const handleChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex-1 text-left">
      <TextField
        id={`dropdown-${label}`}
        select
        fullWidth
        label={label}
        value={value}
        onChange={handleChange}
        // className="text-sm leading-5"
        //   helperText={`Please select ${label}`}
        // className="min-w-[300px]"
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={`flex flex-col justify-center ${className}`}>
      <div className="flex flex-col justify-center">
        <div className="justify-center px-3 py-2 rounded-lg">{children}</div>
      </div>
    </div>
  );
};

function TransferConversation() {
  const [reason, setReason] = React.useState("Select");
  const [assignedTo, setAssignedTo] = React.useState("Automatic");
  const [product, setProduct] = React.useState("Credit Card");
  const [subProduct, setSubProduct] = React.useState("Infinia");
  const [category, setCategory] = React.useState("Inquiry");
  const [subCategory, setSubCategory] = React.useState("Transaction Enquiry");

  return (
    <div className="flex flex-col py-6 bg-white rounded-2xl shadow-xl ">
      <header className="flex gap-5 justify-between px-6 w-full text-xl font-semibold tracking-normal text-emerald-950 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2 justify-end py-px">
          <img
            loading="lazy"
            src="{{ext_16}}"
            alt=""
            className="shrink-0 w-6 aspect-square"
          />
          <h1 className="flex-auto my-auto">Transfer Conversation</h1>
        </div>
        <img
          loading="lazy"
          src="{{ext_17}}"
          alt=""
          className="shrink-0 self-start w-6 aspect-square"
        />
      </header>
      <img
        loading="lazy"
        src="{{ext_18}}"
        alt=""
        className="mt-6 w-full border border-gray-300 border-solid stroke-[1px] stroke-gray-300 max-md:max-w-full"
      />
      <div className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4 max-sm:flex-wrap">
          <Dropdown
            label="Reason"
            value={reason}
            options={["Select", "Option 1", "Option 2"]}
            onChange={setReason}
          />
          <Dropdown
            label="Assigned To"
            value={assignedTo}
            options={["Automatic", "Option 1", "Option 2"]}
            onChange={setAssignedTo}
          />
          <Dropdown
            label="Product"
            value={product}
            options={["Credit Card", "Option 1", "Option 2"]}
            onChange={setProduct}
          />
          <Dropdown
            label="Sub-Product"
            value={subProduct}
            options={["Infinia", "Option 1", "Option 2"]}
            onChange={setSubProduct}
          />

          <Dropdown
            label="Category"
            value={category}
            options={["Inquiry", "Option 1", "Option 2"]}
            onChange={setCategory}
          />
          <Dropdown
            label="Sub-Category"
            value={subCategory}
            options={["Transaction Enquiry", "Option 1", "Option 2"]}
            onChange={setSubCategory}
          />
        </div>

        <div className="mt-2">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Description"
            type="textarea"
          />
        </div>
      </div>
      <div className="mt-6 w-full border border-gray-300 border-solid stroke-[1px] stroke-gray-300 max-md:max-w-full" />
      <div className="flex gap-4 px-6 mt-6 text-base font-semibold leading-6 text-center whitespace-nowrap max-md:flex-wrap max-md:px-5">
        <Button className="text-cyan-700 bg-white border-2 border-cyan-700 border-solid">
          Cancel
        </Button>
        <Button className="text-white bg-sky-600">Submit</Button>
      </div>
    </div>
  );
}

export default TransferConversation;

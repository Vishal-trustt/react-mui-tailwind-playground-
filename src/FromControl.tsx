import * as React from "react";

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options }) => {
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex gap-3 justify-between pr-3 pb-3.5 pl-3.5 bg-white rounded-lg border border-gray-400 border-solid">
        <div className="flex flex-col">
          <label
            htmlFor={`dropdown-${label}`}
            className="justify-center px-1 text-xs font-semibold leading-5 whitespace-nowrap bg-white"
          >
            {label}
          </label>
          <select
            id={`dropdown-${label}`}
            value={selectedValue}
            onChange={handleChange}
            className="text-sm leading-5"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <img
          loading="lazy"
          src="{{ext_15}}"
          alt="Dropdown arrow"
          className="shrink-0 self-start mt-3.5 w-5 aspect-square"
        />
      </div>
    </div>
  );
};

const FromControl: React.FC = () => {
  const dropdownData = [
    {
      label: "Reason",
      value: "Select",
      options: ["Select", "Option 1", "Option 2"],
    },
    {
      label: "Assigned To",
      value: "Automatic",
      options: ["Automatic", "Manual"],
    },
    {
      label: "Product",
      value: "Credit Card",
      options: ["Credit Card", "Debit Card", "Loan"],
    },
    {
      label: "Sub-Product",
      value: "Infinia",
      options: ["Infinia", "Regalia", "Diners"],
    },
    {
      label: "Category",
      value: "Inquiry",
      options: ["Inquiry", "Complaint", "Request"],
    },
    {
      label: "Sub-Category",
      value: "Transaction Enquiry",
      options: ["Transaction Enquiry", "Billing Dispute", "Card Replacement"],
    },
  ];

  const [description, setDescription] = React.useState("");

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col py-6 bg-white rounded-2xl shadow-xl max-w-[998px]">
      <header className="flex gap-5 justify-between px-6 w-full text-xl font-semibold tracking-normal text-emerald-950 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2 justify-end py-px">
          <img
            loading="lazy"
            src="{{ext_16}}"
            alt="Transfer icon"
            className="shrink-0 w-6 aspect-square"
          />
          <h1 className="flex-auto my-auto">Transfer Conversation</h1>
        </div>
        <img
          loading="lazy"
          src="{{ext_17}}"
          alt="Close icon"
          className="shrink-0 self-start w-6 aspect-square"
        />
      </header>
      <img
        loading="lazy"
        src="{{ext_18}}"
        alt="Separator"
        className="mt-6 w-full border border-gray-300 border-solid stroke-[1px] stroke-gray-300 max-md:max-w-full"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col px-6 mt-6 w-full max-md:px-5 max-md:max-w-full"
      >
        <section className="flex gap-4 max-md:flex-wrap">
          {dropdownData.slice(0, 4).map((item) => (
            <Dropdown
              key={item.label}
              label={item.label}
              value={item.value}
              options={item.options}
            />
          ))}
        </section>
        <section className="flex gap-4 self-start mt-6 text-gray-900 max-md:flex-wrap">
          {dropdownData.slice(4).map((item) => (
            <Dropdown
              key={item.label}
              label={item.label}
              value={item.value}
              options={item.options}
            />
          ))}
        </section>
        <div className="flex flex-col justify-center px-3.5 pb-3.5 mt-6 bg-white rounded-lg border border-gray-400 border-solid max-md:max-w-full">
          <label
            htmlFor="description"
            className="justify-center self-start px-1 text-xs font-semibold leading-5 text-gray-900 whitespace-nowrap bg-white"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Please describe the issue"
            className="mt-1 text-sm leading-5 text-gray-400 max-md:max-w-full"
          />
        </div>
        <img
          loading="lazy"
          src="{{ext_19}}"
          alt="Separator"
          className="mt-6 w-full border border-gray-300 border-solid stroke-[1px] stroke-gray-300 max-md:max-w-full"
        />
        <footer className="flex gap-4 mt-6 text-base font-semibold leading-6 text-center whitespace-nowrap max-md:flex-wrap">
          <button
            type="button"
            className="flex flex-col justify-center text-cyan-700 bg-white"
          >
            <div className="justify-center px-3 py-2 rounded-lg border-2 border-cyan-700 border-solid">
              Cancel
            </div>
          </button>
          <button
            type="submit"
            className="justify-center px-3 py-2 text-white bg-sky-600 rounded-lg"
          >
            Submit
          </button>
        </footer>
      </form>
    </div>
  );
};

export default FromControl;

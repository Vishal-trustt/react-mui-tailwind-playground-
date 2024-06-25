import * as React from "react";

interface TimelineItemProps {
  name: string;
  id: string;
  message: string;
  status: "Done" | "Declined";
  timestamp: string;
  avatarSrc: string;
  isLast?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  name,
  id,
  message,
  status,
  timestamp,
  avatarSrc,
  isLast = false,
}) => {
  return (
    <div className="relative flex gap-3 mt-2 rounded-lg bg-slate-100">
      <div className="absolute left-[25px] w-[2px] h-[20px] bg-[#D0DDFC]" />

      <div className="p-4 z-10">
        <div className="flex justify-center items-center self-start p-0.5 w-5 h-5 bg-white rounded-2xl border border-gray-300 border-solid">
          <img
            src={avatarSrc}
            alt={`${name}'s avatar`}
            className="w-4 aspect-square"
          />
        </div>
      </div>
      {!isLast && (
        <div className="absolute top-9 left-[25px] w-[2px] h-full bg-[#D0DDFC]" />
      )}
      <div className="flex flex-col text-left flex-1 p-4 pl-0">
        <div className="flex gap-1 font-semibold tracking-wide">
          <div className="text-sm text-black">{name}</div>
          <div className="text-xs text-gray-500">{id}</div>
        </div>
        <div className="justify-center p-2 mt-2 text-sm tracking-wide leading-5 text-black bg-white rounded">
          {message}
        </div>
        <div
          className={`justify-center w-fit px-2 py-0.5 mt-2 text-sm font-medium leading-4 text-right capitalize whitespace-nowrap rounded-[80px] ${
            status === "Done"
              ? "text-emerald-700 bg-emerald-50"
              : "text-rose-600 bg-rose-50"
          }`}
        >
          {status}
        </div>
        {timestamp && (
          <div className="mt-2 text-xs tracking-wide text-gray-500">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

function MyComponent({ ref }: any) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const timelineData: TimelineItemProps[] = [
    {
      name: "Swarnak Kundu",
      id: "634994101",
      message: "Issue fixed by L1 team, sending to finance team",
      status: "Done",
      timestamp: "Feb 1 2024 at 03:44 PM",
      avatarSrc: "{{ext_13}}",
    },
    {
      name: "Swarnak Kundu",
      id: "634994101",
      message: "Issues with last transaction",
      status: "Declined",
      timestamp: "Feb 1 2024 at 03:44 PM",
      avatarSrc: "{{ext_14}}",
    },
    {
      name: "Swarnak Kundu",
      id: "634994101",
      message: "Last transaction not showing",
      status: "Done",
      timestamp: "Feb 1 2024 at 03:44 PM",
      avatarSrc: "{{ext_15}}",
    },
    {
      name: "Aman Singh",
      id: "634994101",
      message: "Signer location Captured",
      status: "Done",
      timestamp: "",
      avatarSrc: "{{ext_16}}",
      isLast: true,
    },
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div ref={ref} className="relative flex flex-col items-center self-stretch bg-white rounded-xl border border-gray-100 border-solid shadow-md bg-blend-luminosity max-w-[322px]">
      <header className="flex gap-5 justify-between self-stretch px-4 py-3 w-full text-base font-semibold tracking-wide text-gray-900 whitespace-nowrap shadow-md backdrop-blur-md bg-white bg-opacity-80">
        <div className="flex gap-3">
          <img
            src="{{ext_17}}"
            alt="Timeline icon"
            className="shrink-0 w-6 aspect-square"
          />
          <h1 className="justify-center px-px py-1.5 my-auto">Timeline</h1>
        </div>
        <img src="{{ext_18}}" alt="" className="shrink-0 w-6 aspect-square" />
      </header>
      <main
        className={`${
          isExpanded ? "max-h-[1000px]" : "max-h-[400px] overflow-hidden"
        } transition-all duration-600 p-2`}
      >
        {timelineData.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </main>
      <button
        className="absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg"
        onClick={toggleExpand}
      >
        <img
          src={isExpanded ? "{{ext_19}}" : "{{ext_20}}"}
          alt={isExpanded ? "Collapse" : "Expand"}
          className="w-4 h-4"
        />
      </button>
    </div>
  );
}

export default MyComponent;

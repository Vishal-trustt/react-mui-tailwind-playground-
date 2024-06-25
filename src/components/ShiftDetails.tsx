import * as React from "react";

interface BadgeProps {
  icon: string;
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ icon, text }) => {
  return (
    <div className="flex gap-1 justify-center items-center px-1.5 rounded-xl bg-sky-600 bg-opacity-10">
      <img
        src={icon}
        alt=""
        className="shrink-0 self-stretch my-auto w-4 aspect-square"
      />
      <div className="self-stretch">{text}</div>
    </div>
  );
};

interface ManagerTeamProps {
  icon: string;
  label: string;
  text: string;
}

const ManagerTeam: React.FC<ManagerTeamProps> = ({ icon, label, text }) => {
  return (
    <div className="flex flex-col flex-1 justify-center px-4 py-2.5 rounded-lg bg-indigo-200 bg-opacity-50">
      <div className="flex gap-1 justify-center self-center text-xs tracking-normal text-center whitespace-nowrap">
        <img
          src={icon}
          alt=""
          className="shrink-0 self-start w-3.5 aspect-square"
        />
        <div>{label}</div>
      </div>
      <div className="text-base font-semibold tracking-normal">{text}</div>
    </div>
  );
};

const ShiftDetails: React.FC = () => {
  const managerTeamData = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a12c6db053ff0212469d0126583e35d79bc4d465508e6e188eedcf9782c1fe2?apiKey=07b4a9f3b3aa4f51912c327d15504e85&",
      label: "Manager",
      text: "Aman Pradhan",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d275d040863041a4e62d36ec02610f3aaeeb24c9ccd5b9088ed126bac9808071?apiKey=07b4a9f3b3aa4f51912c327d15504e85&",
      label: "Team",
      text: "Credit Card",
    },
  ];

  return (
    <div className=" m-2 flex flex-col p-4 bg-white rounded-lg shadow max-w-[322px]">
      <header className="flex gap-5 justify-between">
        <h2 className="text-base font-semibold tracking-normal text-emerald-950">
          Shift Details
        </h2>
        <Badge
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e11384c935a9a81b27130faaa3f555a7325ae5abbbf156dfff97ed58140bd3c3?apiKey=07b4a9f3b3aa4f51912c327d15504e85&"
          text="Attendance - 15/20 days"
        />
      </header>
      <div className="flex gap-2 mt-3">
        <div className="justify-center flex flex-col px-3 py-1.5 text-xl font-semibold text-cyan-700 rounded-lg bg-sky-600 bg-opacity-10">
          <span>
            27</span><span>Nov</span>
        </div>
        <div className="flex flex-col pl-3 my-auto">
          <div className="flex gap-1 text-xs tracking-normal text-gray-600">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f028ac5c8c0b5360ee2e930c50b0f25e117a8b075f1c5886e49dae160db2a55f?apiKey=07b4a9f3b3aa4f51912c327d15504e85&"
              alt=""
              className="shrink-0 self-start w-3.5 aspect-square"
            />
            <div>Shift Timing</div>
          </div>
          <div className="text-base font-semibold tracking-normal text-emerald-950 text-opacity-90">
            10:00 am - 07:00 pm
          </div>
        </div>
      </div>
      <hr className="shrink-0 mt-3 h-px bg-gray-300 rounded-sm" />
      <div className="flex gap-3 mt-3 text-sky-900">
        {managerTeamData.map((item, index) => (
          <ManagerTeam
            key={index}
            icon={item.icon}
            label={item.label}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

export default ShiftDetails;

import type { MetaFunction } from "@remix-run/node";

import { Button } from "~/components/ant-design/Button";

import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import IFrame from "~/components/IFrame";
import CommonModal from "./../components/ant-design/CommonModal";
import { faCogs, faGear } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const settingData = [
  {
    id: 1,
    name: "Directory setting",
    defaultPath: "directory_settings",
  },
  {
    id: 2,
    name: "Bills setting",
    defaultPath: "bill_settings",
  },
  {
    id: 3,
    name: "Project_settings",
    defaultPath: "project_settings",
  },
  {
    id: 4,
    name: "files & photos settings",
    defaultPath: "files_and_photos_settings",
  },
  {
    id: 5,
    name: "Bid settings",
    defaultPath: "bid_settings",
  },
  {
    id: 6,
    name: "Dailylog settings",
    defaultPath: "daily_log_settings",
  },
  {
    id: 7,
    name: "Crews schedule setting",
    defaultPath: "crews_schedule_settings",
  },
  {
    id: 8,
    name: "Estimate settings",
    defaultPath: "estimate_settings",
  },
  {
    id: 9,
    name: "To Do setting",
    defaultPath: "to_do_settings",
  },
  {
    id: 10,
    name: "Safety meeting settings",
    defaultPath: "safety_meeting_settings",
  },
];

export default function Index() {
  const [open, setOpen] = useState(false);
  const [defaultPath, setDefaultPath] = useState("");
  // const navigate = useNavigate();
  const closeModalHandler = () => {
    setOpen(false);
    setDefaultPath("");
  };

  console.log("defaultpath ", defaultPath);
  return (
    <>
      <div className="px-6 py-3 flex gap-4 flex-col">
        <div className="flex gap-3 text-primary-900 text-xl font-bold">
          <FontAwesomeIcon className="w-8 h-8" icon={faCogs} />
          Module Setting :
        </div>
        <div className="flex gap-3">
          {settingData.map((item) => (
            <div key={item.id}>
              <Button
                className="bg-primary-900 text-white capitalize text-md p-2 outline-none"
                title={item.name}
                onClick={() => {
                  setDefaultPath(item.defaultPath);
                  setOpen(true);
                }}
              >
                {item.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <CommonModal
        isOpen={open}
        widthSize="90%"
        onCloseModal={closeModalHandler}
        modalBodyClass="p-0"
        height="75vh"
        header={{
          title:
            defaultPath?.replaceAll("_", " ").toLocaleUpperCase() ?? "Modal",
          icon: <FontAwesomeIcon className="w-3.5 h-3.5" icon={faGear} />,
          closeIcon: true,
        }}
      >
        {defaultPath ? (
          <IFrame
            key={defaultPath}
            path="/manage-settings"
            isSetting={true}
            otherParams={"new=1"}
            defaultPage={defaultPath}
          />
        ) : (
          <span className="text-red-600 text-2xl font-bold flex justify-center items-center w-full h-[75vh]">
            Something went wrong!
          </span>
        )}
      </CommonModal>
    </>
  );
}

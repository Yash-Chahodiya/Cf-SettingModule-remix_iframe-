import { useNavigate, useParams } from "@remix-run/react";
import { Button } from "antd";
import React from "react";
import IFrame from "~/components/IFrame";

const ManageSetting = () => {
  const { path } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="flex bg-[#F5F5F5] text-primary-900 max-h-16 py-3 px-4 text-xl font-bold shadow-lg ">
        <div
          onClick={() => navigate("/")}
          className="flex gap-1 justify-center items-center cursor-pointer hover:text-primary-700 "
        >
          {"< "}
          <span className="text-sm">back</span>
        </div>
        <div className="flex justify-center items-center  w-full  capitalize">
          {path?.replaceAll("_", " ")}
        </div>
      </div>
      <IFrame
        path="/manage-settings"
        isSetting={true}
        otherParams={"new=1"}
        defaultPage={path}
      />
    </>
  );
};

export default ManageSetting;

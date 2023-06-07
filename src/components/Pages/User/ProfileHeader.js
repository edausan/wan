import { Avatar } from "@mui/material";
import React from "react";
import { Ministries } from "@/Auth/Signup";

const ProfileHeader = ({ show, user }) => {
  const handleBGColor = () => {
    switch (user?.ministry) {
      case "JAM":
        return "bg-sky-600/80";
      case "VIA":
        return "bg-pink-600/80";
      case "TEAM":
        return "bg-yellow-600/80";
      case "ADMIN":
        return "bg-blue-600/80";

      default:
        return "bg-sky-500/80";
    }
  };

  return (
    <section
      className={`fixed p-3 w-full top-0 z-[2000] translate-y-[-100%] left-0 ${handleBGColor()}  backdrop-blur-sm text-white transition-all duration-150 shadow-lg ${
        show ? "translate-y-0" : ""
      }`}
    >
      <div className="flex flex-row gap-2 items-center max-w-[680px] mx-auto">
        <div className="flex flex-row gap-2 items-center">
          <Avatar
            src={user?.photoURL}
            className=" w-[45px] h-[45px] z-[1002] mt-[auto] saturate-[1.1]"
            // onClick={() => setOpen(true)}
          />
          <span className="text-white flex flex-col">
            <span className="font-bold ">{user?.displayName || user?.email}</span>
            <small className="text-xs text-white/80">
              {Ministries.filter((m) => m.id === user?.ministry)[0]?.name}
            </small>
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;

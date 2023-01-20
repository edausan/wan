import { CachedTwoTone, SettingsOutlined } from "@mui/icons-material";
import { Card, Skeleton } from "@mui/material";
import React from "react";

const ProfileLoading = () => {
  return (
    <Card className="rounded-3xl mb-4 shadow-md" elevation={0}>
      {/* <div className='flex flex-col items-center'> */}
      <div className="flex flex-row w-full items-center justify-end text-right p-4 gap-3">
        <CachedTwoTone className="w-[20px] h-[20px]" color="disabled" />
        <SettingsOutlined className="w-[20px] h-[20px]" color="disabled" />
      </div>
      <div className="flex flex-col items-center justify-center p-5 px-10">
        <Skeleton variant="circular" width={120} height={120} />
        <Skeleton variant="text" width={100} className="mt-3" />
        <Skeleton variant="text" width={140} />
        <Skeleton variant="text" width="100%" className="mt-4" />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="100%" height={66} className="mt-4" />
      </div>
      {/* </div> */}
    </Card>
  );
};

export default ProfileLoading;

import { Card, Skeleton } from "@mui/material";
import React from "react";

const SongLoading = () => {
  return (
    <Card className="phone:col-span-2 laptop:col-span-1 flex flex-row shadow-md" elevation={0}>
      <div className="flex flex-row gap-2 items-center w-[100%]">
        <Skeleton variant="rectangular" width={50} height={69} />
        <div className="flex-2 w-[50%]">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
        {/* <div className="flex-1 flex flex-row gap-2 items-center justify-center">
					<Skeleton variant="circular" width={16} height={16} />
					<Skeleton variant="circular" width={16} height={16} />
				</div> */}
        <div className="flex-1 flex flex-row items-center justify-end">
          <Skeleton
            variant="rectangular"
            width={64}
            height={69}
            className="border-r border-white"
          />
          <Skeleton variant="rectangular" width={64} height={69} />
        </div>
      </div>
    </Card>
  );
};

export default SongLoading;

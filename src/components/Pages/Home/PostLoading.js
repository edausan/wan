import { Card, Skeleton } from "@mui/material";
import React from "react";

const PostLoading = () => {
  return (
    <Card className="w-full shadow-md" fullWidth elevation={0}>
      <div className="flex flex-row p-3 gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width="45%" />
      </div>
      <Skeleton variant="rectangular" width="100%" height={100} />

      <div className="p-3">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="55%" />
      </div>
    </Card>
  );
};

export default PostLoading;

/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Chip, IconButton, TextField } from "@mui/material";
import React, { Suspense, useState } from "react";
import { Clear, FilterList, SearchOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { AppCtx } from "../../../App";

const FilterDrawer = React.lazy(() => import("./FilterDrawer"));

const SongSearch = ({
  setSearchText,
  open,
  setOpen,
  artists,
  albums,
  searchText,
  tags,
}) => {
  const { mode } = useContext(AppCtx);
  const [text, setText] = useState(null);

  // useEffect(() => {
  //   setSearchText(text);
  // }, [text]);

  const handleClear = () => {
    setText("");
    setSearchText(null);
  };

  return (
    <Card
      className={`p-4 sticky top-0 left-0 w-full z-10 box-border rounded-none shadow-md backdrop-blur-sm ${
        mode ? "bg-white/60" : "bg-[#121212]/60"
      }`}
      elevation={0}
    >
      <section className="flex flex-row gap-1 max-w-[680px] items-center justify-between mx-auto">
        <div className="max-w-[600px] w-full mx-auto bg-white/10 flex flex-row items-center rounded-md pr-2 box-border">
          <TextField
            fullWidth
            onChange={(e) => setText(e.target.value)}
            variant="filled"
            size="small"
            value={text}
            label="Search Song"
            className="TEXT [&>div::before]:!border-0 [&>div::after]:!border-0 [&>div]:!rounded-md [&>div]:!bg-white/0 [&>label]:!text-sm"
          />
          {text && (
            <IconButton size="small" onClick={handleClear}>
              <Clear />
            </IconButton>
          )}
          <IconButton size="small" onClick={() => setSearchText(text)}>
            <SearchOutlined />
          </IconButton>
        </div>
        <IconButton
          className="w-[40px] h-[40px]"
          onClick={() => setOpen(true)}
          size="small"
        >
          <FilterList />
        </IconButton>
      </section>

      <Suspense fallback={<div />}>
        <FilterDrawer
          open={open}
          setOpen={setOpen}
          artists={artists}
          albums={albums}
          setSearchText={setSearchText}
          searchText={text}
        />
      </Suspense>

      <div className="flex flex-row gap-2 phone:max-w-[100%] phone:overflow-x-auto pb-3 mt-4 items-center desktop:justify-start laptop:justify-start phone:justify-start desktop:flex-wrap desktop:max-w-[680px] laptop:max-w-[680px] mx-auto">
        {tags.map((tag) => {
          return (
            <Chip
              key={tag}
              label={tag}
              className={`text-white text-xs !h-[26px] ${
                searchText === tag ? "!bg-gray-800" : "!bg-gray-600"
              }`}
              onClick={
                searchText === tag
                  ? () => setSearchText(null)
                  : () => setSearchText(tag)
              }
            />
          );
        })}
      </div>

      {/* <div className='flex flex-row items-center justify-end mt-1'>
        <button
          className='px-3 py-0 rounded-sm bg-white/20 text-white text-xs '
          onClick={() => setOpen(true)}
        >
          Search Filter{searchText && `: ${searchText}`} <FilterList />
        </button>
      </div> */}
    </Card>
  );
};

export default React.memo(SongSearch);

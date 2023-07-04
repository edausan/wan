import { ClearAllOutlined } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, SwipeableDrawer } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectSongs } from "@/redux/slices/songsSlice";
import ALBUM_PLACEHOLDER from "@assets/music_placeholder.jpg";

const FilterDrawer = ({ artists, albums, searchText, setSearchText, open, setOpen }) => {
  const { albumCovers } = useSelector(selectSongs);

  return (
    <SwipeableDrawer open={open} onClose={() => setOpen(false)} anchor="bottom">
      <div className="flex flex-col gap-4 p-6 ">
        <FormControl variant="standard" fullWidth>
          <InputLabel id="arists">Filter by Artist</InputLabel>
          <Select
            labelId="arists"
            label="Filter by Artist"
            size="small"
            value={artists.findIndex((a) => a === searchText) === -1 ? null : searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="ARTIST [&>div]:!pb-1 items-end"
          >
            <MenuItem value={null}>
              <span className="text-xs">None</span>
            </MenuItem>
            {artists.map((artist) => {
              return (
                <MenuItem key={artist} value={artist}>
                  <span className="text-xs">{artist}</span>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl variant="standard" fullWidth>
          <InputLabel>Filter by Album</InputLabel>
          <Select
            label="Filter by Album"
            size="small"
            value={albums.findIndex((a) => a === searchText) === -1 ? null : searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="ALBUM [&>div]:!pb-1 items-end"
          >
            <MenuItem value={null}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
                  <img src={ALBUM_PLACEHOLDER} alt={"Album Cover"} className="w-full" />
                </div>
                <span className="text-xs">None</span>
              </div>
            </MenuItem>
            {albums.map((album) => {
              const cover = albumCovers.filter((cover) =>
                cover?.name?.toLowerCase().includes(album.toLowerCase()),
              )[0];
              return (
                <MenuItem key={album} value={album}>
                  <div className="flex flex-row gap-2 items-center">
                    <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
                      <img
                        src={cover?.photoURL ? cover?.photoURL : ALBUM_PLACEHOLDER}
                        alt={cover?.name || "Album Cover"}
                        className="w-full"
                      />
                    </div>
                    <span className="text-xs">{album}</span>
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button
          startIcon={<ClearAllOutlined />}
          onClick={() => setSearchText(null)}
          className="bg-sky-500 text-white"
        >
          Clear filter
        </Button>
      </div>
    </SwipeableDrawer>
  );
};

export default React.memo(FilterDrawer);

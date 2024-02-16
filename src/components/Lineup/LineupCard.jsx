/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FormControl, Grid, InputLabel, Select, MenuItem } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { GetAllSongs } from "@/Firebase/songsApi";

const initialState = {
  song_title: null,
  artist: null,
  album: null,
  lyrics: null,
  chords: null,
  media: null,
  from: null,
  id: null,
  is_new: false,
};

const LineupCard = ({
  category,
  setLineupData,
  songData,
  lineupData,
  handleChangeSong,
  currentStep,
}) => {
  const [cardData, setCardData] = useState(songData || initialState);
  const [currentCategory, setCurrentCategory] = useState(category);
  const [filteredSongs, setFilteredSongs] = useState([]);

  const songsQuery = useQuery({ queryKey: ["songs"], queryFn: GetAllSongs });

  useEffect(() => {
    setCurrentCategory(category);
  }, [category]);

  useEffect(() => {
    if (currentStep >= 2) {
      setCardData(initialState);
    }
  }, [currentStep]);

  const handleFilterSongs = () => {
    if (songsQuery.data?.length > 0 && currentCategory.id) {
      const filtered = songsQuery.data?.filter(
        (song) =>
          song?.tags?.length > 0 &&
          song?.tags.findIndex((tag) => currentCategory?.tags[0] === tag) >= 0,
      );
      setFilteredSongs(filtered);
    }
  };

  useEffect(() => {
    handleFilterSongs();
  }, [songsQuery.data]);

  // const handleSetLineup = () => {
  // 	const updated_lineup = lineupData?.map((ld) => {
  // 		if (ld.label === currentCategory.label) {
  // 			return {
  // 				...cardData,
  // 				label: currentCategory.label,
  // 			};
  // 		}

  // 		return ld;
  // 	});

  // 	setLineupData(updated_lineup);
  // };

  useEffect(() => {
    handleChangeSong && handleChangeSong({ song: cardData, category });
    if (cardData.title) {
      // handleSetLineup();
    }
  }, [cardData]);

  const handleRemoveSong = (id) => {
    const updated_lineup = lineupData.map((ld) => {
      if (ld.label === currentCategory.label) {
        if (ld.id === (cardData?.id || songData?.id)) {
          return currentCategory;
        }
      }

      return ld;
    });

    setCardData(initialState);

    setLineupData(updated_lineup);
  };

  return (
    <Grid item xs={12} md={12}>
      <section className="p-2 flex flex-row gap-2 items-center">
        <div className="flex-1">
          <FormControl variant="standard" fullWidth>
            <InputLabel className="text-sm">{currentCategory.label}</InputLabel>
            <Select
              // label={currentCategory.label}
              value={songData?.id || cardData.id}
              sx={{
                fontSize: 14,
              }}
              onChange={(e) => {
                setCardData({
                  ...songsQuery.data?.filter((s) => s.id === e.target.value)[0],
                });
              }}
            >
              {filteredSongs.map((song) => {
                return (
                  <MenuItem key={song.id} value={song.id}>
                    {song.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div>
          <button onClick={handleRemoveSong}>
            <Close />
          </button>
        </div>
      </section>
      {/* {error?.msg &&
				(error?.msg && error?.category === category.label ? (
					<small className="bg-red-100 text-red-500 text-xs rounded-md w-full px-2 py-1">
						{error?.msg}
					</small>
				) : (
					""
				))} */}
    </Grid>
  );
};

export default LineupCard;

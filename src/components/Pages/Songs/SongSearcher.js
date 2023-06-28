/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SwipeableDrawer,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { time } from "../../../Firebase";
import TextArea from "../../CustomComponents/TextArea";
import Loading from "../../CustomComponents/Loading";
import { Media } from "./SongPreview/SongPlayer";

const allSongsApi =
  "https://www.songpraise.com/api/songTitlesAfterModifiedDate/631123200000/language/5a2d25458c270b37345af0c5";
const api = "https://www.songpraise.com/api";
const searchSongApi = "/songs/versionGroup/";
const allSongs = "/songTitlesAfterModifiedDate/631123200000/language/";
const engLang = "5a2d25458c270b37345af0c5";
const filLang = "5d7007d029e75400049df908";

const SongSearcher = () => {
  const languages = [
    {
      id: "5a2d25458c270b37345af0c5",
      name: "English",
    },
    {
      id: "5d7007d029e75400049df908",
      name: "Filipino",
    },
  ];

  const [songs, setSongs] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedLang, setSelectedLang] = useState(languages[0].id);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [song, setSong] = useState(null);

  const getAllSongs = async () => {
    try {
      if (selectedLang) {
        const new_api = `${api}${allSongs}${selectedLang}`;
        const songs_api = selectedLang ? new_api : allSongs;
        const res = await fetch(songs_api);
        const data = await res.json();
        return data.sort((a, b) => a.title > b.title);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const searchSong = async () => {
    try {
      if (selectedSong) {
        const search_api = `${api}${searchSongApi}${selectedSong}`;
        const res = await fetch(search_api);
        const data = await res.json();
        return data;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  // get all songs per language
  const { isFetching, isSuccess, data, refetch } = useQuery("get-songs", getAllSongs, {
    cacheTime: time,
  });

  // search a song
  const searchQuery = useQuery("search-song", searchSong);

  // refetch data from get-songs
  useEffect(() => {
    refetch();
  }, [refetch, selectedLang]);

  useEffect(() => {
    // console.log({ songs });
  }, [songs]);

  // set data to song if the query is success
  useEffect(() => {
    if (isSuccess && data.length > 0) {
      setSongs(data);
      setSearchResult(data);
    }
  }, [isSuccess, data]);

  // check if get-song is isFetching
  useEffect(() => {
    if (isFetching) {
      //   console.log("Fetching songs...");
    }
  }, [isFetching]);

  // call handleSearch method when searchText has value & updating
  useEffect(() => {
    if (searchText) {
      handleSearch();
    }
  }, [searchText]);

  // filter songs on searching
  const handleSearch = (e) => {
    const res = songs.filter((song) => song.title.includes(searchText.toLowerCase()));
    setSearchResult(res);
  };

  // set the selected language
  // set the searchText to empty string
  // set the search result to empty array
  // set the songs result to empty array
  const handleLangChange = (e) => {
    setSearchText("");
    setSearchResult([]);
    setSongs([]);
    setSelectedLang(e.target.value);
  };

  // set data to song when searchQuery has data & isSuccess
  useEffect(() => {
    if (searchQuery.data && searchQuery.isSuccess) {
      setSong(searchQuery.data[0]);
    }
  }, [searchQuery.data, searchQuery.isSuccess]);

  // refetch searchQuery if selectedSong is not equal to null
  // set selectedSong to null
  useEffect(() => {
    if (selectedSong) {
      searchQuery.refetch();
      setSelectedSong(null);
    }
  }, [selectedSong]);

  useEffect(() => {
    if (searchQuery.isFetching) {
      //   console.log("Fetching song...");
    }
  }, [searchQuery.isFetching]);

  // set song to null to close the song preview
  const handleClose = () => {
    setSong(null);
  };

  return (
    <div className="p-4 max-w-[680px] mx-auto">
      <FormControl fullWidth className="mb-4">
        <InputLabel id="lang" className="text-sm">
          Select Language
        </InputLabel>
        <Select
          label="Select Language"
          labelId="lang"
          defaultValue={languages[0].id}
          onChange={handleLangChange}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.id} value={lang.id}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Search Song"
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        disabled={songs.length <= 0}
      />

      {(isFetching || searchQuery.isFetching) && <Loading />}
      {searchResult.map((song) => {
        return (
          <div
            onClick={() => setSelectedSong(song?.id)}
            key={song?.id}
            className="cursor-pointer p-2 hover:bg-sky-100"
          >
            {song?.title}
          </div>
        );
      })}
      <SongPreview song={song} onClose={handleClose} />
    </div>
  );
};

const SongPreview = ({ song, onClose }) => {
  return (
    <SwipeableDrawer open={song?.uuid || false} onClose={onClose} anchor="right">
      <section className="w-[80vw] h-[100vh] bg-white">
        {song?.youtubeUrl && (
          <div className="sticky top-0 z-10">
            <Media
              media={`https://www.youtube.com/embed/${song?.youtubeUrl}`}
              phoneHeight="phone:h-[250px]"
            />
          </div>
        )}
        <div className="p-8">
          <h2 className="font-bold text-lg mb-4">{song?.title}</h2>
          {song?.songVerseDTOS.map((verse) => (
            <div className="mb-4">
              <span>{verse?.chorus ? "Chorus" : "Verse"}</span>
              <TextArea value={verse?.text} color="#000" />
            </div>
          ))}
        </div>
      </section>
    </SwipeableDrawer>
  );
};

export default SongSearcher;

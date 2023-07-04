/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState, useCallback, Suspense } from "react";
import { RealtimeSongs } from "@/Firebase/songsApi";
import SongList from "./SongList";
import SongsQuery from "@api/songsQuery";

// const SongList = React.lazy(() => import('./SongList'));
const SongSearch = React.lazy(() => import("./SongSearch"));

const SongsMain = () => {
  // const { songs } = useSelector(selectSongs);
  const { data: songs } = RealtimeSongs();
  const [searchText, setSearchText] = useState(null);
  const [songList, setSongList] = useState([]);
  const [tags, setTags] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [open, setOpen] = useState(false);

  const memoizedAlbums = useMemo(() => albums, [albums]);
  const memoizedArtists = useMemo(() => artists, [artists]);
  const memoizedOpen = useMemo(() => open, [open]);

  const { updateLyricsQuery, updateChordsQuery, updateMediaQuery, songsQuery } = SongsQuery();

  const { data, isLoading, isFetching, refetch } = songsQuery;

  useEffect(() => {
    if (updateLyricsQuery.isSuccess || updateChordsQuery.isSuccess || updateMediaQuery.isSuccess) {
      refetch();
    }
  }, [updateLyricsQuery.isSuccess, updateChordsQuery.isSuccess, updateMediaQuery.isSuccess]);

  useEffect(() => {
    data && data?.length > 0 && !isFetching && setSongList(data);
  }, [data, isFetching]);

  useEffect(() => {
    if (songList && songList?.length > 0) {
      handleTags();
      handleAlbums();
      handleArtists();
    }
  }, [songList]);

  useEffect(() => {
    setOpen(false);
    if (searchText) {
      handleSearch();
    } else {
      setSongList(songs);
    }
  }, [searchText]);

  const handleSearch = () => {
    const search_result = data.filter((song) => {
      const text = searchText?.toLowerCase();
      const title = song?.title?.toLowerCase();
      const artist = song?.artist?.toLowerCase();
      const album = song?.album?.toLowerCase();
      const lyrics_verse = song?.lyrics?.verse?.toLowerCase();
      const lyrics_pre_chorus = song?.lyrics?.pre_chorus?.toLowerCase();
      const lyrics_chorus = song?.lyrics?.chorus?.toLowerCase();
      const tags = song?.tags?.join(",")?.toLowerCase();

      return (
        title?.includes(text) ||
        artist?.includes(text) ||
        album?.includes(text) ||
        lyrics_verse?.includes(text) ||
        lyrics_pre_chorus?.includes(text) ||
        lyrics_chorus?.includes(text) ||
        tags?.includes(text)
      );
    });

    setSongList(search_result);
  };

  const handleAlbums = () => {
    const albums_arr = [];
    data?.forEach((song) => {
      const idx = albums_arr.findIndex((a) => a?.trim() === song?.album?.trim());
      if (idx === -1 && song?.album) {
        albums_arr.push(song?.album?.trim());
      }
    });
    setAlbums(albums_arr);
  };

  const handleArtists = () => {
    const artists_arr = [];
    data?.forEach((song) => {
      const idx = artists_arr.findIndex((a) => a?.trim() === song?.artist?.trim());
      if (idx === -1 && song?.artist) {
        artists_arr.push(song?.artist?.trim());
      }
    });
    setArtists(artists_arr);
  };

  const handleTags = () => {
    const tags = [];

    data?.forEach((song) => {
      song?.tags?.forEach((tag) => {
        const idx = tags.findIndex((t) => t === tag);
        if (idx === -1) {
          tags.push(tag);
        }

        return null;
      });
    });
    setTags(tags);
  };

  const handleAddSearchText = useCallback((text) => {
    setSearchText(text);
  }, []);

  const handleOpen = useCallback((status) => {
    setOpen(status);
  }, []);

  return (
    <div className="laptop:mx-[-.75rem] desktop:mx-[-.75rem]">
      {/* <Fetching close={!songsQuery.isFetching} label="Songs Library" /> */}
      <Suspense fallback={<></>}>
        <SongSearch
          open={memoizedOpen}
          setOpen={handleOpen}
          artists={memoizedArtists}
          albums={memoizedAlbums}
          setSearchText={setSearchText}
          searchText={searchText}
          tags={tags}
        />
      </Suspense>
      <div className="max-w-[680px] mx-auto box-border">
        {searchText && <small className="px-4">Total songs: {songList.length}</small>}
        <SongList
          songs={songList}
          updateLyricsQuery={updateLyricsQuery}
          updateChordsQuery={updateChordsQuery}
          updateMediaQuery={updateMediaQuery}
        />
      </div>
    </div>
  );
};

export default SongsMain;

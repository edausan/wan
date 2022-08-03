/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectSongs } from '../../../redux/slices/songsSlice';
import SongList from './SongList';

// const SongList = React.lazy(() => import('./SongList'));
const SongSearch = React.lazy(() => import('./SongSearch'));

const SongsMain = () => {
  const { songs } = useSelector(selectSongs);
  const [searchText, setSearchText] = useState(null);
  const [songList, setSongList] = useState([]);
  const [tags, setTags] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [open, setOpen] = useState(false);

  const memoizedAlbums = useMemo(() => albums, [albums]);
  const memoizedArtists = useMemo(() => artists, [artists]);
  const memoizedOpen = useMemo(() => open, [open]);

  useEffect(() => {
    songs.length > 0 && setSongList(songs);
    handleTags();
    handleAlbums();
    handleArtists();
  }, [songs]);

  useEffect(() => {
    setOpen(false);
    if (searchText) {
      const search_result = songs.filter((song) => {
        const text = searchText?.toLowerCase();
        const title = song?.title?.toLowerCase();
        const artist = song?.artist?.toLowerCase();
        const album = song?.album?.toLowerCase();
        const lyrics_verse = song?.lyrics?.verse?.toLowerCase();
        const lyrics_pre_chorus = song?.lyrics?.pre_chorus?.toLowerCase();
        const lyrics_chorus = song?.lyrics?.chorus?.toLowerCase();
        const tags = song?.tags?.join(',')?.toLowerCase();

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
    } else {
      setSongList(songs);
    }
  }, [searchText]);

  const handleAlbums = () => {
    const albums_arr = [];
    songs.forEach((song) => {
      const idx = albums_arr.findIndex(
        (a) => a?.trim() === song?.album?.trim()
      );
      if (idx === -1 && song?.album) {
        albums_arr.push(song?.album?.trim());
      }
    });
    setAlbums(albums_arr);
  };

  const handleArtists = () => {
    const artists_arr = [];
    songs.forEach((song) => {
      const idx = artists_arr.findIndex(
        (a) => a?.trim() === song?.artist?.trim()
      );
      if (idx === -1 && song?.artist) {
        artists_arr.push(song?.artist?.trim());
      }
    });
    setArtists(artists_arr);
  };

  const handleTags = () => {
    const tags = [];

    songs.forEach((song) => {
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
    <div>
      <SongSearch
        open={memoizedOpen}
        setOpen={handleOpen}
        artists={memoizedArtists}
        albums={memoizedAlbums}
        setSearchText={handleAddSearchText}
        searchText={searchText}
        tags={tags}
      />
      <div className='mt-[160px] '>
        <SongList songs={songList} />
      </div>
    </div>
  );
};

export default SongsMain;

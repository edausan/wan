/* eslint-disable react-hooks/exhaustive-deps */
import React, {
	useEffect,
	useMemo,
	useState,
	useCallback,
	Suspense,
} from "react";
import {
	GetAlbumCovers,
	GetAllSongs,
	RealtimeSongs,
} from "../../../Firebase/songsApi";
import SongList from "./SongList";
import { useQuery } from "react-query";
import Loading from "../../CustomComponents/Loading";
import Fetching from "../../CustomComponents/Fetching";

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

	const { data, isLoading, isFetching } = useQuery("songs", GetAllSongs, {
		cacheTime: 60 * 60 * 1000,
	});

	const albumCoverQuery = useQuery("album-covers", GetAlbumCovers, {
		cacheTime: 60 * 60 * 1000,
	});

	useEffect(() => {
		data && data?.length > 0 && setSongList(data);
	}, [data, isLoading, isFetching]);

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
			const search_result = songList.filter((song) => {
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
		} else {
			setSongList(songs);
		}
	}, [searchText]);

	const handleAlbums = () => {
		const albums_arr = [];
		songList?.forEach((song) => {
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
		songList?.forEach((song) => {
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

		songList?.forEach((song) => {
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
			<Fetching close={!isFetching} label="Songs Library" />
			<Suspense>
				<SongSearch
					open={memoizedOpen}
					setOpen={handleOpen}
					artists={memoizedArtists}
					albums={memoizedAlbums}
					setSearchText={handleAddSearchText}
					searchText={searchText}
					tags={tags}
				/>
			</Suspense>
			<div className="max-w-[680px] mx-auto box-border">
				<SongList songs={songList} />
			</div>
		</div>
	);
};

export default SongsMain;

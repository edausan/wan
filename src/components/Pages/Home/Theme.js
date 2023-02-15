/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect, useState } from "react";
import { Card, CardContent, Chip, Skeleton } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectThemes } from "../../../redux/slices/postsSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMediaQuery } from "@mui/material";

const initialState = {
	photoURL: null,
	title: null,
	verse: null,
	body: null,
	link: null,
	tags: [],
	id: null,
};

const Theme = ({ theme, isRow }) => {
	const desktop = useMediaQuery("(min-width:640px)");
	const themes = useSelector(selectThemes);
	const params = useParams();
	const [open, setOpen] = useState(false);
	const [currentTheme, setCurrentTheme] = useState(initialState);
	const { photoURL, title, verse, body, link, tags, id } = currentTheme;

	useEffect(() => {
		theme?.id && setCurrentTheme(theme);
	}, [theme]);

	useEffect(() => {
		if (params?.id) {
			setCurrentTheme(
				themes?.filter((theme) => theme.id === params?.id)[0] || initialState
			);
			setOpen(true);
		}
	}, [params]);

	return (
		<Card
			fullWidth
			className={`w-[100%] ${
				params?.id ? "" : "phone:max-h-[400px]"
			} desktop:min-w-[650px] shadow-md laptop:min-w-[650px] phone:min-w-auto box-border flex flex-col ${
				isRow
					? "phone:min-w-[220px] desktop:min-w-[400px] laptop:min-w-[400px]"
					: ""
			}`}
			elevation={0}>
			<Suspense
				fallback={<Skeleton variant="rectangular" height={300} width="100%" />}>
				<Link to={`/theme/${id || params?.id}`}>
					<LazyLoadImage
						alt={title}
						effect="blur"
						placeholder={<Skeleton variant="rectangular" height={350} />}
						src={photoURL}
						width="100%"
					/>
				</Link>
			</Suspense>

			<CardContent className="pb-2 h-full">
				<Link to={`/theme/${id || params?.id}`}>
					{title ? (
						<p className="text-md mb-2 font-semibold">{title}</p>
					) : (
						<Skeleton variant="text" width={500} />
					)}
				</Link>
				<p className="text-sm">
					<i>
						{verse ? (
							<div
								className={`font-semibold ${
									params?.id ? "" : "phone:truncate flex-wrap"
								}`}>
								{verse}
							</div>
						) : (
							<Skeleton variant="text" width="100%" />
						)}
					</i>

					{!desktop && !params?.id && (
						<Link to={`/theme/${id || params?.id}`}>
							<button className="text-sm text-sky-400 ml-2 phone:ml-0">
								Read more
							</button>
						</Link>
					)}

					{!open && desktop && (
						<button
							onClick={() => setOpen(true)}
							className="text-sm text-sky-400 ml-2 phone:ml-0">
							Read more
						</button>
					)}
				</p>

				{params?.id && <p className="my-2 text-sm">{body}</p>}

				{open && desktop && (
					<p className="my-2 text-sm">
						{body}{" "}
						{open && (
							<button
								onClick={() => setOpen(false)}
								className="text-sm text-sky-400 ml-2">
								Read less
							</button>
						)}
					</p>
				)}
			</CardContent>

			<CardContent className="pb-0">
				<p className={`text-xs mt-4 ${params?.id ? "" : "phone:truncate"}`}>
					Source:{" "}
					<a
						style={{ pointerEvents: "none" }}
						href={link}
						target="_black"
						no-referrerpolicy=""
						className="underline text-sky-400">
						{link?.split("https://")[1]}
					</a>
				</p>

				<div className="flex flex-row items-center justify-start p-2 pt-0 gap-2 self-end mt-4">
					{tags?.map((tag) => {
						return <Chip key={tag} label={tag} size="small" />;
					})}
				</div>
			</CardContent>
			{/* <Divider /> */}
			{/* <CardActions className='justify-center grid grid-cols-3 p-1'>
        <Button
          variant='text'
          color='inherit'
          className='ml-0 text-white/40 col-span-1'
          startIcon={<FavoriteBorder className='w-[16px] h-[16px]' />}
        >
          <span className='!capitalize text-xs'>Love</span>
        </Button>
        <Button
          variant='text'
          color='inherit'
          className='ml-0 text-white/40 col-span-1'
          startIcon={<CommentTwoTone className='w-[16px] h-[16px]' />}
        >
          <span className='!capitalize text-xs'>Comment</span>
        </Button>
      </CardActions> */}
		</Card>
	);
};

export default Theme;

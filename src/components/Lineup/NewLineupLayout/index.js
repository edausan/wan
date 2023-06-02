import { ArrowBack, ArrowForward, SaveAlt } from "@mui/icons-material";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { AddLineup, UpdateLineup } from "../../../Firebase/songsApi";
import dayjs from "dayjs";
import UserQuery from "../../../api/userQuery";
import { useHistory } from "react-router-dom";
import LoadingScreen from "../../CustomComponents/LoadingScreen";
import Loading from "../../CustomComponents/Loading";
import LineupQuery from "../../../api/lineupQuery";
import { useParams } from "react-router-dom";

const ServiceDate = lazy(() => import("./ServiceDate"));
const LineupSongs = lazy(() => import("./LineupSongs"));
const Review = lazy(() => import("./Review"));

const Steps = [
	{
		step: 0,
		label: "Service & Date",
	},
	{
		step: 1,
		label: "Assign Songs",
	},
	{
		step: 2,
		label: "Review & Save",
	},
];

const NewLineupLayout = ({ edit }) => {
	const history = useHistory();
	const params = useParams();

	const [currentStep, setCurrentStep] = useState({
		step: 0,
		label: "Assign Songs",
	});
	const [service, setService] = useState(null);
	const [songs, setSongs] = useState([]);
	const [date, setDate] = useState(null);
	const [editLineup, setEditLineup] = useState(null);

	// queries
	const { lineupsQuery } = LineupQuery();
	const mutatedNewLineup = useMutation(AddLineup);
	const mutatedLineup = useMutation(UpdateLineup);

	const { currentUser } = UserQuery();

	const dateFormat = "dddd, MMMM DD, YYYY hh:mm A";
	const dateCreated = dayjs().format(dateFormat);

	useEffect(() => {
		console.log({ songs });
	}, [songs]);

	useEffect(() => {
		const id = params?.id;
		if (edit && id) {
			const currentLineup = lineupsQuery.data?.filter(
				(lineup) => lineup.id === id
			)[0];

			if (currentLineup?.id) {
				const { service, date, songs } = currentLineup;
				setEditLineup(currentLineup);
				setService(service);
				setDate(date);
				setSongs(songs.filter((song) => song.title));
			}
		}
	}, [params?.id, edit, lineupsQuery.data]);

	const handleNext = () => {
		if (currentStep.step <= 1) {
			setCurrentStep((prev) => ({ ...prev, step: prev.step + 1 }));
		}
	};

	const handleBack = () => {
		if (currentStep.step >= 1) {
			setCurrentStep((prev) => ({ ...prev, step: prev.step - 1 }));
		}
	};

	const handleDateChange = (e) => {
		setDate(e);
	};

	const handleSave = async () => {
		if (service) {
			const new_lineup = {
				lineup: {
					date_created: dateCreated,
					songs: songs.filter((l) => l.title),
					worship_leader: {
						uid: currentUser.uid,
						photoURL: currentUser?.photoURL,
						displayName: currentUser.displayName,
					},
					date: dayjs(date).format(dateFormat),
					service,
					pinned: false,
				},
			};

			mutatedNewLineup.mutate(new_lineup);
		}
	};

	const handleUpdate = () => {
		const data = {
			id: params.id,
			lineup: {
				service,
				songs,
				date: dayjs(date).format(dateFormat),
				date_updated: dateCreated,
				updated_by: {
					email: currentUser.email,
					uid: currentUser.uid,
					displayName: currentUser.displayName,
					photoURL: currentUser?.photoURL,
				},
			},
		};

		mutatedLineup.mutate(data);
	};

	const getSundayOfCurrentWeek = () => {
		const today = new Date();
		const first = today.getDate() - today.getDay() + 1;
		const last = first + 6;

		const sunday = new Date(today.setDate(last));
		setDate(sunday);
		return sunday;
	};

	useEffect(() => {
		if (
			(mutatedNewLineup.isSuccess &&
				!mutatedNewLineup.isLoading &&
				!mutatedNewLineup.isError) ||
			(mutatedLineup.isSuccess &&
				!mutatedLineup.isLoading &&
				!mutatedLineup.isError)
		) {
			history.push("/lineup");
		}
	}, [
		history,
		mutatedLineup.isError,
		mutatedLineup.isLoading,
		mutatedLineup.isSuccess,
		mutatedNewLineup.isError,
		mutatedNewLineup.isLoading,
		mutatedNewLineup.isSuccess,
	]);

	useEffect(() => {
		getSundayOfCurrentWeek();
	}, []);

	return (
		<section className="flex flex-col items-center justify-between h-[calc(100vh-58px)] w-full max-w-[480px] mx-auto bg-white overflow-hidden">
			<LoadingScreen
				status={mutatedNewLineup.isLoading || mutatedLineup.isLoading}
			/>

			<div className="flex flex-row items-start justify-between px-8 py-4 w-full border-b border-slate-100">
				<Step isCurrent={currentStep.step >= 0} label={Steps[0].label} />
				<Step isCurrent={currentStep.step >= 1} label={Steps[1].label} />
				<Step
					isCurrent={currentStep.step >= 2}
					label={`Review & ${edit ? "Update" : "Save"}`}
				/>
			</div>

			{currentStep.step === 0 && (
				<Suspense fallback={<Loading />}>
					<ServiceDate
						date={date}
						handleDateChange={handleDateChange}
						service={service}
						setService={setService}
					/>
				</Suspense>
			)}

			{currentStep.step === 1 && (
				<Suspense fallback={<Loading />}>
					<LineupSongs songs={songs} setSongs={setSongs} />
				</Suspense>
			)}

			{currentStep.step === 2 && (
				<Suspense fallback={<Loading />}>
					<Review
						service={service}
						date={date}
						songs={songs}
						currentStep={currentStep.step}
						edit={edit}
						editLineup={editLineup}
					/>
				</Suspense>
			)}

			<div className="flex flex-row items-end justify-between w-full p-8 py-4 border-t border-slate-100">
				<ActionButton
					disabled={currentStep.step === 0}
					handleStep={handleBack}
					icon={<ArrowBack className="text-md" />}
					iconPosition="left"
					label="Back"
					hidden={currentStep.step === 0}
				/>
				<ActionButton
					disabled={
						(currentStep.step === 1 && songs.length <= 0) || !service || !date
					}
					handleStep={
						currentStep.step >= 2
							? edit
								? handleUpdate
								: handleSave
							: handleNext
					}
					icon={
						currentStep.step >= 2 ? (
							<SaveAlt className="text-md" />
						) : (
							<ArrowForward className="text-md" />
						)
					}
					iconPosition="right"
					label={
						currentStep.step >= 2
							? edit
								? "Update Lineup"
								: "Save Lineup"
							: edit && currentStep.step >= 1
							? "Review & Update"
							: Steps[currentStep.step + 1].label
					}
				/>
			</div>
		</section>
	);
};

const Step = ({ isCurrent, label }) => {
	return (
		<div className="relative w-[30%] flex flex-col gap-2 text-center">
			<small className={` ${isCurrent ? "text-sky-500" : "text-slate-400"}`}>
				{label}
			</small>
			<div
				className={`relative h-[10px] rounded-lg overflow-hidden ${
					isCurrent ? "bg-slate-300" : "bg-slate-300"
				}`}>
				<span
					className={`h-full w-full absolute top-0 left-0 transition-all duration-300 ${
						isCurrent ? "translate-x-0" : "translate-x-[-100%]"
					} bg-sky-500`}></span>
			</div>
		</div>
	);
};

const Position = {
	left: "left",
	right: "right",
};

const ActionButton = ({
	disabled,
	handleStep,
	icon,
	label,
	iconPosition = Position,
	hidden,
}) => {
	return (
		<button
			disabled={disabled}
			onClick={handleStep}
			className={`flex flex-row items-center justify-center gap-2 px-4 py-2 text-md rounded-full  disabled:bg-white disabled:text-slate-300 ${
				label === "Back"
					? "bg-slate-100/30 text-slate-500"
					: "bg-green-600 text-white"
			}  `}>
			{!hidden && (
				<span>
					{iconPosition === "left" && icon} {label}{" "}
					{iconPosition === "right" && icon}
				</span>
			)}
		</button>
	);
};

export default NewLineupLayout;

import React, { useEffect, useState } from "react";
import Slideup from "./Animations/Slideup";
import LoadingGif from "../../assets/Loading.gif";

const Fetching = ({ close, label, className = "" }) => {
	const [hide, setHide] = useState(false);

	useEffect(() => {
		let timeout;
		if (close) {
			timeout = setTimeout(() => {
				setHide(true);
			}, 100);
		} else {
			setHide(false);
		}

		return () => clearTimeout(timeout);
	}, [close]);

	return (
		!hide && (
			<Slideup close={close}>
				<div
					className={`fixed bottom-[100px] left-[50%] translate-x-[-50%] z-10 bg-white rounded-full shadow-xl ${className}`}>
					<div className="flex flex-row w-auto gap-2 items-center justify-center px-6 pl-3 whitespace-nowrap">
						<div className="w-[50px] h-[50px] flex items-center">
							<img src={LoadingGif} alt="" className="w-full " />
						</div>
						<div className="animate-pulse">Fetching {label || "Data"}</div>
					</div>
				</div>
			</Slideup>
		)
	);
};

export default Fetching;

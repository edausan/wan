import { Divider, Modal } from "@mui/material";
import React from "react";
import TextArea from "../../CustomComponents/TextArea";

const VerseModal = ({ verse, showVerse, setShowVerse }) => {
	return (
		<Modal open={showVerse} onClose={() => setShowVerse(false)}>
			<div className="flex flex-col items-end justify-center bg-white w-[90%] p-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md">
				<TextArea
					value={verse}
					className="w-full text-black max-h-[70vh] overflow-auto"
					styles={{ textAlign: "left" }}
					color="#000"
				/>
				<Divider className="mt-4 mb-4 flex-1 w-full" />
				<button onClick={() => setShowVerse(false)}>Close</button>
			</div>
		</Modal>
	);
};

export default VerseModal;

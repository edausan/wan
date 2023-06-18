import { Lyrics, NoteAdd, NoteAddRounded, YouTube } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import React from "react";

const AddDetails = ({ song, setDrawer }) => {
  const withMedia = song?.media?.youtube;

  const noLyrics =
    !song?.lyrics?.verse &&
    !song?.lyrics?.pre_chorus &&
    !song?.lyrics?.chorus &&
    !song?.lyrics?.bridge;

  const noChords =
    !song?.chords?.verse &&
    !song?.chords?.pre_chorus &&
    !song?.chords?.chorus &&
    !song?.chords?.bridge;

  return (
    <section
      id="add-details"
      className={`p-4 flex flex-row max-w-[100%] overflow-x-auto gap-2 ${
        withMedia ? "mt-16" : "mt-6"
      }`}
    >
      <Button
        onClick={() => setDrawer("lyrics")}
        label={`${!noLyrics ? "Update" : "Add"} Lyrics`}
        gradient={{
          from: "from-cyan-400",
          to: "to-sky-500",
        }}
      />

      <Button
        onClick={() => setDrawer("chords")}
        label={`${!noChords ? "Update" : "Add"} Chords`}
        gradient={{
          from: "from-orange-400",
          to: "to-yellow-500",
        }}
      />

      {!song?.media?.youtube && <Button label="Add Media" onClick={() => setDrawer("media")} />}
    </section>
  );
};

export const Button = ({
  onClick,
  label = "",
  gradient = { from: "from-pink-400", to: "to-rose-400" },
  icon = <Add />,
  className = "",
}) => {
  return (
    <span
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`flex flex-row items-center justify-start gap-2 p-2 cursor-pointer rounded-full bg-gradient-to-r ${gradient.from} ${gradient.to} text-white shadow-sm hover:shadow-lg transition-all duration-200 text-sm min-w-fit ${className}`}
    >
      <span className="bg-white/30 rounded-full">{icon}</span> <span>{label}</span>
    </span>
  );
};

export default AddDetails;

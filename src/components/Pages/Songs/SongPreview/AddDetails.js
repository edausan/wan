import { Lyrics, NoteAdd, NoteAddRounded, YouTube } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import React from "react";

const AddDetails = ({ song }) => {
  const handleColor = ({ color, isFrom }) => {
    return isFrom ? `from-${color}-400` : `to-${color}-400`;
  };

  console.log({ add_details: song });

  const withMedia = song?.media?.youtube;

  return (
    <section
      id="add-details"
      className={`p-4 flex flex-row max-w-[100%] overflow-x-auto gap-2 ${withMedia ? "mt-16" : ""}`}
    >
      {!song?.lyrics?.verse &&
        !song?.lyrics?.pre_chorus &&
        !song?.lyrics?.chorus &&
        !song?.lyrics?.bridge && (
          <Button
            icon={<NoteAdd />}
            label="Add Lyrics"
            gradient={{
              from: handleColor({ color: "cyan", isFrom: true }),
              to: handleColor({ color: "sky", isFrom: false }),
            }}
          />
        )}

      {!song?.chords?.verse &&
        !song?.chords?.pre_chorus &&
        !song?.chords?.chorus &&
        !song?.chords?.bridge && (
          <Button
            icon={<Lyrics />}
            label="Add Chords"
            gradient={{
              from: handleColor({ color: "orange", isFrom: true }),
              to: handleColor({ color: "yellow", isFrom: false }),
            }}
          />
        )}

      {!song?.media?.youtube && <Button icon={<YouTube />} label="Add Media" />}
    </section>
  );
};

const Button = ({
  onClick,
  label = "",
  gradient = { from: "from-pink-400", to: "to-rose-400" },
  icon = <Add />,
}) => {
  return (
    <span
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`flex flex-row items-center justify-center gap-2 p-4 py-2 cursor-pointer rounded-full bg-gradient-to-r ${gradient.from} ${gradient.to} text-white shadow-sm hover:shadow-lg transition-all duration-200 text-sm min-w-fit`}
    >
      {icon} <span>{label}</span>
    </span>
  );
};

export default AddDetails;

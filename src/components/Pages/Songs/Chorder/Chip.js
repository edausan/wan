import { useState } from "react";
import Slideup from "@/CustomComponents/Animations/Slideup";

const Chip = ({
  value,
  callback,
  isVariant,
  selected,
  chordRuns,
  family,
  isChordRun,
  handleDeleteChord,
  index,
  setReplaceIndex,
  replaceIndex,
  type,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const selectedChord = chordRuns?.findIndex((c) => c === value) >= 0;

  const handleType = (type, val) => {
    switch (type) {
      case "maj":
        return `bg-blue-${val}`;
      case "min":
        return `bg-blue-${val}`;
      case "overs":
        return `bg-blue-${val}`;
      case "others":
        return `bg-blue-${val}`;

      default:
        break;
    }
  };

  const selected_chord = selectedChord ? ` bg-blue-600 text-white` : " bg-slate-200 text-black";

  const is_variant = isVariant && !selectedChord ? ` ${handleType(type, 100)} text-black` : "";

  const isDim =
    family?.findIndex((f) => f.split("dim")[0].split("m")[0] === value?.root) >= 0 &&
    " !bg-blue-600 !text-white";

  const replace_border =
    replaceIndex === index && isChordRun && ` !border-orange-500 !bg-orange-400 `;

  const handleDelete = () => {
    handleDeleteChord(index);
    setShowMenu(false);
  };

  const value_root = value?.root === selected?.root;

  return (
    <div
      tabIndex={0}
      role="button"
      className={`flex flex-row items-center justify-center py-1 px-2 min-w-[36px] h-[36px] text-sm rounded-full cursor-pointer transition-all duration-100 border-2 ${
        value?.root ? "w-[36px]" : ""
      } ${value_root ? "!bg-orange-600 !text-white" : ""}  ${isDim || ""} ${is_variant || ""} ${
        replace_border || ""
      } ${selected_chord || ""} ${isChordRun ? "!bg-slate-200 !text-black !border-0" : ""}`}
      onClick={
        isChordRun
          ? !showMenu
            ? () => setShowMenu(true)
            : () => {}
          : () => {
              !isVariant
                ? selected?.root === value?.root
                  ? callback(null)
                  : callback(value)
                : callback(value);
            }
      }
    >
      <div className="text-center text-sm">{value?.root || value} </div>
      {/* {isChordRun && (
        <button className=" ml-2 w-[14px] h-[14px] flex items-center justify-center rounded-full hover:bg-slate-200">
          <button onClick={() => setShowMenu((prev) => !prev)}>
            <MoreVert className="text-[10px]" />
          </button>

          
        </button>
      )} */}

      {showMenu && (
        <ChordMenu
          handleDelete={handleDelete}
          showMenu={setShowMenu}
          chord={value}
          handleReplace={() => setReplaceIndex(index)}
        />
      )}
    </div>
  );
};

const ChordMenu = ({ handleDelete, showMenu, chord, handleReplace }) => {
  return (
    // <Slideup>
    <div
      tabIndex={0}
      role="button"
      onClick={() => showMenu(false)}
      className="flex items-center justify-center absolute top-0 left-0 bg-black/30 w-full h-full"
    >
      <Slideup>
        <div className="p-2 rounded-sm min-w-[160px] max-w-[200px] text-start bg-white shadow-lg">
          <button
            className="text-xs p-1 hover:bg-slate-200 text-start w-full"
            onClick={handleDelete}
          >
            Delete <span className="font-bold">{chord}</span>
          </button>
          <button
            className="text-xs p-1 hover:bg-slate-200 text-start w-full"
            onClick={handleReplace}
          >
            Replace <span className="font-bold">{chord}</span>
          </button>
          <button className="text-xs p-1 hover:bg-slate-200 text-start w-full">
            Add chord before <span className="font-bold">{chord}</span>
          </button>
          <button className="text-xs p-1 hover:bg-slate-200 text-start w-full">
            Add chord after <span className="font-bold">{chord}</span>
          </button>
        </div>
      </Slideup>
    </div>
    // </Slideup>
  );
};

export default Chip;

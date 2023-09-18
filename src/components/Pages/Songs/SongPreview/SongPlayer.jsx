import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
const SongPlayer = ({ song, setHideMedia }) => {
  return (
    <section className="bg-black pb-12 laptop:w-[75%] phone:w-[85%] rounded-xl overflow-hidden z-10 absolute bottom-0 left-[50%] translate-x-[-50%] phone:translate-y-[65%] laptop:translate-y-[76%] shadow-2xl flex flex-row items-center justify-between max-w-[680px]">
      <div className="absolute w-full p-2 flex items-center justify-center bottom-0 left-0 z-10 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-[2px]">
        <span>
          <IconButton
            onClick={() => setHideMedia(true)}
            className="text-white flex gap-2 items-center rounded-none"
          >
            <VisibilityOffIcon />
            <span className="text-sm">Hide Media</span>
          </IconButton>
        </span>
      </div>
      <Media media={song?.media?.youtube} />
    </section>
  );
};

export const Media = ({
  media,
  width = "w-[100%]",
  phoneHeight = "phone:h-[150px]",
  laptopHeight = "laptop:h-[220px]",
}) => {
  return (
    <iframe
      className={`${width} ${phoneHeight} ${laptopHeight}`}
      title="spotify"
      src={media}
      frameborder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  );
};

export default SongPlayer;

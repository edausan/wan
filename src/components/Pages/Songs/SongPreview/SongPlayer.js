const SongPlayer = ({ song }) => {
  return (
    <section className="bg-white laptop:w-[75%] phone:w-[85%] rounded-xl overflow-hidden z-10 absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%] shadow-2xl flex flex-row items-center justify-between max-w-[680px]">
      <Media media={song?.media?.youtube} />
    </section>
  );
};

export const Media = ({
  media,
  width = "w-[100%]",
  phoneHeight = "phone:h-[120px]",
  laptopHeight = "laptop:h-[120px]",
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

const Chord = ({ chord, isNum }) => {
  return chord === ">" ? (
    <div className="basis-[100%] h-1" />
  ) : (
    <span>{!isNum ? chord?.relation : chord?.name}</span>
  );
};

export default Chord;

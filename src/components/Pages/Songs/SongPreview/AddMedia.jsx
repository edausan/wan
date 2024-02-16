import { useState } from "react";
import TopBar from "./TopBar";
import { ButtonGradients } from "./AddDetails";
import { Media } from "./SongPlayer";
import { useParams } from "react-router-dom";
import LoadingScreen from "@components/CustomComponents/LoadingScreen";
import { SwipeableDrawer, TextField } from "@mui/material";

const AddMedia = ({ song, open, onClick, updateMediaQuery }) => {
  const params = useParams();
  const [media, setMedia] = useState(song?.media?.youtube);

  const { isLoading, mutate } = updateMediaQuery;

  const handleSave = () => {
    mutate({
      id: params.id,
      media: {
        youtube: media,
      },
    });
  };

  const handleChange = (e) => {
    const youtubeId = e.target.value.split(".be/");
    if (youtubeId[1]) {
      const embedLink = `https://www.youtube.com/embed/${youtubeId[1]}`;
      setMedia(embedLink);
    }
  };

  return (
    <SwipeableDrawer
      onOpen={() => {}}
      onClose={() => {}}
      open={open || false}
      anchor="right"
      className="z-[1004] w-[100%]"
    >
      <LoadingScreen status={isLoading} text="Saving Media" />
      <section className="w-[100vw] bg-white">
        <TopBar
          label="Media"
          onClick={onClick}
          song={song}
          isUpdate={song?.media?.youtube}
          handleSave={handleSave}
          gradient={{ ...ButtonGradients.Media }}
        />

        {media && (
          <Media media={media} phoneHeight="phone:h-[250px]" laptopHeight="laptop:h-[250px]" />
        )}
        <div className="p-4">
          <TextField label="Paste Youtube Link" onChange={handleChange} fullWidth />
        </div>
      </section>
    </SwipeableDrawer>
  );
};

export default AddMedia;

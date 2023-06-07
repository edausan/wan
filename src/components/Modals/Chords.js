import { TextField, Typography, Card, CardActions, Button, Snackbar, Alert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UpdateChords } from "@/Firebase/songsApi";

const Chords = ({ setCardData, cardData, category, setOpen }) => {
  const [chords, setChords] = useState({
    verse: null,
    pre_chorus: null,
    chorus: null,
  });

  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (cardData.chords?.verse) {
      setChords(cardData.chords);
    }
  }, []);

  useEffect(() => {
    setCardData((data) => ({ ...data, chords }));
  }, [chords]);

  const handleSaveChords = async () => {
    try {
      setUpdating(true);
      const res = await UpdateChords({ id: cardData.id, chords });
      setUpdating(false);
      setUpdated(true);

      setTimeout(() => {
        setUpdated(false);
      }, 1000);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Snackbar
        open={updated}
        autoHideDuration={1000}
        // onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Chords Successfully Updated!
        </Alert>
      </Snackbar>
      <Card
        sx={{
          width: "90%",
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
          pb: 0,
          boxSizing: "border-box",
          // minHeight: 500,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {cardData.title || category.label} <small>| Chords</small>
        </Typography>

        <TextField
          label="Verse"
          fullWidth
          variant="standard"
          multiline
          value={chords.verse}
          onChange={(e) => setChords({ ...chords, verse: e.target.value })}
          sx={{ mb: 2 }}
          disabled={updating}
        />
        <TextField
          label="Pre-chorus"
          fullWidth
          variant="standard"
          multiline
          value={chords.pre_chorus}
          sx={{ mb: 2 }}
          onChange={(e) => setChords({ ...chords, pre_chorus: e.target.value })}
          disabled={updating}
        />
        <TextField
          label="Chorus"
          fullWidth
          variant="standard"
          multiline
          value={chords.chorus}
          onChange={(e) => setChords({ ...chords, chorus: e.target.value })}
          disabled={updating}
        />
        <CardActions
          className="mt-2 px-0 pb-4 justify-end"
          // sx={{ justifyContent: 'right', mt: 2 }}
        >
          {cardData.id && !cardData.is_new ? (
            <button
              className="py-1 px-3 bg-green-600 text-white rounded-md"
              onClick={handleSaveChords}
              disabled={updating}
            >
              Save Chords
            </button>
          ) : (
            <Button
              size="small"
              onClick={() => setOpen({ id: null, status: false, song_title: null })}
            >
              Done
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Chords;

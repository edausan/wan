import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";

const filter = createFilterOptions();

const AutocompleteSong = ({ songs, category, handleUpdateCard }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    value?.title && handleUpdateCard(value);
  }, [value]);

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setValue({
              title: newValue,
              artist: null,
              album: null,
              lyrics: null,
              chords: null,
              media: null,
              id: null,
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              title: newValue.inputValue,
              artist: null,
              album: null,
              lyrics: null,
              chords: null,
              media: null,
              id: null,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.title);
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={songs}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        // sx={{ width: 300 }}
        freeSolo
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label={category.label} fullWidth variant="standard" />
        )}
      />
    </div>
  );
};

export default React.memo(AutocompleteSong);

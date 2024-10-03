import React from 'react';
import { Autocomplete, TextField, Chip } from '@mui/material';

const BreedSelector = ({ breeds, setSelectedBreeds }) => {
  const handleBreedChange = (event, newValue) => {
    setSelectedBreeds(newValue);
  };

  return (
    <Autocomplete
      multiple
      id="breed-selector"
      options={breeds}
      onChange={handleBreedChange}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Search and Select Dog Breeds"
          placeholder="Type to search..."
        />
      )}
    />
  );
};

export default BreedSelector;

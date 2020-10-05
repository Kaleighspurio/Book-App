import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

export default function Search({
  handleSearchInputChange,
  handleSearch,
  clearResults,
  alertActive,
  alertMessage
}) {
  return (
    <form noValidate autoComplete="off">
      { alertActive ? <Alert severity="error">{alertMessage}</Alert> : null}
      <TextField
        id="outlined-basic"
        name="keyword"
        label="Keyword"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        size="small"
        onChange={handleSearchInputChange}
      />
      <TextField
        id="outlined-basic"
        name="author"
        label="Author"
        variant="outlined"
        fullWidth={true}
        margin="normal"
        size="small"
        onChange={handleSearchInputChange}
      />
      <Button
        type="submit"
        color="primary"
        fullWidth={true}
        variant="contained"
        onClick={handleSearch}
        onKeyDown={(event) => {
          event.preventDefault();
          if (event.keycode === 13) {
            handleSearch();
          }
        }}
      >
        Search
      </Button>
      <Button
        color="default"
        fullWidth={true}
        variant="contained"
        onClick={clearResults}
      >
        Clear Search Results
      </Button>
    </form>
  );
}

import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import '../../pages/Home/Home.css';

export default function Search({
  handleSearchInputChange,
  handleSearch,
  clearResults,
  alertActive,
  alertMessage,
}) {
  return (
    <form noValidate autoComplete="off">
      {alertActive ? <Alert severity="error">{alertMessage}</Alert> : null}
      <TextField
        className="form-input"
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
        className="form-input"
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
        className='main-home-button'
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
        className='clear-button'
        fullWidth={true}
        variant="contained"
        onClick={clearResults}
      >
        Clear Search Results
      </Button>
    </form>
  );
}

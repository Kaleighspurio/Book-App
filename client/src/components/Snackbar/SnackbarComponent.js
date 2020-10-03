import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

// **** Wherever you want to use the snackbar component, the parent must have the following code:

// const [snackbarOpen, setSnackbarOpen] = useState(false);
// const handleFavoriteClick = () => {
//     setSnackbarOpen(true);
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setSnackbarOpen(false);
//   };

// And then must pass the following props:
// * snackbarOpen={snackbarOpen}
// * handleCloseSnackbar={handleCloseSnackbar}
// * message={whatever message you want the snackbar to say}


export default function SnackbarComponent({ message, snackbarOpen, handleCloseSnackbar }) {
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;


  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={5000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical, horizontal }}
      message={message}
      key={vertical + horizontal}
    />
  );
}

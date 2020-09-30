import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';

export default function MyBookAccordion({
  info,
  getBooks,
  readStatus,
  myBooks,
  getFavoriteBooks,
}) {
  const [expanded, setExpanded] = useState(false);
  const { userId } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFavoriteClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const authorArray = [];
  authorArray.push(info.author1);
  if (info.author2) {
    authorArray.push(info.author2);
  }
  if (info.author3) {
    authorArray.push(info.author3);
  }
  if (info.author4) {
    authorArray.push(info.author4);
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addToFavorites = () => {
    // axios put to make favorite true
    axios
      .put(`api/mybooks/${userId}/favorite-book/${info.id}`)
      .then((response) => {
        console.log(response);
        handleFavoriteClick();
      });
  };

  const markAsRead = (readStat) => {
    // axios put to mark as read, or unread depending on current ...
    console.log(readStat);
    if (readStat === false) {
      axios
        .put(`api/mybooks/${userId}/read-book/${info.id}`)
        .then((response) => {
          console.log(response);
          getBooks();
        });
    } else {
      axios
        .put(`api/mybooks/${userId}/unread-book/${info.id}`)
        .then((response) => {
          console.log(response);
          getBooks();
        });
    }
  };

  const removeFromFavorites = () => {
    axios
      .put(`api/mybooks/${userId}/favorite-book/${info.id}/remove`)
      .then((response) => {
        console.log(response);
        getFavoriteBooks();
      });
  };

  const triggerRemoveModal = () => {
    setOpen(true);
  };

  const removeFromMyBooks = () => {
    handleClose();
    axios.delete(`api/mybooks/${userId}/book/${info.id}`).then((response) => {
      console.log(response);
      getBooks();
    });
  };

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <Avatar alt={info.title} src={info.image} />
            </Grid>
            <Grid item xs={5}>
              <Typography>
                {info.title}
                <br />
                <Typography variant="caption">{info.subtitle}</Typography>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Author(s): {authorArray.join(', ')}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <img src={info.image} />
              {myBooks === true ? (
                <Tooltip title="Add to Favorite">
                  <IconButton
                    aria-label="add to favorites"
                    onClick={addToFavorites}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Remove from Favorite">
                  <IconButton
                    aria-label="remove from favorites"
                    onClick={removeFromFavorites}
                  >
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              )}
              {myBooks === true && readStatus === false ? (
                <Tooltip title="Mark as Read">
                  <IconButton
                    aria-label="mark as read"
                    onClick={() => markAsRead(readStatus)}
                  >
                    <BookRoundedIcon />
                  </IconButton>
                </Tooltip>
              ) : myBooks === true ? (
                <Tooltip title="Mark as Unread">
                  <IconButton
                    aria-label="mark as Unread"
                    onClick={() => markAsRead(readStatus)}
                  >
                    <BookRoundedIcon color="disabled" />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Grid>
            <Grid item xs={6}>
              <Typography>{info.description}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Category: {info.categories}</Typography>
              <Typography>Publisher: {info.publisher}</Typography>
              <Typography>Publish Date: {info.publish_date}</Typography>
              <Typography>Pages: {info.page_count}</Typography>
              <Typography>Average Rating: {info.average_rating}</Typography>
              <Typography>ISBN: {info.isbn}</Typography>
              {myBooks === true ? (
                <Tooltip title="Remove from My Books">
                  <IconButton
                    aria-label="remove from my books"
                    onClick={triggerRemoveModal}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Grid>
          </Grid>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical, horizontal }}
            message={`${info.title} has been added to your Favorites!`}
            key={vertical + horizontal}
          />
        </AccordionDetails>
      </Accordion>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Remove ${info.title} from My Books?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to remove {info.title} from your saved books. Are you
            sure that is what you want to do?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={removeFromMyBooks} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { useContext } from 'react';
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

export default function MyBookAccordion({ info, getBooks, readStatus }) {
  const [expanded, setExpanded] = React.useState(false);
  const { userId } = useContext(AuthContext);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addToFavorites = () => {
    // axios put to make favorite true
    axios.put(`api/mybooks/${userId}/favorite-book/${info.id}`).then((response) => {
        console.log(response);
    });
  };

  const markAsRead = (readStat) => {
    // axios put to mark as read, or unread depending on current ...
    console.log(readStat)
    if (readStat === false) {
       axios.put(`api/mybooks/${userId}/read-book/${info.id}`).then((response) => {
        console.log(response)
        getBooks()
    }) 
    } else {
        axios.put(`api/mybooks/${userId}/unread-book/${info.id}`).then((response) => {
            console.log(response)
            getBooks()
        });
    }
    
  };

  const markAsUnRead = () => {
    // axios put to mark as read, or unread depending on current ...
    axios.put(`api/mybooks/${userId}/unread-book/${info.id}`).then((response) => {
        console.log(response)
        getBooks()
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
          <Typography>{info.title}</Typography>
          <Typography>Author(s): </Typography>
          <Typography>{info.author1}</Typography>
          {info.author2 ? <Typography>, {info.author2}</Typography> : null}
          {info.author3 ? <Typography>, {info.author3}</Typography> : null}
          {info.author4 ? <Typography>, {info.author4}</Typography> : null}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <img src={info.image} />
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
              <IconButton aria-label="add to favorites">
                <FavoriteIcon onClick={addToFavorites} />
              </IconButton>
              <IconButton aria-label="mark as read" onClick={() => markAsRead(readStatus)} >
             <BookRoundedIcon  />
                <Typography>{readStatus === false ? 'Mark as Read' : "Mark as Unread" }</Typography>
              </IconButton>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

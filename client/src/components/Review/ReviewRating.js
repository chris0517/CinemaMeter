import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import {Grid, FormControl, RadioGroup, Radio, FormControlLabel, FormLabel, Button, InputLabel} from '@mui/material';

const ReviewRating = (props) => {

  //states declarations
  //constants and functions declarations
  const handleRatingChange = (event) => {
    props.setRating(event.target.value)
    props.setSubmit(false)
  }

  return (
    <>
     {/* 1f Ratings*/}
      <Grid item xs>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Movie Rating</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              row="horizontal"
              onChange={handleRatingChange}
            >
            <FormControlLabel labelPlacement="top" value="1" control={<Radio />} label="1" />
            <FormControlLabel labelPlacement="top" value="2" control={<Radio />} label="2" />
            <FormControlLabel labelPlacement="top" value="3" control={<Radio />} label="3" />
            <FormControlLabel labelPlacement="top" value="4" control={<Radio />} label="4" />
            <FormControlLabel labelPlacement="top" value="5" control={<Radio />} label="5" />
          </RadioGroup>
        </FormControl>
      </Grid>
    {/* JSX block */}


    </>
  );
}

export default ReviewRating;
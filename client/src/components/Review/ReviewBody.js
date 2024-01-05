import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import {Box,Typography, Grid, TextField, FormControlLabel} from '@mui/material';

const ReviewBody = (props) => {

  //states declarations
  //constants and functions declarations
  const handleTextChange = (event) => {
    props.setReview(event.target.value);
    props.setSubmit(false);
  };

  return (
    <>
     {/* 1e Enter Review*/}
      <Box
        component="form"
        sx={{'& .MuiTextField-root': { m: 3, width: '50ch' },}}
      > 
        <Grid item xs>
          <TextField
            id="outlined-textarea"
            label="Enter Review"
            placeholder="Enter Review"
            rows={4}
            width={10}
            multiline
            inputProps={
              {maxLength: 200}
            }
            value={props.review}
            onChange={handleTextChange}/>
            <Typography
            align="right"
            color="#E9897E"
            >Characters Remaining: {200 - props.ReviewBody.length} / 200</Typography>

        </Grid>
      </Box>
    {/* JSX block */}


    </>
  );
}

export default ReviewBody;

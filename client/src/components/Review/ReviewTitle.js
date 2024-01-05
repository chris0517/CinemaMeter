import * as React from 'react';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import {Box, Grid, TextField} from '@mui/material';

const ReviewTitle = (props) => {

  //states declarations
  //constants and functions declarations
  const handleTitleChange = (event) => {
    props.setReviewTitle(event.target.value);
    props.setSubmit(false)
  };

  return (
    <>
      {/* 1d Enter Review Title */}
      <Box        
          component="form"
          sx={{'& .MuiTextField-root': {m: 3, width: '50ch' },}}
          >
        <Grid item xs>
 
            <TextField 
            id="standard-basic" 
            label="Enter Review Title" 
            variant="standard" 
            onChange={handleTitleChange}/>
          

        </Grid>
        </Box>
    {/* JSX block */}


    </>
  );
}

export default ReviewTitle;
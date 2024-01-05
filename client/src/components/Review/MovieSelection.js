import * as React from 'react';
import {Grid, Select, MenuItem, FormControl, InputLabel} from '@mui/material';

const MovieSelection = (props) => {

  //states declarations
  //constants and functions declarations
  const handleSelectChange = (event) => {
    props.setSelectedMovie(event.target.value);
    props.setSubmit(false)
    
  };

  return (
    <>
        {/* 1c Select Movie*/}
        <Grid item xs>
          <FormControl variant="standard" sx={{ minWidth: 150 }}>
            <InputLabel id="label">Select a Movie</InputLabel>

            <Select
              id="label"
              value={props.selectedMovie}
              label="Movie"
              onChange={handleSelectChange}
            >
            {props.movieNames.map((movie) => {
              return(
                <MenuItem
                  key={movie.id}
                  value={movie.name}>
                  {movie.name}
                </MenuItem>
              );
              })}
              
            </Select>  
          </FormControl>
        </Grid>


    {/* JSX block */}

    </>
  );
}

export default MovieSelection;
import * as React from 'react';
import {Box, Grid, TextField, Typography, Button} from '@mui/material';
import NavBar from '../Navigation';

const serverURL = "";

const Search = () => {

  const [movies, setMovies] = React.useState([]);
  const [searchMovie, setSearchMovie] = React.useState("");
  const [searchMovieID, setSearchMovieID] = React.useState(0);

  const [searchActor, setSearchActor] = React.useState("");
  const [searchDirector, setSearchDirector] = React.useState("");
  const [actorName, setActorName] = React.useState(["", ""]);
  const [dirName, setDirName] = React.useState(["", ""]);

  const [showData, setShowData] = React.useState(false);
  const [result, setResult] = React.useState([]);

  // load movies
  React.useEffect(() => {
    loadMovies();
  }, []);

  
  const loadMovies = () => {
    callApiMovies()
      .then(res => {
        console.log("callApiMovies returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("callApiMovies parsed: ", parsed);
        setMovies(parsed);
      })
  }

  const callApiMovies = async () => {
    const url = serverURL + "/api/getMovies";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  };

  // update searchMovieID
  React.useEffect(() => {
    movies.map((currentMovie) => {
      if(currentMovie.name === searchMovie){
        setSearchMovieID(currentMovie.id);
      }
    })
  }, [searchMovie]);

  React.useEffect(() => {
    setActorName(searchActor.split(" "));
  }, [searchActor]);

  React.useEffect(() => {
    setDirName(searchDirector.split(" "));
  }, [searchDirector]);

  // handle search boxes
  const handleSearchMovie = (event) => {
    setShowData(false);
    setSearchMovie(event.target.value);    
  }

  const handleSearchActor = (event) => {
    setShowData(false);

    setSearchActor(event.target.value);
  }

  const handleSearchDirector = (event) => {
    setShowData(false);
    setSearchDirector(event.target.value);
  }
  
  const handleSearchChange = () => {
    if(!searchMovie && !searchActor && !searchDirector){

    }else{
      setShowData(true);
      loadSearch();
    }
  }

  const loadSearch = () => {
    callApiSearch()
      .then(res => {
        console.log("callApiSearch returned: ", res.express)
        var parsed = JSON.parse(res.express);
        console.log("callApiSearch parsed: ", parsed);
        setResult(parsed);
        console.log(result);
      })
  }

  const callApiSearch = async () => {
    const url = serverURL + "/api/loadSearchResult";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({movieID: searchMovieID,
        actorFirst: actorName[0], 
        actorLast: actorName[1], 
        dirFirst: dirName[0], 
        dirLast: dirName[1]})
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Search Result: ", body);
    return body;
  };


  return (
      <div>

      <NavBar/> 

        <Grid       
        container
          direction="column"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            row padding={3}>

            
            <Box
              component="form"
              sx={{'& .MuiTextField-root': { m: 3, width: '50ch' },}}> 
              <Grid item xs>
                <TextField
                  id="outlined-textarea"
                  label="Enter Movie Name"
                  placeholder="Search Movie Name"
                  width={10}
                  multiline
                  value={searchMovie}
                  onChange={handleSearchMovie}
                />
              </Grid>
            </Box>

            <Box
              component="form"
              sx={{'& .MuiTextField-root': { m: 3, width: '50ch' },}}> 
              <Grid item xs>
                <TextField
                  id="outlined-textarea"
                  label="Search Actor First and Last Name"
                  placeholder="Search Actor First and Last Name"
                  width={10}
                  multiline
                  value={searchActor}
                  onChange={handleSearchActor}

                />
              </Grid>
            </Box>

            <Box
              component="form"
              sx={{'& .MuiTextField-root': { m: 3, width: '50ch' },}}> 
              <Grid item xs>
                <TextField
                  id="outlined-textarea"
                  label="Search Director First and Last Name"
                  placeholder="Search Director First and Last Name"
                  width={10}
                  multiline
                  value={searchDirector}
                  onChange={handleSearchDirector}
                />
              </Grid>
            </Box>

            <Button 
              variant="contained"
              align="centered"
              onClick={handleSearchChange}>
              Search
            </Button>  
            
            {showData && (
              <Grid item xs>
                {       
                  result.map((value, index) => (
                    <>
                      <hr/>
                      <Typography variant="subtitle1">Review {index+1}:</Typography>
                      <Typography variant="subtitle1">Movie Name: {value.name}</Typography>
                      <Typography variant="subtitle1">Review Title: {value.reviewTitle}</Typography>
                      <Typography variant="subtitle1">Review Content: {value.reviewContent}</Typography>
                      <Typography variant="subtitle1">Review Score: {value.reviewScore}</Typography>
                      <Typography variant="subtitle1">Average Review Score: {value.average_review_score}</Typography>
                      <Typography variant="subtitle1">Director Name: {value.director_first_name} {value.director_last_name}</Typography>
                    </>
                  ))
                }


              </Grid>
            )}
            
        </Grid>

      </div>

  );
}

export default Search;    
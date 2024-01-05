import * as React from 'react';
import {Grid, Button, FormControl, InputLabel, Select, MenuItem, Typography, TextField} from '@mui/material';
import NavBar from '../Navigation';

const serverURL = "";


const MyPage = () => {

  const [rank, setRank] = React.useState(0);
  const [userID, setUserID] = React.useState("");
  const [result, setResult] = React.useState([]);
  const [showData, setShowData] = React.useState(false);
  const [movies, setMovies] = React.useState([]);

  const [addMovie, setAddMovie] = React.useState("");
  const [addMovieID, setAddMovieID] = React.useState(0);
  const [collection, setCollection] = React.useState([]);
  const [showCollection, setShowCollection] = React.useState(false);
  const [value, setValue] = React.useState(true);
  React.useEffect(() => {
    movies.map((currentMovie) => {
      if(currentMovie.name === addMovie){
        setAddMovieID(currentMovie.id);
      }
    })
  }, [addMovie]);


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


  const loadRank = () => {
    callApiRank()
      .then(res => {
        console.log("callApiSearch returned: ", res.express)
        var parsed = JSON.parse(res.express);
        console.log("callApiSearch parsed: ", parsed);
        setResult(parsed);
        console.log(result);
      })
  }

  const callApiRank = async () => {
    const url = serverURL + "/api/loadMyPageRank";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({number: rank})
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Search Result: ", body);
    return body;
  };


  const callApiaddCollection = async () => {
    const url = serverURL + "/api/addCollection";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      }, 
      body: JSON.stringify({name: addMovie, userID: userID, movieID: addMovieID})
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Successfully Sent");
    setAddMovie("");

    return body;
  };


  const loadCollection = () => {
    callApiLoadCollection()
      .then(res => {
        var parsed = JSON.parse(res.express);
        console.log(parsed);
        setCollection(parsed);
      })
  }

  const callApiLoadCollection = async () => {
    const url = serverURL + "/api/loadCollection";
    console.log(url);
    console.log("line 119")
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({userID: userID})
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  };





  const handleUserID = (event) => {
    setUserID(event.target.value);
  }
  const handleRank = (event) => {
    setRank(event.target.value);
  }

  const handleDisplayChange = (event) => {
    setShowData(true);
    console.log(rank);
    loadRank();
  }

  const handleAddCollection = (event) => {
    setValue(true);
    callApiaddCollection();
  }

  const handleMovieName = (event) => {
    setAddMovie(event.target.value);
  }

  const handleDisplayCollection = (event) => {
    setShowCollection(true);
    loadCollection();
  }

  return (
      <div>

        <NavBar/> 

        <Grid container
          direction="rows"
          justifyContent="space-evenly"
          row padding={3}>

          <Grid item xs={4}>
          <FormControl variant="standard" sx={{ minWidth: 150 }}>
            <InputLabel id="label">Select Top Movies</InputLabel>

            <Select
              id="label"
              label="numbers"
              onChange={handleRank}
            >
              <MenuItem value={10}>Top 10</MenuItem>
              <MenuItem value={50}>Top 50</MenuItem>
              <MenuItem value={100}>Top 100</MenuItem>
            </Select>  
          </FormControl>

          

          <br/>
          <br/>

            <Button 
              variant="contained"
              align="centered"
              onClick={handleDisplayChange}>
              Display Selected
            </Button>            
            
            {showData && (
              <Grid item xs>
  
                {       
                  result.map((value, index) => (
                    <>
                      <hr/>
                      <Typography variant="subtitle1">Movie {index+1}:</Typography>
                      <Typography variant="subtitle1">Movie Name: {value.name}</Typography>
                      <Typography variant="subtitle1">Movie Rating: {value.rating}</Typography>
                    </>
                  ))
              }
              </Grid>
            )}
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="outlined-textarea"
              label="Enter Movie to Add"
              placeholder="Enter Movie to Add"
              width={10}
              multiline
              value={addMovie}
              onChange={handleMovieName}
            />
            <br/>
            <br/>
          <TextField
              id="outlined-textarea"
              label="Enter UserID"
              placeholder="Enter Your UserID"
              width={10}
              multiline
              value={userID}
               onChange={handleUserID}
            />  
            <br/>
            <br/>
            <Button 
              variant="contained"
              align="centered"
              onClick={handleAddCollection}>
              Add Movie to COllection
            </Button> 

            <br/>
            <br/>
            <Button 
              variant="contained"
              align="centered"
              onClick={handleDisplayCollection}>
              Display Movie Collection
            </Button>   
            {showCollection && (
              <Grid item xs>
  
              {       
                  collection.map((value, index) => (
                    <>
                      <hr/>
                      <Typography variant="subtitle1">Movie {index+1}:</Typography>
                      <Typography variant="subtitle1">Movie Name: {value.movieName}</Typography>
                    </>
                  ))
              }
              </Grid>
            )}


          </Grid>

        </Grid>



















        
      </div>

    

  );
}

export default MyPage;
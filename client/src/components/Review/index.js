import * as React from 'react';
import ReviewTitle from './ReviewTitle';
import ReviewBody from './ReviewBody';
import ReviewRating from './ReviewRating';
import MovieSelection from './MovieSelection';
//import all necessary libraries here, e.g., Material-UI Typography, as follows
import {Box, Typography, Grid, Button} from '@mui/material';
import NavBar from '../Navigation';

const serverURL = "";

const Review = (props) => {

  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState("");
  const [enteredTitle, setEnteredTitle] = React.useState("");
  const [enteredReview, setEnteredReview] = React.useState("");
  const [selectedRating, setSelectedRating] = React.useState(0);
  const [submit, setSubmit] = React.useState(false);
  const [userID, setuserID] = React.useState(1);
  const [movieID, setMovieID] = React.useState(0);


  const reviewData = {
    reviewTitle: enteredTitle, 
    reviewContent: enteredReview,
    reviewScore: selectedRating,
    movieID: movieID,
    userID: userID
  };
  
  const handleSubmitChange = () => {
    setSubmit(true);
    console.log(submit);
    if(selectedRating !== 0 && enteredReview !== "" && enteredTitle !== "" && selectedMovie !== ""){
      callApiaddReview();
    }
  }



  React.useEffect(() => {
    movies.map((currentMovie) => {
      if(currentMovie.name === selectedMovie){
        setMovieID(currentMovie.id);
      }
    })
  }, [selectedMovie]);

  
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


  const callApiaddReview = async () => {
    const url = serverURL + "/api/addReview";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      }, 
      body: JSON.stringify(reviewData)
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("Successfully Sent");
    return body;
  };

  return (
    <>
    {/* 1a */}

    <div>
      <NavBar/> 
    </div>
    
    <Grid
      container
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
      row padding={3}
      >

        {/* 1b Typography */}
        <Grid item xs>
          <Typography variant="h3" color="#E9897E">Movie Review</Typography>  
        </Grid>


      <MovieSelection 
        movieNames = {movies}
        selectedMovie = {selectedMovie}
        setSelectedMovie = {setSelectedMovie}
        setSubmit = {setSubmit}
        />

        <>
          {submit ? (
            <>
                {selectedMovie === "" ? (
                  <Grid item xs spacing={0}>
                    <Typography variant="h6" color="red">Select your movie</Typography>
                  </Grid>
                ) : (<> </>)
              }
              </>
          ) : (<> </> )}
        </>

      <ReviewTitle 
        ReviewTitle ={enteredTitle}
        setReviewTitle = {setEnteredTitle}
        setSubmit = {setSubmit}
        />

        <>
          {submit ? (
            <>
                {enteredTitle === "" ? (
                  <Grid item xs spacing={0}>
                    <Typography variant="h6" color="red">Enter your review title</Typography>
                  </Grid>
                ) : (<> </>)
              }
              </>
          ) : (<> </> )}
        </>
      
      <ReviewBody 
        ReviewBody = {enteredReview}
        setReview = {setEnteredReview}
        setSubmit = {setSubmit}
        />
        <>
          {submit ? (
            <>
                {enteredReview === "" ? (
                  <Grid item xs spacing={0}>
                    <Typography variant="h6" color="red">Enter your review</Typography>
                  </Grid>
                ) : (<> </>)
              }
              </>
            ) : (<> </> )}
          </>

      <ReviewRating 
        ReviewRating = {selectedRating}
        setRating = {setSelectedRating}
        setSubmit = {setSubmit}
        />
        <>
          {submit ? (
            <>
                {selectedRating === 0 ? (
                  <Grid item xs spacing={0}>
                    <Typography variant="h6" color="red">Select the rating</Typography>
                  </Grid>
                ) : (<> </>)
              }
              </>
          ) : (<> </> )}
        </>

      {/* 1g */}
      <Grid item xs>
        <Button 
        variant="contained"
        align="centered" 
        onClick={handleSubmitChange}>
        Submit
        </Button>
      </Grid>

      {/* 2b */}
        <Grid item xs>
          <>
            {submit && selectedRating !== 0 && enteredReview !== "" && enteredTitle !== "" && selectedMovie !== "" ? (
              <>
                <Grid item xs spacing={0} align="centered">
                  <Box sx={{ border: 3, padding: 3, backgroundColor: '#F0D6B3', borderColor: '#E5C49B', borderRadius: '16px' }}>
                      <Typography variant="h6" color="#E9897E">Your review has been received</Typography>
                      <Typography variant="h6" color="#E9897E">Movie Name: {selectedMovie}</Typography>
                      <Typography variant="h6" color="#E9897E">Title: {enteredTitle}</Typography>
                      <Typography variant="h6" color="#E9897E">Review: {enteredReview}</Typography>
                      <Typography variant="h6" color="#E9897E">Rating: {selectedRating}</Typography>
                  </Box>
                </Grid>
              </> ) : (<> </> )}
            </>
        </Grid>

      </Grid>
    </>
  );
}

export default Review;

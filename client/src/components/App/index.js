import * as React from 'react';
import {Box, Grid } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Review from '../Review';
import Landing from '../Landing';
import Search from '../Search';
import MyPage from '../MyPage';


const App = () => {


  return (
      <div>

        

        <Grid>
          <Box 
            sx={{  width: '100%',
            height: 10500, backgroundColor: '#F4F0EA'}}>
              
            <Router>
              <div>
                <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/Review" element={<Review />} />
                <Route path="/MyPage" element={<MyPage />} />

                </Routes>
              </div>
            </Router>



          </Box>
        </Grid>
        
      </div>

    

  );
}

export default App;
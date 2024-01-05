import React from 'react';
import {Typography, Grid} from "@mui/material";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Navigation';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div>
            <NavBar/> 
            
            <Grid container direction="column" padding={5}>

                <Typography variant="h4" >
                    This is a movie review application.
                </Typography>
                <Typography variant="h6" >
                    The Review page allows you to write an review and give rating to a specific movie.
                </Typography>
                <Typography variant="h6" >
                    The Search page allows you to search reviews based on the movie name, actor, and director.
                </Typography><Typography variant="h6" >
                    The MyPage page allows you to view the top 10, 50 or 100 rated movies.
                    This page also lets you add and display your personal movie collection.
                </Typography>
            </Grid>

            

        </div>
    )

}

export default Landing;
import React from 'react';
import {  Typography, Box, Container } from '@mui/material'
import ImagePageNotFound from "../Images/pagenotfound1.png";

const PageNotFound = () => {
  return (
    <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        alignContent="center"
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h3"
            
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="h5"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Box textAlign="center" mt="5">
            <img
              alt="Under development"
              src={ImagePageNotFound}
            />
          </Box>
        </Container>
      </Box>
  )
}

export default PageNotFound
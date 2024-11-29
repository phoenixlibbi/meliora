import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function ProfileComponent() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== undefined && isAuthenticated !== undefined) {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  if (isLoading) {
    return (
      <Container className='flex flex-col items-center justify-center h-screen'>
        <Loading />
      </Container>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Container className='flex flex-col items-center justify-center h-screen'>
        <Typography variant='h4' className='mb-4'>
          Please Sign In or Sign Up
        </Typography>
        <Typography variant='body1' className='mb-8 text-gray-600'>
          You need to be logged in to view your profile.
        </Typography>
        <div className='flex space-x-4'>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate("/")}>
            Go to Home
          </Button>
          <Button
            variant='outlined'
            color='primary'
            onClick={() => navigate("/signin")}>
            Sign In
          </Button>
        </div>
      </Container>
    );
  }

  const { house, street, city, state, postalCode, country } =
    user.address || {};

  return (
    <Container className='py-10'>
      <Grid container spacing={4} className='items-center'>
        <Grid item xs={12} sm={4} className='flex justify-center'>
          <Avatar
            alt={user.name}
            src={user.profilePicture || "/default-avatar.png"}
            className='h-32 w-32 border-2 border-gray-300'
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography variant='h4' className='mb-2'>
            {user.name}
          </Typography>
          <Typography variant='body1' className='text-gray-600'>
            {user.email}
          </Typography>
          <Typography variant='body2' className='mt-4 text-gray-500'>
            Joined on: {new Date(user.joinedDate).toLocaleDateString() || "N/A"}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} className='mt-10'>
        <Grid item xs={12} md={6}>
          <div className='p-6 bg-gray-100 rounded-lg'>
            <Typography variant='h6' className='mb-2'>
              About Me
            </Typography>
            <Typography variant='body2' className='text-gray-600'>
              {user.bio || "No bio available."}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className='p-6 bg-gray-100 rounded-lg'>
            <Typography variant='h6' className='mb-2'>
              Address
            </Typography>
            {user.address ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='body2' className='text-gray-600'>
                    House: {house || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' className='text-gray-600'>
                    Street: {street || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2' className='text-gray-600'>
                    City: {city || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2' className='text-gray-600'>
                    State: {state || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2' className='text-gray-600'>
                    Postal Code: {postalCode || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2' className='text-gray-600'>
                    Country: {country || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography variant='body2' className='text-gray-600'>
                Address not available.
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

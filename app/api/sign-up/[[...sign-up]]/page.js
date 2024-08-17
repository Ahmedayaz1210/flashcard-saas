import React from 'react';
import { SignUp } from "@clerk/nextjs";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
export default function SignUpPage() {
  return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          backgroundImage: 'linear-gradient(to bottom, #001f3f, #000000)',
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
              backgroundColor: 'rgba(10, 25, 41, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 4,
                color: 'primary.main',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(58, 143, 242, 0.5)',
              }}
            >
              Sign up for a new account
            </Typography>
            <SignUp 
            signInUrl='/api/sign-in'
              appearance={{
                layout: {
                  termsPageUrl: 'https://clerk.com/terms',
                  signInFallbackRedirectUrl: '/sign-in',}
              }}
            />
          </Box>
        </Container>
      </Box>
  );
}
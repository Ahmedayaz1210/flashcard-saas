import React from 'react';
import { ClerkProvider, SignIn } from "@clerk/nextjs";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
export default function SignInPage() {
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
              Sign In to Your Account
            </Typography>
            <SignIn 
            signUpUrl='/api/sign-up'
            forceRedirectUrl= '/flashcards'
              appearance={{
                layout: {
                  termsPageUrl: 'https://clerk.com/terms',                          
                }
              }}
            />
          </Box>
        </Container>
      </Box>
  );
}
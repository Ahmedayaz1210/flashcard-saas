"use client"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Box, Typography, Grid } from "@mui/material";
import FeaturesAndPricing from "../components/FeaturesAndPricing";
import Head from 'next/head';
import AppAppBar from "../components/AppAppBar";
import Hero from "../components/Hero";
import darkTheme from '../components/darkTheme'; // Adjust the import path as needed
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Box width="100vw">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>
      <AppAppBar/>
      <Hero/>
      <FeaturesAndPricing/>
        
    </Box>
    </ThemeProvider>
  );
}

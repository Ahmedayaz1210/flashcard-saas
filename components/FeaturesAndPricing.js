import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Button } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import getStripe from "@/utils/get-stripe";


const handleSubmit = async () => {
  const checkoutSession = await fetch('/api/checkout_sessions', {
    method: 'POST',
    headers: { origin: 'http://localhost:3000' }, //Will have to change later when deployed on Vercel
  })
  const checkoutSessionJson = await checkoutSession.json()

  if (checkoutSession.statusCode === 500){
     console.error(checkoutSession.message)
     return
  }

  const stripe = await getStripe()
  const {error} = await stripe.redirectToCheckout({
    sessionId: checkoutSessionJson.id,
  })

  if (error) {
    console.warn(error.message)
  }
}

const FeatureItem = ({ title, description }) => (
  <Paper
    elevation={3}
    sx={{
      height: '100%',
      p: 3,
      backgroundColor: 'rgba(10, 25, 41, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: 2,
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
      },
    }}
  >
    <Typography variant="h6" component="h3" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {description}
    </Typography>
  </Paper>
);

const PricingTier = ({ tier }) => (
  <Paper
    elevation={3}
    sx={{
      height: '100%',
      p: 3,
      backgroundColor: 'rgba(10, 25, 41, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: 2,
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
      },
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
      {tier.title}
    </Typography>
    {tier.subheader && (
      <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
        {tier.subheader}
      </Typography>
    )}
    <Typography variant="h4" component="div" sx={{ my: 2 }}>
      ${tier.price}<span style={{ fontSize: '1rem' }}> /mo</span>
    </Typography>
    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', flexGrow: 1 }}>
      {tier.description.map((line) => (
        <li key={line}>
          <CheckCircleRoundedIcon sx={{ color: 'primary.main', fontSize: 'small' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline', ml: 1 }}>
            {line}
          </Typography>
        </li>
      ))}
    </ul>
    <Button 
      variant={tier.buttonVariant} 
      color="primary"
      fullWidth
      onClick={() => {
        if (tier.buttonText === 'Choose Professional') {
          handleSubmit()
        }
      }}
    >
      {tier.buttonText}
      
    </Button>
  </Paper>
);

const tiers = [
  {
    title: 'Basic',
    price: '0',
    description: [
      'Access to basic features',
      'limited storage',
    ],
    buttonText: 'Choose Basic',
    buttonVariant: 'contained',
  },
  {
    title: 'Professional',
    subheader: 'Recommended',
    price: '10',
    description: [
      'Unlimited flashcards',
      'Unlimited storage',

    ],
    buttonText: 'Choose Professional',
    buttonVariant: 'contained',
  },
];

export default function FeaturesAndPricing() {
  
  return (
    <>
      <Box sx={{ my: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 7,
            fontSize: 'clamp(1.5rem, 10vw, 2.5rem)',
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '0 0 10px rgba(58, 143, 242, 0.5)',
          }}
        >
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <FeatureItem
              title="Easy to Use"
              description="Create flashcards from your text in seconds"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureItem
              title="Customizable"
              description="Customize your flashcards with different styles and colors"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FeatureItem
              title="Shareable"
              description="Share your flashcards with friends and classmates"
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 7,
            fontSize: 'clamp(1.5rem, 10vw, 2.5rem)',
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '0 0 10px rgba(58, 143, 242, 0.5)',
            mt: 10
          }}
        >
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={5}>
              <PricingTier tier={tier} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
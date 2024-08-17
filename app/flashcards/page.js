'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { collection, doc, getDoc, writeBatch, setDoc } from 'firebase/firestore'
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from '../../components/darkTheme';
import { useState, useEffect, use } from 'react'
import { db } from '@/firebase'
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography, CssBaseline, Button } from '@mui/material'
import { Delete as DeleteIcon, } from '@mui/icons-material';
import AppAppBar from "../../components/AppAppBar";
export default function Flashcards(){
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
          if (!user) return
          const docRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            setFlashcards(collections)
          } else {
            await setDoc(docRef, { flashcards: [] })
          }
        }
        getFlashcards()
      }, [user])

   if(!isLoaded || !isSignedIn){
    return <></>
   }   

   const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  const handleDelete = () => {
    console.log('delete')
    }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppAppBar showCollections={true} showGenerate={true}/>
      <Box width="100vw" sx={{mt:15}}>
        <Typography variant="h4" component="h1" sx={{ mt: 4, textAlign: 'center', fontSize: 'clamp(1.5rem, 10vw, 2.5rem)',
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '0 0 10px rgba(58, 143, 242, 0.5)', }}>
          Your Flashcards Collection
        </Typography>
      </Box>
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', alignItems: 'center' }}>
            <Card sx={{ flexGrow: 1, mr: 1 }}>
              <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{fontSize: 'clamp(0.5rem, 10vw, 1.5rem)',fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '0 0 10px rgba(58, 143, 242, 0.5)'}}>
                    {flashcard.name[0].toUpperCase() + flashcard.name.slice(1)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleDelete(flashcard.name)}
              sx={{
                backgroundColor: '#80deea',
                color: 'white',
                minWidth: 'auto',
                width: 40,
                height: 40,
                p: 0,
                '&:hover': {
                  backgroundColor: '#0891b2',
                },
              }}
            >
              <DeleteIcon />
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
    </ThemeProvider>
  )
}
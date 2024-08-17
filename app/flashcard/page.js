'use client'

import { useUser } from '@clerk/nextjs'
import darkTheme from '../../components/darkTheme';
import { collection, doc, getDoc, writeBatch, setDoc, getDocs } from 'firebase/firestore'
import { useState, useEffect, use } from 'react'
import { db } from '@/firebase'
import { ThemeProvider } from '@mui/material/styles';
import { useSearchParams } from 'next/navigation'
import { Box, Card, CardActionArea, CardContent, Container, Grid, Typography, CssBaseline } from '@mui/material'
import AppAppBar from "../../components/AppAppBar";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
  
    const searchParams = useSearchParams()
    const search = searchParams.get('id')
  
    // ... (rest of the component)

         useEffect(() => {
        async function getFlashcard() {
          if (!search || !user) return
      
          const colRef = collection(doc(collection(db, 'users'), user.id), search)
          const docs = await getDocs(colRef)
          const flashcards = []
          docs.forEach((doc) => {
            flashcards.push({ id: doc.id, ...doc.data() })
          })
          setFlashcards(flashcards)
        }
        getFlashcard()
      }, [search, user])

      const handleCardClick = (id) => {
        setFlipped((prev) => ({
          ...prev,
          [id]: !prev[id],
        }))
      }

      if(!isLoaded || !isSignedIn){
        return <></>
       } 
    return(
        <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppAppBar showCollections={true} 
  showGenerate={true}/>
        <Box width="100vw" sx={{mt:15}}>
        <Typography variant="h4" component="h1" sx={{ mt: 4, textAlign: 'center', fontSize: 'clamp(1.5rem, 10vw, 2.5rem)',
            fontWeight: 'bold',
            color: 'primary.main',
            textShadow: '0 0 10px rgba(58, 143, 242, 0.5)', }}>
          Your Flashcards
        </Typography>
      </Box>
        <Container maxWidth="100vw">
        <Grid container spacing={3} sx={{ mt: 4, mb: 4 }}>
        {flashcards.map((flashcard, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardActionArea onClick={() => handleCardClick(index)}>
              <CardContent>
                <Box sx={{ 

                perspective: '1000px',
                '& > div': {
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                    width: '100%',
                    height: '200px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                    transform: flipped[index]? 'rotateY(180deg)' : 'rotateY(0deg)',
                },
                '& > div > div': {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    boxSizing: 'border-box',
                },
                '& > div > div:nth-of-type(2)': {
                    transform:'rotateY(200deg)',
                },
                 }}>
                  <div>
                    <div>
                      <Typography variant="h5" component="div">
                        {flashcard.front}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h5" component="div">
                        {flashcard.back}
                      </Typography>
                    </div>
                  </div>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
   </Grid>
</Container>
</ThemeProvider>
    )
}
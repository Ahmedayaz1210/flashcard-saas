'use client'
import { useState } from 'react'
import { db } from '@/firebase'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  Card,
  Grid,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CssBaseline
} from '@mui/material'
import darkTheme from '../../components/darkTheme';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { collection, doc, getDoc, writeBatch, setDoc } from 'firebase/firestore'
import { ThemeProvider } from '@mui/material/styles';
import AppAppBar from "../../components/AppAppBar";

export default function Generate() {
  const {isLoaded, isSigned, user} = useUser()
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
        fetch('api/generate', {
        method: 'POST',
        body: text,
      })
        .then((res) => res.json())
        .then((data) => setFlashcards(data))
  }

  const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
  }

  const handleOpen = () => {
        setOpen(true)
  }

  const handleClose = () => {
       setOpen(false)
}

const saveFlashcards = async () => {
    if (!name) {
      alert('Please enter a name for your flashcard set.')
      return
    }
  
    
      const userDocRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(userDocRef)
      const batch = writeBatch(db)
  
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        if(collections.find((f) => f.name === name)){
          alert('Flashcard collection with the same name already exists!')
          return
        } else{
            collections.push({name})
            batch.set(userDocRef, {flashcards: collections}, {merge: true})
        }
    }
    else{
        batch.set(userDocRef, {flashcards: [{name }]})
    }

    const colRef = collection(userDocRef, name)
     flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
     })

     await batch.commit()
     handleClose()
     router.push('/flashcards')
 }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppAppBar showCollections={true} 
  showGenerate={true} showSignIn={false} showSignUp={false} showSignOut={true}
  />
    <Container maxWidth="md" sx={{mt:15}}>
      <Box sx={{ my: 4 }}>
      <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: 'primary.light',
                textAlign: 'center',
                display: 'block',
                mb: 2
              }}
            >
              Generate
            </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
      </Box>
      {flashcards.length > 0 && (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h5" component="h2" gutterBottom>
     Flashcards Preview
    </Typography>
    <Grid container spacing={3}>
      {flashcards.map((flashcard, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardActionArea
             onClick={() => {
                handleCardClick(index)
            }}
            >  
            <CardContent>
            <Box
             sx={{
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
            }}
            >
            <div>
               <div>
              <Typography variant='h5' component='div'>
                {flashcard.front}
                </Typography>
                </div>
                <div>
                <Typography variant='h5' component='div'>
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
    <Box sx={{mb: 2, display: 'flex', justifyContent: 'center'}}>
      <Button variant="contained"
          color="primary" onClick={handleOpen} >
       Save
      </Button>
    </Box>
  </Box>
)}
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle sx={{
                fontSize: 'clamp(1rem, 10vw, 2rem)',
                color: 'primary.light',
                textAlign: 'center',
                display: 'block',
                mb: 2
              }}>Save Flashcards</DialogTitle>
     <DialogContent>
    <DialogContentText>
      Please enter a name for your flashcard collection.
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      label="Collection Name"
      type="text"
      fullWidth
      value={name}
      onChange={(e) => setName(e.target.value)}
      variant='outlined'
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={saveFlashcards} color="primary">
      Save
    </Button>
  </DialogActions>
     </Dialog>
    </Container>
  </ThemeProvider>
  )
}
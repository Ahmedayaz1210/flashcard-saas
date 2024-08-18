import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { SignOutButton, useAuth } from '@clerk/nextjs'

function AppAppBar({ showCollections, showGenerate, showSignIn, showSignUp, showSignOut }) {
  const [open, setOpen] = React.useState(false);
  const { sessionId } = useAuth()

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              
              <Box sx={{ display: {xs: 'flex', md: 'flex' } }}>
                <MenuItem
                  onClick={() => scrollToSection('features')}
                  sx={{ py: '6px', px: '12px' }}
                >
                    <Button
                      href='/'
                      variant="text"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
                        textTransform: 'none',
                        padding: 0,
                        '&:hover': {
                          textDecoration: 'none',
                        },
                      }}
                    >
                      Flashcard SaaS
                    </Button>
                  </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'flex', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {showCollections && (
                <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  href="\flashcards"
                >
                  Collections
                </Button>
                <Divider orientation="vertical" flexItem />
                </>
              )}
              {showGenerate && (
                <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  href="\generate"
                >
                  Generate
                </Button>
                <Divider orientation="vertical" flexItem />
                </>
              )}
              
              {showSignIn && (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    href="api\sign-in"
                    sx={{marginRight: 0}}
                  >
                    Sign in
                  </Button>
                  <Divider orientation="vertical" flexItem />
                </>
              )}
              {showSignUp && (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    href="api\sign-up"
                  >
                    Sign up
                  </Button>
                  {showSignOut && <Divider orientation="vertical" flexItem />}

                </>
                
              )}
              {showSignOut && (
                <SignOutButton 
                  signOutOptions={{ sessionId }}>
                  <Button
                    color="primary"
                    variant="text"
                    size="small">
                    Sign out
                  </Button>
                </SignOutButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  showCollections: PropTypes.bool,
  showGenerate: PropTypes.bool,
  showSignIn: PropTypes.bool,
  showSignUp: PropTypes.bool,
  showSignOut: PropTypes.bool,
};

AppAppBar.defaultProps = {
  showCollections: false,
  showGenerate: false,
  showSignIn: true,
  showSignUp: true,
  showSignOut: false,
};

export default AppAppBar;
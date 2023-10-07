import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{backgroundColor: 'black'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HEALTH HEAVEN
          </Typography>

          {/* Nav Items For NonMobileScreens */}
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex' }, justifyContent: 'flex-start', gap: '2rem' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0.5rem 1rem',
                ml: '5rem',
                '&:hover':{
                  backgroundColor: '#1b1b1b',
                  cursor: 'pointer'
                },
                borderRadius: '0.25rem'
              }}
            >
                <HomeIcon />
                <Typography sx={{ml: '0.25rem'}}>
                  Home
                </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0.5rem 1rem',
                '&:hover':{
                  backgroundColor: '#1b1b1b',
                  cursor: 'pointer'
                },
                borderRadius: '0.25rem'
              }}
            >
                <EmojiPeopleIcon />
                <Typography sx={{ml: '0.25rem'}}>
                  About Us
                </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0.5rem 1rem',
                '&:hover':{
                  backgroundColor: '#1b1b1b',
                  cursor: 'pointer'
                },
                borderRadius: '0.25rem'
              }}
            >
                <HomeRepairServiceIcon />
                <Typography sx={{ml: '0.25rem'}}>
                  Services
                </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: '0.5rem 1rem',
                '&:hover':{
                  backgroundColor: '#1b1b1b',
                  cursor: 'pointer'
                },
                borderRadius: '0.25rem'
              }}
            >
                <PersonIcon />
                <Typography sx={{ml: '0.25rem'}}>
                  Account
                </Typography>
            </Box>
          </Box>

          <Box>
            <Typography>
              Praman Singh Tomar
            </Typography>
          </Box>

          {/* <Box
              sx={{
                display: 'flex',
                backgroundColor: '#333333',
                flexDirection: 'row',
                padding: '0.5rem 1rem',
                '&:hover':{
                  cursor: 'pointer'
                },
                borderRadius: '0.25rem',
                ml: '1rem'
              }}
            >
              <LogoutIcon />
              <Typography sx={{ml: '0.25rem'}}>
                Logout
              </Typography>
          </Box> */}
          
          <Box sx={{ flexGrow: 0, ml: '1rem' }}> 
            <Tooltip title="Open settings" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleIcon />
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
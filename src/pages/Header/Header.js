import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';

const Header = ({ loggedIn, handleLogout }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>
            Job Portal
          </Typography>
          {loggedIn && (
            <Typography variant="body2" sx={{ color: '#fff', marginLeft: 2 }}>
              Welcome back!
            </Typography>
          )}
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/jobs">
            Jobs
          </Button>
          <Button color="inherit" component={Link} to="/cities">
            Qytetet
          </Button>
          <Button color="inherit" component={Link} to="/create-job">
            Create Job
          </Button>

          {loggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}

          <IconButton color="inherit" component={Link} to="/profile">
            <PersonIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <List>
          <ListItem button component={Link} to="/jobs">
            <ListItemText primary="Jobs" />
          </ListItem>
          <ListItem button component={Link} to="/cities">
            <ListItemText primary="Qytetet" />
          </ListItem>
          <ListItem button component={Link} to="/create-job">
            <ListItemText primary="Create Job" />
          </ListItem>
          {loggedIn ? (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          ) : (
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
          )}
          <ListItem button component={Link} to="/profile">
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;

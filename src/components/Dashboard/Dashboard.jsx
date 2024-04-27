import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Playlist from '../../pages/Playlist';
import SideNav from '../SideNav/SideNav';
import Player from '../Player/Player';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import MobileNav from '../MobileNav/MobileNav';
import Library from '../../pages/Library';

const Dashboard = ({ spotifyApi }) => {
  const [token, setToken] = useState(getAccessTokenFromStorage);
  const [spotifyHasToken, setSpotifyHasToken] = useState(false);
  
  useEffect(() => {
    async function onMount() {
      await spotifyApi.setAccessToken(token);
      setSpotifyHasToken(true);
    }

    if (token) onMount();
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
        {spotifyHasToken && (
            <SideNav spotifyApi={spotifyApi} token={token} />
            <Routes>
              <Route path="/playlist/:id" element={<Playlist spotifyApi={spotifyApi} token={token} />} />
              <Route path="/library" element={<Library spotifyApi={spotifyApi} token={token} />} />
              <Route path="/" element={<Home />} />
            </Routes>
          )}
      </Box>
      {token && spotifyHasToken && <Player spotifyApi={spotifyApi} token={token} />}
      <MobileNav />
    </Box>
  );
};

export default Dashboard;

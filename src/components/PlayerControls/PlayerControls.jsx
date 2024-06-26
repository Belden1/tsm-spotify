import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { useEffect, useState } from 'react';

const PlayerControls = ({ player, isPaused, duration, progress }) => {
  const [currentProgress, setCurrentProgress] = useState(progress);
  const skipStyle = { width: 28, height: 28 };
  const playStyle = { width: 38, height: 38 };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused && player) {
        setCurrentProgress((prevState) => prevState + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isPaused, player]);

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  return (
    <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        <IconButton
          size="small"
          sx={{ color: 'text.primary' }}
          onClick={() => {
            setCurrentProgress(0);
            player.previousTrack();
          }}
        >
          <SkipPrevious sx={skipStyle} />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: 'text.primary' }}
          onClick={() => {
            player.togglePlay();
          }}
        >
          {isPaused ? <PlayArrow sx={playStyle} /> : <Pause sx={playStyle} />}
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: 'text.primary' }}
          onClick={() => {
            setCurrentProgress(0);
            player.nextTrack();
          }}
        >
          <SkipNext sx={skipStyle} />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ width: '75%' }}>
        <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(currentProgress)}</Typography>
        <Slider
          size="medium"
          value={currentProgress}
          min={0}
          max={duration}
          onChange={(event, value) => {
            console.log('Changed', value);
            setCurrentProgress(value);
          }}
          onChangeCommitted={(event, value) => {
            console.log('Commited', value);
            player.seek(value * 1000);
          }}
        />
        <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{formatTime(duration)}</Typography>
      </Stack>
    </Stack>
  );
};

export default PlayerControls;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  Settings as SettingsIcon, 
  BarChart as BarChartIcon, 
  Home as HomeIcon,
  Brightness4,
  Brightness7
} from '@mui/icons-material';

function Header({ themeMode, toggleTheme }) {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Технологический трекер
          <Typography variant="caption" sx={{ ml: 2, opacity: 0.8 }}>
            {themeMode === 'light' ? '☀️ Светлая тема' : '🌙 Темная тема'}
          </Typography>
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
            color={location.pathname === '/' ? 'inherit' : 'inherit'}
            variant={location.pathname === '/' ? 'contained' : 'text'}
            sx={{
              bgcolor: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Главная
          </Button>
          
          <Button
            component={Link}
            to="/statistics"
            startIcon={<BarChartIcon />}
            color={location.pathname === '/statistics' ? 'inherit' : 'inherit'}
            variant={location.pathname === '/statistics' ? 'contained' : 'text'}
            sx={{
              bgcolor: location.pathname === '/statistics' ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Статистика
          </Button>
          
          <Button
            component={Link}
            to="/settings"
            startIcon={<SettingsIcon />}
            color={location.pathname === '/settings' ? 'inherit' : 'inherit'}
            variant={location.pathname === '/settings' ? 'contained' : 'text'}
            sx={{
              bgcolor: location.pathname === '/settings' ? 'rgba(255,255,255,0.2)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Настройки
          </Button>

          <Tooltip title={`Переключить на ${themeMode === 'light' ? 'темную' : 'светлую'} тему`}>
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              sx={{ ml: 1 }}
              aria-label="Переключить тему"
            >
              {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
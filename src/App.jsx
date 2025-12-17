import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Snackbar, Alert, IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { initialTechnologies } from './utils/technologiesData';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';
import './styles/App.css';

// Создаем темы
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Светлая тема
          primary: {
            main: '#667eea',
            light: '#a5b4fc',
            dark: '#5a67d8',
          },
          secondary: {
            main: '#764ba2',
            light: '#9f7aea',
            dark: '#553c9a',
          },
          success: {
            main: '#38a169',
            light: '#68d391',
            dark: '#276749',
          },
          warning: {
            main: '#ed8936',
            light: '#fbd38d',
            dark: '#dd6b20',
          },
          error: {
            main: '#f56565',
            light: '#fc8181',
            dark: '#c53030',
          },
          background: {
            default: '#f5f7fa',
            paper: '#ffffff',
          },
          text: {
            primary: '#1a202c',
            secondary: '#718096',
          },
          divider: '#e2e8f0',
        }
      : {
          // Темная тема
          primary: {
            main: '#9f7aea',
            light: '#b794f4',
            dark: '#805ad5',
          },
          secondary: {
            main: '#ed64a6',
            light: '#f687b3',
            dark: '#d53f8c',
          },
          success: {
            main: '#48bb78',
            light: '#68d391',
            dark: '#38a169',
          },
          warning: {
            main: '#ed8936',
            light: '#fbd38d',
            dark: '#dd6b20',
          },
          error: {
            main: '#f56565',
            light: '#fc8181',
            dark: '#e53e3e',
          },
          background: {
            default: '#0f172a',
            paper: '#1e293b',
          },
          text: {
            primary: '#f7fafc',
            secondary: '#a0aec0',
          },
          divider: '#2d3748',
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    mode === 'light' 
      ? '0px 2px 4px rgba(0,0,0,0.05)'
      : '0px 2px 4px rgba(0,0,0,0.3)',
    mode === 'light'
      ? '0px 4px 8px rgba(0,0,0,0.07)'
      : '0px 4px 8px rgba(0,0,0,0.4)',
    mode === 'light'
      ? '0px 8px 16px rgba(0,0,0,0.09)'
      : '0px 8px 16px rgba(0,0,0,0.5)',
    mode === 'light'
      ? '0px 16px 32px rgba(0,0,0,0.11)'
      : '0px 16px 32px rgba(0,0,0,0.6)',
  ],
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light' 
            ? '0px 4px 15px rgba(0, 0, 0, 0.05)'
            : '0px 4px 15px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
              ? '0px 8px 25px rgba(0, 0, 0, 0.1)'
              : '0px 8px 25px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0px 4px 12px rgba(0, 0, 0, 0.15)'
              : '0px 4px 12px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'light'
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        },
      },
    },
  },
});

function App() {
  const [technologies, setTechnologies] = useState(() => {
    const saved = localStorage.getItem('technologies');
    return saved ? JSON.parse(saved) : initialTechnologies;
  });
  
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme || 'light';
  });
  
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });

  // Создаем тему с помощью useMemo для оптимизации
  const theme = useMemo(() => createTheme(getDesignTokens(themeMode)), [themeMode]);

  useEffect(() => {
    localStorage.setItem('technologies', JSON.stringify(technologies));
  }, [technologies]);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      showNotification(`Тема изменена на ${newMode === 'light' ? 'светлую' : 'темную'}`, 'info');
      return newMode;
    });
  };

  const showNotification = (message, severity = 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleStatusChange = (id, newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => {
        if (tech.id === id) {
          const updatedTech = { 
            ...tech, 
            status: newStatus,
            progress: newStatus === 'completed' ? 100 : newStatus === 'in-progress' ? 30 : 0
          };
          
          const statusText = newStatus === 'completed' ? 'завершена' : 
                           newStatus === 'in-progress' ? 'начата' : 'приостановлена';
          showNotification(`Технология "${tech.title}" ${statusText}`, 'success');
          
          return updatedTech;
        }
        return tech;
      })
    );
  };

  const handleAddTechnology = (newTech) => {
    const newId = Math.max(...technologies.map(t => t.id)) + 1;
    const technology = {
      ...newTech,
      id: newId,
      progress: newTech.status === 'in-progress' ? 30 : 0
    };
    
    setTechnologies(prev => [...prev, technology]);
    showNotification(`Технология "${newTech.title}" добавлена`, 'success');
  };

  const handleResetStatuses = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ 
        ...tech, 
        status: 'not-started',
        progress: 0 
      }))
    );
    showNotification('Все статусы сброшены', 'info');
  };

  const handleMarkAllAsCompleted = () => {
    setTechnologies(prev => 
      prev.map(tech => ({ 
        ...tech, 
        status: 'completed',
        progress: 100 
      }))
    );
    showNotification('Все технологии отмечены как завершенные', 'success');
  };

  const handleExportData = () => {
    showNotification('Данные подготовлены для экспорта', 'info');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app" data-theme={themeMode}>
          <Header themeMode={themeMode} toggleTheme={toggleTheme} />
          <Container maxWidth="xl" className="app-content">
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    technologies={technologies}
                    onStatusChange={handleStatusChange}
                    onAddTechnology={handleAddTechnology}
                    onMarkAllAsCompleted={handleMarkAllAsCompleted}
                    onExportData={handleExportData}
                    themeMode={themeMode}
                  />
                } 
              />
              <Route 
                path="/statistics" 
                element={
                  <StatisticsPage technologies={technologies} themeMode={themeMode} />
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <SettingsPage 
                    technologies={technologies}
                    setTechnologies={setTechnologies}
                    onResetStatuses={handleResetStatuses}
                    themeMode={themeMode}
                    toggleTheme={toggleTheme}
                  />
                } 
              />
            </Routes>
          </Container>
          
          <Snackbar
            open={notification.open}
            autoHideDuration={4000}
            onClose={handleCloseNotification}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseNotification} 
              severity={notification.severity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {notification.message}
            </Alert>
          </Snackbar>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
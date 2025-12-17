/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import { Upload as UploadIcon, Download as DownloadIcon, Save as SaveIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

function DataImportExport({ technologies, setTechnologies, themeMode }) {
  const [status, setStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const exportToJSON = () => {
    try {
      const dataStr = JSON.stringify(technologies, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus('Данные экспортированы в JSON');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Ошибка экспорта данных');
    }
  };

  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);

        if (!Array.isArray(imported)) {
          throw new Error('Неверный формат данных');
        }

        setTechnologies(imported);
        setStatus(`Импортировано ${imported.length} технологий`);
        setTimeout(() => setStatus(''), 3000);
      } catch (error) {
        setStatus('Ошибка импорта: неверный формат файла');
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('technologies', JSON.stringify(technologies));
      setStatus('Данные сохранены в localStorage');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Ошибка сохранения данных');
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('technologies');
      if (saved) {
        const parsed = JSON.parse(saved);
        setTechnologies(parsed);
        setStatus('Данные загружены из localStorage');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {
      setStatus('Ошибка загрузки данных из localStorage');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            setTechnologies(imported);
            setStatus(`Импортировано ${imported.length} технологий`);
            setTimeout(() => setStatus(''), 3000);
          }
        } catch (error) {
          setStatus('Ошибка импорта: неверный формат файла');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Импорт и экспорт данных
      </Typography>

      {status && (
        <Alert 
          severity={status.includes('Ошибка') ? 'error' : 'success'} 
          sx={{ 
            mb: 2,
            bgcolor: themeMode === 'dark' ? 'background.paper' : undefined
          }}
        >
          {status}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={exportToJSON}
          disabled={technologies.length === 0}
        >
          Экспорт в JSON
        </Button>

        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadIcon />}
        >
          Импорт из JSON
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            style={{ display: 'none' }}
          />
        </Button>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
          onClick={saveToLocalStorage}
          disabled={technologies.length === 0}
        >
          Сохранить в localStorage
        </Button>

        <Button
          variant="outlined"
          onClick={loadFromLocalStorage}
        >
          Загрузить из localStorage
        </Button>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 6,
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : (themeMode === 'dark' ? 'grey.700' : 'grey.300'),
          bgcolor: isDragging 
            ? (themeMode === 'dark' ? 'action.hover' : 'action.hover') 
            : (themeMode === 'dark' ? 'background.paper' : 'background.paper'),
          transition: 'all 0.2s ease',
          textAlign: 'center',
          cursor: 'pointer',
          mb: 3
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        <CloudUploadIcon 
          sx={{ 
            fontSize: 48, 
            color: isDragging ? 'primary.main' : (themeMode === 'dark' ? 'grey.600' : 'grey.400'),
            mb: 2 
          }} 
        />
        <Typography 
          variant="h6" 
          color={isDragging ? 'primary.main' : (themeMode === 'dark' ? 'text.secondary' : 'text.secondary')}
          gutterBottom
        >
          {isDragging ? 'Отпустите файл' : 'Перетащите JSON-файл сюда'}
        </Typography>
        <Typography 
          variant="body2" 
          color={themeMode === 'dark' ? 'text.secondary' : 'text.secondary'}
        >
          или кликните для выбора файла
        </Typography>
      </Paper>

      {technologies.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Текущие данные ({technologies.length} технологий)
            </Typography>
            <List sx={{ maxHeight: 300, overflow: 'auto' }}>
              {technologies.slice(0, 10).map((tech) => (
                <ListItem 
                  key={tech.id}
                  sx={{ 
                    borderBottom: 1, 
                    borderColor: themeMode === 'dark' ? 'divider' : 'grey.100',
                    '&:last-child': { borderBottom: 0 }
                  }}
                >
                  <ListItemText
                    primary={tech.title}
                    secondary={`${tech.category} • ${tech.status === 'completed' ? 'Завершено' : tech.status === 'in-progress' ? 'В процессе' : 'Не начато'}`}
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              ))}
              {technologies.length > 10 && (
                <ListItem>
                  <Typography variant="body2" color="text.secondary">
                    и еще {technologies.length - 10} технологий...
                  </Typography>
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

export default DataImportExport;
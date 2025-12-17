import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  ResetTv as ResetIcon, 
  Save as SaveIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon
} from '@mui/icons-material';
import DataImportExport from '../components/DataImportExport';
import AccessibleForm from '../components/AccessibleForm';

function SettingsPage({ 
  technologies, 
  setTechnologies, 
  onResetStatuses, 
  themeMode,
  toggleTheme 
}) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Настройки приложения
      </Typography>

      {/* Управление темой */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PaletteIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6">
              Внешний вид
            </Typography>
          </Box>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            Выбранная тема сохраняется автоматически и будет использоваться при следующем посещении
          </Alert>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LightModeIcon sx={{ mr: 1, color: themeMode === 'light' ? 'warning.main' : 'inherit' }} />
              <Typography>Светлая тема</Typography>
            </Box>
            
            <FormControlLabel
              control={
                <Switch
                  checked={themeMode === 'dark'}
                  onChange={toggleTheme}
                  color="primary"
                />
              }
              label=""
            />
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>Темная тема</Typography>
              <DarkModeIcon sx={{ ml: 1, color: themeMode === 'dark' ? 'primary.main' : 'inherit' }} />
            </Box>
          </Box>

          <List sx={{ mt: 2 }}>
            <ListItem>
              <ListItemIcon>
                <LightModeIcon color={themeMode === 'light' ? 'warning' : 'disabled'} />
              </ListItemIcon>
              <ListItemText 
                primary="Светлая тема" 
                secondary="Рекомендуется для работы при дневном свете" 
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DarkModeIcon color={themeMode === 'dark' ? 'primary' : 'disabled'} />
              </ListItemIcon>
              <ListItemText 
                primary="Темная тема" 
                secondary="Уменьшает нагрузку на глаза в темное время суток" 
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Управление данными */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StorageIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h6">
              Управление данными
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<ResetIcon />}
              onClick={onResetStatuses}
              color="warning"
            >
              Сбросить все статусы
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={() => {
                localStorage.setItem('technologies', JSON.stringify(technologies));
                alert('Данные сохранены в localStorage');
              }}
            >
              Сохранить данные
            </Button>
          </Box>

          <Alert severity="warning" sx={{ mb: 2 }}>
            Сброс статусов приведет все технологии в состояние "Не начато". Это действие нельзя отменить.
          </Alert>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Импорт и экспорт данных
          </Typography>
          <DataImportExport
            technologies={technologies}
            setTechnologies={setTechnologies}
          />
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Тестирование доступных форм
      </Typography>
      
      <Card>
        <CardContent>
          <AccessibleForm />
        </CardContent>
      </Card>
    </Box>
  );
}

export default SettingsPage;
import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Chip,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  CheckCircle as CheckCircleIcon,
  Download as DownloadIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import CustomTechCard from '../components/CustomTechCard';
import TechnologyForm from '../components/TechnologyForm';
import DataImportExport from '../components/DataImportExport';

function HomePage({ 
  technologies, 
  onStatusChange, 
  onAddTechnology,
  onMarkAllAsCompleted,
  // eslint-disable-next-line no-unused-vars
  onExportData,
  themeMode,
  toggleTheme 
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [selectedTechIds, setSelectedTechIds] = useState([]);

  const filteredTechnologies = technologies.filter(tech => {
    const matchesSearch = tech.title.toLowerCase().includes(search.toLowerCase()) ||
                         tech.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tech.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || tech.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length
  };

  const categories = [...new Set(technologies.map(t => t.category))];

  const handleSaveTechnology = (newTech) => {
    onAddTechnology(newTech);
    setShowAddForm(false);
  };

  const handleSelectTech = (id) => {
    setSelectedTechIds(prev => 
      prev.includes(id) 
        ? prev.filter(techId => techId !== id)
        : [...prev, id]
    );
  };

  const handleMassComplete = () => {
    selectedTechIds.forEach(id => {
      onStatusChange(id, 'completed');
    });
    setSelectedTechIds([]);
  };

  const handleMassDelete = () => {
    // Здесь будет логика удаления технологий
    // setTechnologies(prev => prev.filter(tech => !selectedTechIds.includes(tech.id)));
    setSelectedTechIds([]);
  };

  return (
    <Box className="fade-in">
      {/* Заголовок с переключателем темы */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Технологический трекер
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Практики 25-26: Формы, Material-UI и доступность
          </Typography>
        </Box>
        <Tooltip title={`Переключить на ${themeMode === 'light' ? 'темную' : 'светлую'} тему`}>
          <IconButton onClick={toggleTheme} color="primary" size="large">
            {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Быстрые действия */}
      <Card sx={{ mb: 4, bgcolor: themeMode === 'dark' ? 'background.paper' : 'background.default' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Быстрые действия
            </Typography>
            {selectedTechIds.length > 0 && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  startIcon={<CheckCircleIcon />}
                  onClick={handleMassComplete}
                >
                  Завершить выбранные ({selectedTechIds.length})
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={handleMassDelete}
                >
                  Удалить
                </Button>
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<CheckCircleIcon />}
              onClick={onMarkAllAsCompleted}
              sx={{ bgcolor: 'success.main' }}
            >
              Отметить все как выполненные
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setStatusFilter('not-started')}
            >
              Показать не начатые
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => setShowImportExport(true)}
            >
              Импорт/Экспорт
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowAddForm(true)}
            >
              Добавить технологию
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Статистика */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Всего технологий
              </Typography>
              <Typography variant="h3" color="primary.main">
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Выполнено
              </Typography>
              <Typography variant="h3" color="success.main">
                {stats.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                В процессе
              </Typography>
              <Typography variant="h3" color="warning.main">
                {stats.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ textAlign: 'center', bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Не начато
              </Typography>
              <Typography variant="h3" color="info.main">
                {stats.notStarted}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Поиск и фильтры */}
      <Card sx={{ mb: 4, bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder="Найти по названию или описанию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flexGrow: 1, minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Найдено:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {filteredTechnologies.length}
              </Typography>
            </Box>
          </Box>

          {/* Фильтр по статусу */}
          <Typography variant="subtitle2" gutterBottom>
            Фильтр по статусу
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            <Chip
              label={`Все (${stats.total})`}
              color={statusFilter === 'all' ? 'primary' : 'default'}
              onClick={() => setStatusFilter('all')}
              variant={statusFilter === 'all' ? 'filled' : 'outlined'}
            />
            <Chip
              label={`Выполнено (${stats.completed})`}
              color={statusFilter === 'completed' ? 'success' : 'default'}
              onClick={() => setStatusFilter('completed')}
              variant={statusFilter === 'completed' ? 'filled' : 'outlined'}
            />
            <Chip
              label={`В процессе (${stats.inProgress})`}
              color={statusFilter === 'in-progress' ? 'warning' : 'default'}
              onClick={() => setStatusFilter('in-progress')}
              variant={statusFilter === 'in-progress' ? 'filled' : 'outlined'}
            />
            <Chip
              label={`Не начато (${stats.notStarted})`}
              color={statusFilter === 'not-started' ? 'default' : 'default'}
              onClick={() => setStatusFilter('not-started')}
              variant={statusFilter === 'not-started' ? 'filled' : 'outlined'}
            />
          </Box>

          {/* Фильтр по категории */}
          <Typography variant="subtitle2" gutterBottom>
            Фильтр по категории
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="Все категории"
              color={categoryFilter === 'all' ? 'primary' : 'default'}
              onClick={() => setCategoryFilter('all')}
              variant={categoryFilter === 'all' ? 'filled' : 'outlined'}
            />
            {categories.map(category => (
              <Chip
                key={category}
                label={category}
                color={categoryFilter === category ? 'primary' : 'default'}
                onClick={() => setCategoryFilter(category)}
                variant={categoryFilter === category ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Список технологий */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Список технологий ({filteredTechnologies.length} из {technologies.length})
      </Typography>

      {filteredTechnologies.length > 0 ? (
        <Grid container spacing={3}>
          {filteredTechnologies.map((tech) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tech.id}>
              <CustomTechCard
                technology={tech}
                onStatusChange={onStatusChange}
                isSelected={selectedTechIds.includes(tech.id)}
                onSelect={() => handleSelectTech(tech.id)}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Технологии не найдены
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Попробуйте изменить критерии поиска или добавьте новую технологию
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Диалог добавления технологии */}
      <Dialog 
        open={showAddForm} 
        onClose={() => setShowAddForm(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Добавление новой технологии</DialogTitle>
        <DialogContent>
          <TechnologyForm
            onSave={handleSaveTechnology}
            onCancel={() => setShowAddForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Диалог импорта/экспорта */}
      <Dialog 
        open={showImportExport} 
        onClose={() => setShowImportExport(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Импорт и экспорт данных</DialogTitle>
        <DialogContent>
          <DataImportExport
            technologies={technologies}
            setTechnologies={onAddTechnology ? (techs) => {
              // Здесь нужно добавить логику для обновления технологий
              console.log('Импортированные технологии:', techs);
              setShowImportExport(false);
            } : undefined}
            themeMode={themeMode}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default HomePage;
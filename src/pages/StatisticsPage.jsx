import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp as TrendingUpIcon,
  Timeline as TimelineIcon,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import Dashboard from '../components/Dashboard';

function StatisticsPage({ technologies, themeMode, toggleTheme }) {
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length
  };

  const completionPercentage = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const categoryStats = technologies.reduce((acc, tech) => {
    acc[tech.category] = (acc[tech.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box className="fade-in">
      {/* Заголовок с переключателем темы */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Статистика прогресса
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Анализ изучения технологий
          </Typography>
        </Box>
        <Tooltip title={`Переключить на ${themeMode === 'light' ? 'темную' : 'светлую'} тему`}>
          <IconButton onClick={toggleTheme} color="primary" size="large">
            {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Основная статистика */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            textAlign: 'center',
            bgcolor: themeMode === 'dark' ? 'background.paper' : undefined,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent>
              <BarChartIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography color="text.secondary" gutterBottom>
                Всего технологий
              </Typography>
              <Typography variant="h3">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            textAlign: 'center',
            bgcolor: themeMode === 'dark' ? 'background.paper' : undefined,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent>
              <TrendingUpIcon sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
              <Typography color="text.secondary" gutterBottom>
                Выполнено
              </Typography>
              <Typography variant="h3" color="success.main">
                {stats.completed}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {completionPercentage}% от общего
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            textAlign: 'center',
            bgcolor: themeMode === 'dark' ? 'background.paper' : undefined,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent>
              <TimelineIcon sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
              <Typography color="text.secondary" gutterBottom>
                В процессе
              </Typography>
              <Typography variant="h3" color="warning.main">
                {stats.inProgress}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0}% от общего
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            textAlign: 'center',
            bgcolor: themeMode === 'dark' ? 'background.paper' : undefined,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'translateY(-4px)' }
          }}>
            <CardContent>
              <PieChartIcon sx={{ fontSize: 40, color: 'info.main', mb: 2 }} />
              <Typography color="text.secondary" gutterBottom>
                Не начато
              </Typography>
              <Typography variant="h3" color="info.main">
                {stats.notStarted}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stats.total > 0 ? Math.round((stats.notStarted / stats.total) * 100) : 0}% от общего
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Прогресс */}
      <Card sx={{ mb: 4, bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Общий прогресс изучения
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <LinearProgress
                variant="determinate"
                value={completionPercentage}
                sx={{ 
                  height: 12, 
                  borderRadius: 6,
                  bgcolor: themeMode === 'dark' ? 'grey.800' : 'grey.200'
                }}
              />
            </Box>
            <Typography variant="h4" fontWeight="bold">
              {completionPercentage}%
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {completionPercentage === 100 
              ? '🎉 Все технологии изучены!' 
              : completionPercentage > 70 
                ? 'Хороший прогресс! Продолжайте в том же духе!' 
                : completionPercentage > 30 
                  ? 'Неплохо! Еще немного усилий!' 
                  : 'Начинаем изучение! Вперед к знаниям!'}
          </Typography>
        </CardContent>
      </Card>

      {/* Статистика по категориям */}
      <Card sx={{ mb: 4, bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Распределение по категориям
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(categoryStats).map(([category, count]) => {
              const percentage = Math.round((count / stats.total) * 100);
              return (
                <Grid item xs={12} key={category}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {category}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {count} ({percentage}%)
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: themeMode === 'dark' ? 'grey.800' : 'grey.200'
                      }}
                    />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>

      {/* Дашборд из Material-UI */}
      <Paper sx={{ p: 3, bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Детальная аналитика
        </Typography>
        <Dashboard technologies={technologies} themeMode={themeMode} />
      </Paper>
    </Box>
  );
}

export default StatisticsPage;
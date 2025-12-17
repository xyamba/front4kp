import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

function TabPanel({ children, value, index, themeMode }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box sx={{ 
          p: 3, 
          bgcolor: themeMode === 'dark' ? 'background.default' : 'background.default'
        }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Dashboard({ technologies, themeMode }) {
  const [tabValue, setTabValue] = React.useState(0);
  const [notificationCount] = React.useState(3);
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();

  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length
  };

  const completionPercentage = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      bgcolor: themeMode === 'dark' ? 'background.default' : 'background.default'
    }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Панель управления
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        bgcolor: themeMode === 'dark' ? 'background.paper' : 'background.paper'
      }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Обзор" />
          <Tab label="Статистика" />
          <Tab label="Прогресс" />
        </Tabs>
      </Box>

      {/* Вкладка Обзор */}
      <TabPanel value={tabValue} index={0} themeMode={themeMode}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    Завершено
                  </Typography>
                </Box>
                <Typography variant="h4">{stats.completed}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ScheduleIcon color="warning" sx={{ mr: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    В процессе
                  </Typography>
                </Box>
                <Typography variant="h4">{stats.inProgress}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon color="info" sx={{ mr: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    Не начато
                  </Typography>
                </Box>
                <Typography variant="h4">{stats.notStarted}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
              <CardContent>
                <Typography color="text.secondary" variant="body2" gutterBottom>
                  Общий прогресс
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {completionPercentage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    bgcolor: themeMode === 'dark' ? 'grey.800' : 'grey.200'
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Вкладка Статистика */}
      <TabPanel value={tabValue} index={1} themeMode={themeMode}>
        <Typography variant="h4" gutterBottom>
          Детальная статистика
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Распределение по статусам
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Завершено" 
                      secondary={`${stats.completed} технологий (${completionPercentage}%)`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="В процессе" 
                      secondary={`${stats.inProgress} технологий (${stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0}%)`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Не начато" 
                      secondary={`${stats.notStarted} технологий (${stats.total > 0 ? Math.round((stats.notStarted / stats.total) * 100) : 0}%)`}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Сложность изучения
                </Typography>
                <List>
                  {['beginner', 'intermediate', 'advanced'].map(level => {
                    const count = technologies.filter(t => t.difficulty === level).length;
                    return (
                      <ListItem key={level}>
                        <ListItemText 
                          primary={level === 'beginner' ? 'Начальный' : level === 'intermediate' ? 'Средний' : 'Продвинутый'}
                          secondary={`${count} технологий`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Вкладка Прогресс */}
      <TabPanel value={tabValue} index={2} themeMode={themeMode}>
        <Typography variant="h4" gutterBottom>
          Текущий прогресс
        </Typography>
        <Grid container spacing={3}>
          {technologies.filter(t => t.status === 'in-progress').map(tech => (
            <Grid item xs={12} md={6} key={tech.id}>
              <Card sx={{ bgcolor: themeMode === 'dark' ? 'background.paper' : undefined }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {tech.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    {tech.category} • {tech.difficulty}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Прогресс: {tech.progress || 0}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={tech.progress || 0}
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: themeMode === 'dark' ? 'grey.800' : 'grey.200'
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
}

export default Dashboard;
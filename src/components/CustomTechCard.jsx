import React from 'react';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Chip, 
  Box, 
  LinearProgress 
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon
} from '@mui/icons-material';

function CustomTechCard({ technology, onStatusChange }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      frontend: 'primary',
      backend: 'secondary',
      database: 'success',
      styling: 'warning',
      'state-management': 'error',
      language: 'info',
      tools: 'default'
    };
    return colors[category] || 'default';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Нет дедлайна';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card className="tech-card fade-in">
      <CardContent className="tech-card-content">
        <Box className="tech-card-header">
          <Box>
            <Typography variant="h6" className="tech-card-title">
              {technology.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
              {formatDate(technology.deadline)}
            </Typography>
          </Box>
          <Chip
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
            icon={technology.status === 'completed' ? <CheckCircleIcon /> : <ScheduleIcon />}
          />
        </Box>

        <Typography variant="body2" className="tech-card-description">
          {technology.description}
        </Typography>

        {technology.status === 'in-progress' && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                Прогресс
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                {technology.progress}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={technology.progress} 
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>
        )}

        <Box className="tech-card-tags">
          <Chip
            label={technology.category}
            color={getCategoryColor(technology.category)}
            variant="outlined"
            size="small"
          />
          <Chip
            label={technology.difficulty}
            color="default"
            size="small"
          />
        </Box>
      </CardContent>

      <CardActions className="tech-card-actions">
        {technology.status !== 'completed' && (
          <Button
            size="small"
            variant="contained"
            fullWidth
            onClick={() => onStatusChange(technology.id, 'completed')}
            startIcon={<CheckCircleIcon />}
          >
            Завершить
          </Button>
        )}
        <Button
          size="small"
          variant={technology.status === 'in-progress' ? 'outlined' : 'contained'}
          color={technology.status === 'in-progress' ? 'warning' : 'primary'}
          fullWidth
          onClick={() => onStatusChange(technology.id,
            technology.status === 'in-progress' ? 'not-started' : 'in-progress')}
          startIcon={technology.status === 'in-progress' ? <ScheduleIcon /> : <SchoolIcon />}
        >
          {technology.status === 'in-progress' ? 'Приостановить' : 'Начать изучение'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default CustomTechCard;
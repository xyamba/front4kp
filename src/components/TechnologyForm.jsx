/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  Paper,
  FormHelperText
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

function TechnologyForm({ onSave, onCancel, initialData = {}, themeMode }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'frontend',
    difficulty: initialData.difficulty || 'beginner',
    deadline: initialData.deadline || '',
    resources: initialData.resources || ['']
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Название технологии обязательно';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Название должно содержать минимум 2 символа';
    } else if (formData.title.trim().length > 50) {
      newErrors.title = 'Название не должно превышать 50 символов';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание технологии обязательно';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Описание должно содержать минимум 10 символов';
    }

    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    formData.resources.forEach((resource, index) => {
      if (resource && !isValidUrl(resource)) {
        newErrors[`resource_${index}`] = 'Введите корректный URL';
      }
    });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData(prev => ({
      ...prev,
      resources: newResources
    }));
  };

  const addResourceField = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, '']
    }));
  };

  const removeResourceField = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        resources: newResources
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      const cleanedData = {
        ...formData,
        resources: formData.resources.filter(resource => resource.trim() !== '')
      };
      onSave(cleanedData);
    }
  };

  return (
    <Paper sx={{ 
      p: 3, 
      bgcolor: themeMode === 'dark' ? 'background.paper' : 'background.default'
    }}>
      <Typography variant="h5" gutterBottom color={themeMode === 'dark' ? 'text.primary' : 'text.primary'}>
        {initialData.title ? 'Редактирование технологии' : 'Добавление новой технологии'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Название технологии"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          margin="normal"
          required
          sx={{
            '& .MuiInputBase-input': {
              color: themeMode === 'dark' ? 'text.primary' : 'text.primary',
            },
          }}
        />

        <TextField
          fullWidth
          label="Описание"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          margin="normal"
          multiline
          rows={4}
          required
          sx={{
            '& .MuiInputBase-input': {
              color: themeMode === 'dark' ? 'text.primary' : 'text.primary',
            },
          }}
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Категория</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              label="Категория"
              sx={{
                '& .MuiSelect-select': {
                  color: themeMode === 'dark' ? 'text.primary' : 'text.primary',
                },
              }}
            >
              <MenuItem value="frontend">Frontend</MenuItem>
              <MenuItem value="backend">Backend</MenuItem>
              <MenuItem value="database">База данных</MenuItem>
              <MenuItem value="styling">Styling</MenuItem>
              <MenuItem value="state-management">State Management</MenuItem>
              <MenuItem value="devops">DevOps</MenuItem>
              <MenuItem value="other">Другое</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Сложность</InputLabel>
            <Select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              label="Сложность"
              sx={{
                '& .MuiSelect-select': {
                  color: themeMode === 'dark' ? 'text.primary' : 'text.primary',
                },
              }}
            >
              <MenuItem value="beginner">Начальный</MenuItem>
              <MenuItem value="intermediate">Средний</MenuItem>
              <MenuItem value="advanced">Продвинутый</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          fullWidth
          label="Дедлайн (необязательно)"
          name="deadline"
          type="date"
          value={formData.deadline}
          onChange={handleChange}
          error={!!errors.deadline}
          helperText={errors.deadline}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiInputBase-input': {
              color: themeMode === 'dark' ? 'text.primary' : 'text.primary',
            },
          }}
        />

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom color={themeMode === 'dark' ? 'text.primary' : 'text.primary'}>
            Ресурсы для изучения
          </Typography>
          
          {formData.resources.map((resource, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                type="url"
                value={resource}
                onChange={(e) => handleResourceChange(index, e.target.value)}
                placeholder="https://example.com"
                error={!!errors[`resource_${index}`]}
                helperText={errors[`resource_${index}`]}
                sx={{
                  '& .MuiInputBase-input': {
                    color: themeMode === 'dark' ? 'text.primary' : 'text.primary',
                  },
                }}
              />
              {formData.resources.length > 1 && (
                <IconButton
                  onClick={() => removeResourceField(index)}
                  color="error"
                  sx={{ mt: 0.5 }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          
          <Button
            startIcon={<AddIcon />}
            onClick={addResourceField}
            variant="outlined"
            sx={{ mt: 1 }}
          >
            Добавить ресурс
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!isFormValid}
            fullWidth
          >
            Сохранить
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={onCancel}
            fullWidth
          >
            Отмена
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default TechnologyForm;
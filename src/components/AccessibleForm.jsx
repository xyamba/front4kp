import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  Paper
} from '@mui/material';

function AccessibleForm({ themeMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      await new Promise(resolve => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setSubmitSuccess(true);

      setFormData({
        name: '',
        email: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  return (
    <Paper sx={{ 
      p: 3, 
      bgcolor: themeMode === 'dark' ? 'background.paper' : 'background.default'
    }}>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {isSubmitting && 'Отправка формы...'}
        {submitSuccess && 'Форма успешно отправлена!'}
      </div>

      <Typography variant="h5" gutterBottom color={themeMode === 'dark' ? 'text.primary' : 'text.primary'}>
        Контактная форма (доступная)
      </Typography>

      {submitSuccess && (
        <Alert severity="success" sx={{ mb: 2 }} role="alert">
          Спасибо! Ваше сообщение успешно отправлено.
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Ваше имя"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          sx={{
            '& .MuiInputBase-input': {
              color: themeMode === 'dark' ? 'text.primary' : 'text.primary',
            },
          }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          sx={{
            '& .MuiInputBase-input': {
              color: themeMode === 'dark' ? 'text.primary' : 'text.primary',
            },
          }}
        />

        <TextField
          fullWidth
          label="Сообщение"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={!!errors.message}
          helperText={errors.message}
          margin="normal"
          multiline
          rows={5}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          sx={{
            '& .MuiInputBase-input': {
              color: themeMode === 'dark' ? 'text.primary' : 'text.primary',
            },
          }}
        />

        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            fullWidth
          >
            {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default AccessibleForm;
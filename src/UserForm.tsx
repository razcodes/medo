import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormLabel, CircularProgress, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useResults from './useResults';

const MOCK_URL = 'https://mocked-endpoint.com/api/number';

interface FormState {
  name: string;
  email: string;
  dropdown: string;
  age: string;
  gender: string;
}

const UserForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    dropdown: '',
    age: '',
    gender: '',
  });

  const { getResultsCount, loading, error } = useResults();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const count = await getResultsCount();
    navigate('/results', { state: { count } });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        User Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="dropdown-label">Dropdown</InputLabel>
          <Select
            labelId="dropdown-label"
            name="dropdown"
            value={form.dropdown}
            label="Dropdown"
            onChange={handleChange}
          >
            <MenuItem value="option1">Cancer</MenuItem>
            <MenuItem value="option2">Diabetes</MenuItem>
            <MenuItem value="option3">Heart Disease</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl component="fieldset" margin="normal" required>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
        </Button>
      </form>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error.message || 'Something went wrong'}
        </Typography>
      )}
    </Box>
  );
};

export default UserForm; 
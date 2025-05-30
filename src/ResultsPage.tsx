import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import useEmail from './useEmail';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sendEmail, loading: emailLoading, error: emailError } = useEmail();

  const count = location.state?.count ?? 0;
  const formData = location.state?.formData;
  const results = location.state?.results;

  const handleSeeResults = async () => {
    try {
      if (formData && results) {
        await sendEmail({
          from_name: formData.name,
          to_name: formData.name,
          from_email: formData.email,
          message: `Thank you for your submission!\n\nYour Details:\nAge: ${formData.age}\nGender: ${formData.gender}\nCondition: ${formData.dropdown}`,
          results,
        });
      }
      navigate('/data', { state: { count } });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        We found {count} results. Want to see them?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSeeResults}
        disabled={emailLoading}
      >
        {emailLoading ? <CircularProgress size={24} color="inherit" /> : 'See Results'}
      </Button>
      {emailError && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error sending email: {emailError.message || 'Something went wrong'}
        </Typography>
      )}
    </Box>
  );
};

export default ResultsPage; 
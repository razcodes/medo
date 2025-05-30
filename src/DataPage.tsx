import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import useResults from './useResults';

const DataPage: React.FC = () => {
  const location = useLocation();
  const { getResultsData } = useResults();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getResultsData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [getResultsData]);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Results Data
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {data.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default DataPage; 
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <CircularProgress />
    </div>
  );
};

export default Loading;

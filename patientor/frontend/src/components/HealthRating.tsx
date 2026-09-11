import FavoriteIcon from '@mui/icons-material/Favorite';
type HealthCheckRating = 0 | 1 | 2 | 3;

const HealthRating = (rating: HealthCheckRating) => {
    if (rating === 0) return <FavoriteIcon color='success' />;
    if (rating === 1) return <FavoriteIcon sx={{ color: 'yellow' }} />;
    return null;
};

export default HealthRating;
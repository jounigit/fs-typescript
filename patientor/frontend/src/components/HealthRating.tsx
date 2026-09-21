import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

type HealthCheckRating = 0 | 1 | 2 | 3;

const HealthRating = (rating: HealthCheckRating) => {
    if (rating === 0) return <FavoriteIcon color='success' />;
    if (rating === 1) return <FavoriteIcon sx={{ color: 'yellow' }} />;
    if (rating === 2) return <FavoriteIcon sx={{ color: 'orange'}} />;
    if (rating === 3) return <HeartBrokenIcon sx={{ color: 'red'}} />;
    return null;
};

export default HealthRating;
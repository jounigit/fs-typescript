import { Rating, Tooltip, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';

import { styled } from '@mui/material/styles';

type BarProps = {
  rating: number;
  showText: boolean;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  }
});

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText }: BarProps) => {
  console.log('RATE:: ', rating);
  return (
    <div className="health-bar">
      <Tooltip
        title={showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : <p>not rated</p>}
      >
        <Typography sx={{ display: 'inline-block', cursor: 'pointer'}}>
          <StyledRating
            readOnly
                value={4 - rating}
                max={4}
                icon={<Favorite fontSize="inherit" />}
           />
        </Typography>
      </Tooltip>
  
    </div>
  );
};

export default HealthRatingBar;

// {<StyledRating
//                 readOnly
//                 value={4 - rating}
//                 max={4}
//                 icon={<Favorite fontSize="inherit" />}
//               />}
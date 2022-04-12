import { CardContent, CardMedia, Typography } from '@mui/material';
import { Box, Card } from '@mui/material/';
import PropTypes from 'prop-types';
import React from 'react';
import {useHistory} from 'react-router';
import './Toy.scss';


Toy.propTypes = {
    toy: PropTypes.object,
};

function Toy({ toy }) {

    const history = useHistory();

    const thumbnailUrl = toy.coverImage ? toy.coverImage : 'https://via.placeholder.com/250';

    const truncate = (input) => {
        if (input.length > 30) {
            return input.substring(0, 20) + '...';
        } else {
            return input;
        }
    }

    const handleClick = () => {
        // Navigate to detail page: /toy/:toyId
        history.push(`/toys/${toy.id}`)
    }

    return (
        <Box onClick={handleClick} padding={1}>
            <Card sx={{ maxWidth: 700 }}>
                <div className='ShineEffect'>
                    <CardMedia
                        component="img"
                        height="350"
                        image={thumbnailUrl}
                        alt={toy.name}
                    />
                </div>

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {truncate(toy.name)}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Toy;
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid, Typography, Box } from '@mui/material/';
import { CardMedia } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
    subtitle: {
        color: 'grey',
        fontSize: '13px !important'
    },

}))



ContestDetail.propTypes = {
    contest: PropTypes.object,
};

function ContestDetail({ contest }) {
    // Style MUI
    const classes = useStyles();

    const history = useHistory();

    const handleClick = () => {
        // Navigate to detail page: /toy/:toyId
        history.push(`/contest/${contest.id}`)
    }

    return (
        <Card onClick={handleClick} sx={{ padding: '10px', borderTop: '1px solid #ddd' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography>{contest.title}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100%', alignItems: 'center' }}>
                        <Typography className={classes.subtitle}>{contest.slogan}</Typography>
                        <Typography className={classes.subtitle}>{contest.startDate}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <CardMedia
                        sx={{ padding: '5px', borderRadius: '10px' }}
                        component="img"
                        height="100"
                        width="100%"
                        image={contest.coverImage}
                        alt="green iguana"
                    />
                </Grid>
            </Grid>

        </Card>
    );
}

export default ContestDetail;
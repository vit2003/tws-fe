import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material/';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

ToysSkeletonList.propTypes = {
    length: PropTypes.number,
};

ToysSkeletonList.defaultProps = {
    length: 9,
}

function ToysSkeletonList({ length }) {
    return (
        <Box>
            <Grid container >
                {Array.from(new Array(length)).map((x, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                        <Box padding={1}>
                            <Skeleton variant="rectangular" width="100%" height={118} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ToysSkeletonList;
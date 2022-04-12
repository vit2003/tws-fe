import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material/';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

PostSkeleton.propTypes = {
    length: PropTypes.number,
};
PostSkeleton.defaultProps = {
    length: 9,
}
function PostSkeleton({length}) {
    return (
        <Box>
            <Grid container >
                {Array.from(new Array(length)).map((x, index) => (
                    <Grid key={index} item xs={12} sm={12} md={12} lg={12}>
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

export default PostSkeleton;
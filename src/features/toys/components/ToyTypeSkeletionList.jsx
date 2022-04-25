import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import React from 'react';
ToyTypeSkeletionList.propTypes = {
    length: PropTypes.number,
};
ToyTypeSkeletionList.defaultProps = {
    length: 9,
}


function ToyTypeSkeletionList({ length }) {
    return (
        <Box>
            <Grid container >
                {Array.from(new Array(length)).map((x, index) => (
                    <Grid key={index} item xs={12}>
                        <Box padding={1}>
                            <Skeleton animation="wave" />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ToyTypeSkeletionList;
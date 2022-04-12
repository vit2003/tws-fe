import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@mui/material/Skeleton';
import { Grid,Box } from '@mui/material';
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
import { Box, Typography } from '@mui/material/';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Toy from './Toy';

ToyList.propTypes = {
    data: PropTypes.array,
};

ToyList.defaultProps = {
    data: [],
}

function ToyList({ data }) {
    return (
        <Box>
            {data.length <= 0 ?
                <Box sx={{ p: 15 }}>
                    <Typography sx={{ textAlign: 'center' }}>Opps, have no toys here</Typography>
                </Box>

                : <Grid container >
                    {data.map((toy) => (
                        toy ?
                            <Grid key={toy.id} item xs={12} sm={6} md={4} lg={4}>
                                <Toy toy={toy} />
                            </Grid>
                            : <Typography>Opps</Typography>
                    ))}
                </Grid>
            }
        </Box>
    );
}

export default ToyList;
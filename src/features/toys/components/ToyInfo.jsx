import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material/';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';


ToyInfo.propTypes = {
    toy: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: '18px'
    },
    name: {
        fontWeight: '400 !important'
    },
    typeName: {
        margin: '10px 0 !important',

    },
    brandName: {
        margin: '10px 0 !important'
    },
    description: {
        fontStyle: 'italic !important'
    }
}))

function ToyInfo({ toy = {} }) {

    const classes = useStyles();

    const { name, typeName, brandName, description, imagesOfToy } = toy;

    return (
        <Box className={classes.root}>
            <Typography component="h1" variant='h4' className={classes.name}>Toy Name: {name}</Typography>
            <Typography variant='body2' className={classes.typeName}>Type: {typeName}</Typography>
            <Typography variant='body2' className={classes.brandName}>Brand: {brandName}</Typography>
            <Typography variant='body2' className={classes.description}>About: {description}</Typography>
        </Box>
    );
}

export default ToyInfo;
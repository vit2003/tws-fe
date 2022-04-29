import { Typography } from '@mui/material';
import { Box } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';


ToyInfo.propTypes = {
    toy: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: '18px'
    },
    name: {
        fontWeight: '400 !important',
        fontSize: '3rem !important',
        marginBottom: '50px !important'
    },
    typeName: {
        margin: '10px 0 !important',
        fontSize: '1.3rem !important',
        marginBottom: '20px !important'

    },
    brandName: {
        margin: '10px 0 !important',
        fontSize: '1.3rem !important',
        marginBottom: '20px !important'
    },
    description: {
        fontStyle: 'italic !important',
        fontSize: '1.3rem !important',
        marginBottom: '20px !important'
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
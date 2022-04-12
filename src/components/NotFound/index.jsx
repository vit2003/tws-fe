import { Button } from '@mui/material';
import { Box, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from './../Header/index';

NotFound.propTypes = {

};
const useStyles = makeStyles(theme => ({
    root: {

    },
    notfound: {
        // position: 'relative',
        width: '100%',
        
    },
    notFoundHeader: {
        position: 'abosolute',
        top: 0,
        left: 0,
    },
    boxcontain: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        textAlign: 'center',
        minHeight: '100vh !important',
    },
    notfoundNum: {
        fontSize: '5rem !important'
    },
    notfoundText1: {
        marginBottom: '10px !important',
    },
    notfoundText2: {
        marginBottom: '10px !important',
    }

}))


function NotFound() {
    const classes = useStyles();

    return (

        <Box className={classes.notfound} >
            <Header className={classes.notFoundHeader} />
            <Box className={classes.boxcontain}>
                <div>
                    <Typography className={classes.notfoundNum} component="h1" variant='h4'>
                        404
                    </Typography >
                    <Typography className={classes.notfoundText1} variant='body2'>
                        Whoops! That page is gone
                    </Typography>
                    <Typography className={classes.notfoundText2} variant='body2'>
                        You cannot react the page at the momment, our admin has been abducted.
                    </Typography>
                    <NavLink style={{ textDecoration: 'none', }} to="/home">
                        <Button style={{ color: 'white', backgroundColor: '#db36a4' }} variant="contained">Go Back</Button>
                    </NavLink>
                </div>

            </Box>
        </Box>
    );
}

export default NotFound;
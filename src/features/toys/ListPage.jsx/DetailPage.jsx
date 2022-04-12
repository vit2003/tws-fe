import { Box, Container } from '@mui/material/';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@material-ui/core';
import Paper from '@mui/material/Paper';
import ToyThumbnails from './../components/ToyThumbnails';
import { useRouteMatch } from 'react-router-dom';
import useToyDetails from './../hooks/useToyDetails';
import ToyInfo from '../components/ToyInfo';


const useStyles = makeStyles(theme => ({
    root: {
        // margin: '20px 0'
    },
    left: {
        width: '400px',
        padding: '12px',
        borderRight: '1px solid #f3f3f3',
    },
    right: {
        flex: '1 1 0',
        padding: '12px',
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '10px'
    }
}))

function DetailPage() {

    const classes = useStyles();
    const { params: { toyId } } = useRouteMatch();

    const { toy, loading } = useToyDetails(toyId)
    if (loading) {
        return <Box>Loading</Box>
    }

    return (
        <Box>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ToyThumbnails toy={toy} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ToyInfo toy={toy} />
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}

export default DetailPage;
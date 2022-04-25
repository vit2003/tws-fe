import { Grid } from '@material-ui/core';
import { Box, Container } from '@mui/material/';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import ToyInfo from '../components/ToyInfo';
import Header from './../../../components/Header/index';
import PostSkeleton from './../../../components/PostSkeleton/PostSkeleton';
import ToyThumbnails from './../components/ToyThumbnails';
import useToyDetails from './../hooks/useToyDetails';


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




    return (
        <div>
            <Header />
            <Box sx={{ paddingTop: '80px' }}></Box>
            <Box>
                <Container>
                    <Paper elevation={0}>
                        <Grid container>
                            <Grid item className={classes.left}>
                                {loading ? <PostSkeleton length={1} /> : <ToyThumbnails toy={toy} />}
                            </Grid>
                            <Grid item className={classes.right}>
                                {loading ? <PostSkeleton length={1} /> : <ToyInfo toy={toy} />}

                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </div>

    );
}

export default DetailPage;
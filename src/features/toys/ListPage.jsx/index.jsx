import { Box } from '@mui/material/';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import toysApi from '../../../api/toysApi';
import ToyList from '../components/ToyList';
import ToysSkeletonList from '../components/ToysSkeletonList';
import ToyTypeList from '../components/ToyTypeList';
import ToyTypeSkeletionList from './../components/ToyTypeSkeletionList';

ListPage.propTypes = {

};

const useStyles = makeStyles(theme => ({
    root: {
        // margin: '20px 0'
    },
    left: {
        width: '250px'
    },
    right: {
        flex: '1 1 0'
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        marginTop: '20px',
        paddingBottom: '10px'
    }
}))

function ListPage(props) {

    const classes = useStyles();

    const [toyList, setToyList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [count, setCount] = useState(1)
    const [typeName, setTypeName] = useState(null);


    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 9,
        // typeName: 'Action Figure'
    });



    useEffect(() => {
        const fetchToys = async () => {
            try {
                if (typeName === null) {
                    const data = await toysApi.getAll(filters);
                    console.log("fix data: ", data)
                    setToyList(data.data);
                    setCount(data.count);

                } else {
                    const params = new URLSearchParams(filters);
                    const data = await toysApi.getToyByTypeName(typeName + '?' + params);
                    console.log("TypeName: ", typeName)
                    console.log("gettoybytypeName: ", data)
                    setToyList(data.data);
                    setCount(data.count);
                }
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
            setLoading(false);
        }
        fetchToys();
    }, [filters, typeName])

    const handlePageChange = (e, page) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            pageNumber: page
        }))
    }

    const handleTypeName = (newTypeName) => {
        console.log("afterClick: ", newTypeName)
        setTypeName(newTypeName);
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid className={classes.left} item>
                        <Paper>
                            {loading ? <ToyTypeSkeletionList /> : <ToyTypeList onChange={handleTypeName} />}
                        </Paper>
                    </Grid>
                    <Grid className={classes.right} item>
                        <Paper elevation={0}>
                            {loading ? <ToysSkeletonList /> : <ToyList data={toyList} />}
                            <Box className={classes.pagination}>
                                <Pagination
                                    count={Math.ceil(count / filters.pageSize)}
                                    color="secondary"
                                    page={filters.pageNumber}
                                    onChange={handlePageChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ListPage;
import { Box, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import categorysApi from '../../../api/categoryApi';
ToyTypeList.propTypes = {
    onChange: PropTypes.func,

};

const useStyles = makeStyles(theme => ({
    root: {
        padding: '16px'
    },

    menu: {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        '& > li': {
            marginTop: '8px',
            '&:hover': {
                cursor: 'pointer',
                color: 'pink',
                transition: 'all .5s'
            },
        }
    },

}))

function ToyTypeList({ onChange }) {
    const classes = useStyles();
    const [categoryList, setCategoryList] = useState([]);


    useEffect(() => {
        (async () => {
            try {
                const response = await categorysApi.getAll()
                setCategoryList(response)
            } catch (error) {
                console.log('Failed to fetch categorylist', error)
            }
        })()
    }, [])

    const handleCategoryClick = (category) => {
        onChange(category)
    }

    return (
        <Box className={classes.root}>
            <Typography sx={{ borderBottom: '1px solid grey' }} variant='subtitle1'>LIST TOY TYPE</Typography>
            <ul className={classes.menu}>
                {categoryList?.map((category, index) => (
                    <li key={index} onClick={() => handleCategoryClick(category)}>
                        <Typography variant='body2' >{category}</Typography>
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default ToyTypeList;
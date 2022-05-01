import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
    objSelected: {
        filter: 'brightness(50%)'
    },
    objUnSelected: {

    }
}))

WishList.propTypes = {
    group: PropTypes.object,
};

function WishList({ group }) {

    const classes = useStyles();

    const [object, setObject] = useState({
        ...group,
        selected: false
    })
    // HANLDE GROUP ID CHOOSE
    // let groupId = [];
    const handleClickWishList = async (id) => {
        // if (groupId.map(gid => gid === id)) return;

        setObject(prevObjec => ({
            ...prevObjec,
            selected: !prevObjec.selected
        }))
    }



    return (
        <Card>
            <CardActionArea
                onClick={() => handleClickWishList(group.id)}
                className={object.selected ? classes.objSelected : classes.objUnSelected}
            >
                <CardMedia
                    component="img"
                    height="300px"
                    image={group.coverImage}
                    alt="Paella dish"
                />
                <CardContent sx={{ height: '150px' }}>
                    <Typography variant="body2" color="text.secondary">
                        {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {group.description}
                    </Typography>
                </CardContent>

            </CardActionArea>
        </Card>
    );
}

export default WishList;
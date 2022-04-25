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
        // <Grid item xs={6} >
        <Card sx={{
            // "&:hover": {
            //   opacity: [0.9, 0.8, 0.7],
            //   cursor: "pointer",
            //   transition: "all 0.5s",
            // },
        }}>
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
                {/* <CardActions>
                      <Checkbox
                        inputProps={{ 'aria-label': 'controlled' }}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        onChange={handleChange}
                        onClick={() => handleClickWishList(group.id)}
                      />

                    </CardActions> */}
            </CardActionArea>
        </Card>
        // </Grid>
    );
}

export default WishList;
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import React from 'react';

CrawlDataUnit.propTypes = {

};

const useStyle = makeStyles(theme => ({
    root: {

    },
    cooperate: {
        fontSize: '3em !important',
        fontWeight: 'bold !important',
        textAlign: 'center',
        color: '#db36a4',
        marginBottom: ' 50px !important',

    }
}))

function CrawlDataUnit(props) {

    const classes = useStyle();

    var crawlDataUnits = [
        {
            url: 'images/crawl1.png',
        },
        {
            url: 'images/crawl2.png',
        },
        {
            url: 'images/crawl3.png',
        },

    ];

    return (
        <div>
            <Container>
                <Typography className={classes.cooperate} sx={{ fontWeight: 'bold !important', fontFamily: "Wallpoet !important", textTransform: 'uppercase', background: "-webkit-linear-gradient(#c31432, #2C5364)", WebkitBackgroundClip: "text", WebkitTextFillColor: 'transparent' }}>
                    SPONSORS
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        p: 1,
                        m: 1,
                        // bgcolor: 'background.paper',
                    }}
                >
                    {crawlDataUnits.map((unit, index) => {
                        return (
                            <img key={index} src={unit.url} alt="" />
                        )
                    })}
                </Box>
                <Box>

                </Box>
            </Container>
        </div>
    );
}

export default CrawlDataUnit;
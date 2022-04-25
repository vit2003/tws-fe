import { Box, Card, CardMedia, Grid, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Header from './../../../components/Header/index';
import './styles.scss';

KnowMore.propTypes = {

};
const useStyles = makeStyles(theme => ({

}))


function KnowMore(props) {

    // Make Styles 
    const classes = useStyles();
    const [files, setFiles] = useState("");

    return (
        <div className='knowmore'>
            <Header />
            <Box sx={{ paddingTop: '80px' }}></Box>
            <Typography className="text">
                ALL ABOUT OUR CONTEST
            </Typography>
            <Card>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Card sx={{ border: '1px solid #ddd' }}>
                            <Typography className='textFont' sx={{ textAlign: 'center', fontSize: '2rem' }}>
                                Online Contest
                            </Typography>
                            <Typography className='textFont' sx={{ textAlign: 'center', padding: '30px' }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi rerum, voluptatum, doloremque accusamus odit dolorem rem voluptatibus voluptatem molestias, iure autem quos dignissimos minima aliquam sunt. Rem in sequi, exercitationem mollitia velit aspernatur impedit temporibus magnam, commodi aperiam aliquam quo eius necessitatibus, aliquid non delectus. Distinctio omnis dignissimos recusandae nesciunt reiciendis, maxime quae consequatur velit ullam nihil beatae corrupti magnam voluptatum? Voluptatibus ducimus fugit laborum pariatur qui sint nam corporis aliquid molestiae repudiandae sit neque, dolore officia temporibus odio, ullam possimus sunt! Eos vero labore aspernatur necessitatibus similique alias fugiat, perspiciatis beatae, quaerat aperiam, maiores est sunt quod quasi?
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                image="/images/lego.jpg"
                                height="300"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                image="/images/lego.jpg"
                                height="300"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card sx={{ border: '1px solid #ddd' }}>
                            <Typography className='textFont' sx={{ textAlign: 'center', fontSize: '2rem' }}>
                                Offline Contest
                            </Typography>
                            <Typography className='textFont' sx={{ textAlign: 'center', padding: '30px' }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi rerum, voluptatum, doloremque accusamus odit dolorem rem voluptatibus voluptatem molestias, iure autem quos dignissimos minima aliquam sunt. Rem in sequi, exercitationem mollitia velit aspernatur impedit temporibus magnam, commodi aperiam aliquam quo eius necessitatibus, aliquid non delectus. Distinctio omnis dignissimos recusandae nesciunt reiciendis, maxime quae consequatur velit ullam nihil beatae corrupti magnam voluptatum? Voluptatibus ducimus fugit laborum pariatur qui sint nam corporis aliquid molestiae repudiandae sit neque, dolore officia temporibus odio, ullam possimus sunt! Eos vero labore aspernatur necessitatibus similique alias fugiat, perspiciatis beatae, quaerat aperiam, maiores est sunt quod quasi?
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                    <Grid item xs={6}>
                        <Card sx={{ border: '1px solid #ddd' }}>
                            <Typography className='textFont' sx={{ textAlign: 'center', fontSize: '2rem' }}>
                                How to join
                            </Typography>
                            <Typography className='textFont' sx={{ textAlign: 'center', padding: '30px' }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi rerum, voluptatum, doloremque accusamus odit dolorem rem voluptatibus voluptatem molestias, iure autem quos dignissimos minima aliquam sunt. Rem in sequi, exercitationem mollitia velit aspernatur impedit temporibus magnam, commodi aperiam aliquam quo eius necessitatibus, aliquid non delectus. Distinctio omnis dignissimos recusandae nesciunt reiciendis, maxime quae consequatur velit ullam nihil beatae corrupti magnam voluptatum? Voluptatibus ducimus fugit laborum pariatur qui sint nam corporis aliquid molestiae repudiandae sit neque, dolore officia temporibus odio, ullam possimus sunt! Eos vero labore aspernatur necessitatibus similique alias fugiat, perspiciatis beatae, quaerat aperiam, maiores est sunt quod quasi?
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>

                    </Grid>

                </Grid>
            </Card>

        </div>
    );
}

export default KnowMore;
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import Header from './../../components/Header/index';
import ProposalForm from './ProposalForm/ProposalForm';
import './style.scss';

ProposalToOpenContest.propTypes = {

};

function ProposalToOpenContest(props) {

    const history = useHistory();

    const handleOpenKnowMore = () => {
        // if(!AccountId) return;
        history.push(`/proposalContest/knowmore`)
        // <Redirect to="/setting/account/edit" />
    }
    const handleOpenViewAllContest = () => {
        // if(!AccountId) return;
        history.push(`/viewAllContest`)
        // <Redirect to="/setting/account/edit" />
    }


    return (
        <div className='proposal'>
            <Header />
            <Box sx={{ paddingTop: '80px' }}></Box>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Card height="300" sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h3" sx={{
                                fontSize: '2.7rem',
                                textAlign: 'center',
                                margin: '30px 0',
                                writingMode: 'vertical-rl',
                                fontFamily: "Wallpoet !important",
                                background: "-webkit-linear-gradient(#2C5364, #c31432)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: 'transparent'

                            }}>
                                REGISTER TO OPEN CONTEST
                            </Typography>
                            {/* <Button onClick={handleOpenKnowMore}>Know More</Button>
                            <Button onClick={handleOpenViewAllContest}>View All</Button> */}
                        </Card>
                    </Grid>
                    <Grid item xs={9}>
                        <Card>
                            <ProposalForm />
                        </Card>
                    </Grid>
                </Grid>
            </Container>

        </div>
    );
}

export default ProposalToOpenContest;
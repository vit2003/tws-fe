import React from 'react';
import PropTypes from 'prop-types';
import Header from './../../components/Header/index';
import { Box, Grid, Card, Typography, Button, Container } from '@mui/material';
import ProposalForm from './ProposalForm/ProposalForm';
import { useHistory } from 'react-router';
import './style.scss'

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
                    <Grid item xs={4}>
                        <Card height="300">
                            <Typography variant="h3" sx={{ textAlign: 'center', margin: '30px 0', }}>
                                REGISTER TO OPEN CONTEST
                            </Typography>
                            <Button onClick={handleOpenKnowMore}>Know More</Button>
                            <Button onClick={handleOpenViewAllContest}>View All</Button>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
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
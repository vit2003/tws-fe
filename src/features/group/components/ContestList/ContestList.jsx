import React from 'react';
import PropTypes from 'prop-types';
import ContestDetail from './../ContestDetail/ContestDetail';
import { Card, Typography } from '@mui/material/';
import { CardHeader } from '@mui/material/';

ContestList.propTypes = {
    contestList: PropTypes.array,
};

ContestList.defaultProps = {
    contestList: [],
}

function ContestList({ contestList }) {

    // console.log("contestList :", contestList)


    return (
        <Card>
            <CardHeader
                sx={{ color: '#DB36A4', fontWeight: 'bold !important' }}
                title="Top Contests"
            />
            <div>
                <>
                    {contestList.length? contestList.map((contest) => (
                        <ContestDetail key={contest.id} contest={contest} />
                    )) : <Typography>Have no contest now</Typography>}
                </>
            </div>
        </Card>

    );
}

export default ContestList;
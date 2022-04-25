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

    return (
        <Card>
            <CardHeader
                sx={{ fontWeight: 'bold !important', fontFamily: "Wallpoet !important", textTransform: 'uppercase', background: "-webkit-linear-gradient(#c31432, #2C5364)", WebkitBackgroundClip: "text", WebkitTextFillColor: 'transparent' }}
                title="Top Contests"
            />
            <div>
                <>
                    {contestList.length ? contestList.map((contest) => (
                        <ContestDetail key={contest.id} contest={contest} />
                    )) : <></>}
                </>
            </div>
        </Card>

    );
}

export default ContestList;
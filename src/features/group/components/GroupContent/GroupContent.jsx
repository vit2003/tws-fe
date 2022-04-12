import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CreatePost from './../CreatePost/index';
import PostList from './../PostList/index';
import { Grid, Container, Box, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import postApi from './../../../../api/postApi';
import PostSkeleton from './../../../../components/PostSkeleton/PostSkeleton';
import ContestList from './../ContestList/ContestList';
import eventApi from './../../../../api/eventApi';

function GroupContent(props) {

    const { id: groupId } = useParams();
    console.log(groupId);


    const [postList, setPostList] = useState([]);
    const [contestList, setContestList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const [listPost, listContest] = await Promise.all([
                    postApi.getAll(groupId),
                    eventApi.getListContestByGroup(groupId),
                ]);
                if(listPost){
                    setPostList(listPost.data)
                }if(listContest){
                    setContestList(listContest.data);
                }
                console.log("listPost: ", listPost)
                console.log("listContest: ", listContest)
                setLoading(true)
            } catch (error) {
                console.log('Failed to fetch api', error)
            }
            setLoading(false)
        })()
    }, [groupId])




    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {/* Form to create a post */}
                        <CreatePost groupId={groupId}  />

                        {/* get List post */}

                        {loading ? <PostSkeleton /> : <PostList postList={postList} />}

                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            {loading ? <PostSkeleton /> : <ContestList contestList={contestList} />}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default GroupContent;
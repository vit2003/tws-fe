import { Box, Card, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventApi from './../../../../api/eventApi';
import postApi from './../../../../api/postApi';
import PostSkeleton from './../../../../components/PostSkeleton/PostSkeleton';
import ContestList from './../ContestList/ContestList';
import CreatePost from './../CreatePost/index';
import PostList from './../PostList/index';

function GroupContent(props) {

    const { id: groupId } = useParams();
    console.log(groupId);


    const [postList, setPostList] = useState([]);
    const [contestList, setContestList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const [listPost, listContest] = await Promise.all([
                    postApi.getAll(groupId),
                    eventApi.getListContestByGroup(groupId),
                ]);
                if (listPost) {
                    setPostList(listPost.data)
                } if (listContest) {
                    setContestList(listContest.data);
                }
                // console.log("listPost: ", listPost)
                // console.log("listContest: ", listContest)
                setLoading(true)
            } catch (error) {
                console.log('Failed to fetch api', error)
            }
            setLoading(true)
        })()
    }, [groupId])




    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {/* Form to create a post */}
                        <CreatePost groupId={groupId} />

                        {/* get List post */}

                        {loading ? <PostList postList={postList} /> : <PostSkeleton />}

                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            {loading ? <ContestList contestList={contestList} /> : <PostSkeleton />}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default GroupContent;
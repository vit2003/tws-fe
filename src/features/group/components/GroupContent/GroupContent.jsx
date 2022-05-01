import { Box, Card, Container, Grid } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import eventApi from './../../../../api/eventApi';
import postApi from './../../../../api/postApi';
import PostSkeleton from './../../../../components/PostSkeleton/PostSkeleton';
import ContestList from './../ContestList/ContestList';
import CreatePost from './../CreatePost/index';
import PostDetail from './../PostDetail/index';

function GroupContent(props) {

    const { id: groupId } = useParams();

    const listInnerRef = useRef();

    const [postList, setPostList] = useState([]);
    const [contestList, setContestList] = useState([]);
    const [loading, setLoading] = useState(false);

    const [reload, setReload] = useState(false)

    const [filter, setFilter] = useState({
        PageNumber: 1,
        PageSize: 9,
    })

    // console.log("listInnerRef: ", listInnerRef.current);

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log("reached bottom");
                setFilter(prevFilter => ({
                    ...prevFilter,
                    PageSize: prevFilter.PageSize + 9
                }))
                setReload(!reload)
            }
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const [listPost, listContest] = await Promise.all([
                    postApi.getAll(groupId, filter),
                    eventApi.getListContestByGroup(groupId),
                ]);
                if (listPost) {
                    setPostList(listPost.data)
                } if (listContest) {
                    setContestList(listContest.data);
                }
                setLoading(true)
            } catch (error) {
                console.log('Failed to fetch api', error)
            }
            setLoading(true)
        })()
    }, [groupId, reload])




    return (
        <Box sx={{ flexGrow: 1 }} >
            {/* <Container> */}
            <Grid container sx={{ height: "85vh", overflowY: "auto" }} onScroll={onScroll} ref={listInnerRef}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} >
                            {/* Form to create a post */}
                            <CreatePost groupId={groupId} reload={() => setReload(!reload)} />
                            {/* get List post */}
                            {loading ? postList?.map((post) => <PostDetail key={post.id} post={post} reload={() => setReload(!reload)} />) : <PostSkeleton />}
                        </Grid>
                        <Grid item xs={4}>
                            <Card>
                                {loading ? <ContestList contestList={contestList} /> : <PostSkeleton />}
                            </Card>
                        </Grid>
                    </Grid>
                    {/* </Container> */}
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
        </Box >
    );
}

export default GroupContent;
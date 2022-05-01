import { Box, Container, Grid } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import tradingPostApi from '../../../../api/TradingPostApi';
import PostSkeleton from '../../../../components/PostSkeleton/PostSkeleton';
import CreateTradingPost from '../../CreateTradingPost/CreateTradingPost';
import TradingPostDetail from './../TradingPostDetail/TradingPostDetail';

TradingContent.propTypes = {

};

function TradingContent(props) {

    const { id: tradingGroupId } = useParams();

    const listInnerRef = useRef();

    const [listTradingPost, setListTradingPost] = useState([]);
    const [loading, setLoading] = useState(false);

    const [reload, setReload] = useState(false)

    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 9,
    });

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log("reached bottom");
                setFilters(prevFilter => ({
                    ...prevFilter,
                    pageSize: prevFilter.pageSize + 9
                }))
                setReload(!reload)
            }
        }
    };

    useEffect(() => {
        const fetchListTradingPost = async () => {
            try {
                const data = await tradingPostApi.getAll(tradingGroupId, filters);
                setListTradingPost(data.data)
            } catch (error) {
                console.log('Failed to fetch ListTradingPost', error)
            }
            setLoading(false);
        }
        fetchListTradingPost();
    }, [tradingGroupId, filters, reload])

    const handleCreatePostSubmit = (values) => {

    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* <Container> */}
            <Grid container sx={{ height: "85vh", overflowY: "auto" }} onScroll={onScroll} ref={listInnerRef}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} >
                            {/* Form to create a post */}
                            <CreateTradingPost tradingGroupId={tradingGroupId} onSubmit={handleCreatePostSubmit} reload={() => setReload(!reload)} />
                            {/* get List post */}
                            {loading ? <PostSkeleton /> : listTradingPost?.map((tradingPost) => <TradingPostDetail key={tradingPost.id} tradingPost={tradingPost} reload={() => setReload(!reload)} />)}
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}>

                </Grid>
            </Grid>
            {/* </Container> */}
        </Box>
    );
}

export default TradingContent;
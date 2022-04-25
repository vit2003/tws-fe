import { Box, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tradingPostApi from '../../../../api/TradingPostApi';
import PostSkeleton from '../../../../components/PostSkeleton/PostSkeleton';
import CreateTradingPost from '../../CreateTradingPost/CreateTradingPost';
import TradingPostList from './../TradingPostList/TradingPostList';
import TradingPostDetail from './../TradingPostDetail/TradingPostDetail';

TradingContent.propTypes = {

};

function TradingContent(props) {

    const { id: tradingGroupId } = useParams();

    const [listTradingPost, setListTradingPost] = useState([]);
    const [loading, setLoading] = useState(false);

    const [reload, setReload] = useState(false)

    const [filters, setFilters] = useState({
        pageNumber: 1,
        pageSize: 99,
    });

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
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={8}>
                        {/* Form to create a post */}
                        <CreateTradingPost tradingGroupId={tradingGroupId} onSubmit={handleCreatePostSubmit} />

                        {/* get List post */}
                        {loading ? <PostSkeleton /> : listTradingPost?.map((tradingPost) => <TradingPostDetail key={tradingPost.id} tradingPost={tradingPost} reload={() => setReload(!reload)} />)}

                        {/* {loading ? <PostSkeleton /> : <TradingPostList listTradingPost={listTradingPost} />} */}
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default TradingContent;
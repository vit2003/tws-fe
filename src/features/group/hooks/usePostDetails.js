
import { useState, useEffect } from 'react';
import postApi from './../../../api/postApi';

export default function usePostDetails(postId, reload) {


    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const result = await postApi.get(postId);
                setPost(result);
            } catch (error) {
                console.log('Failed to fetch toy', error)
            }

            setLoading(false)
        })()
    }, [postId, reload])

    return { post, loading };
}
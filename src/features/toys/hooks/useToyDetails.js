
import { useState, useEffect } from 'react';
import toysApi from '../../../api/toysApi';

export default function useToyDetails(toyId) {

    const [toy, setToy] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try{
                setLoading(true)
                const result = await toysApi.get(toyId);
                setToy(result);
            }catch (error) {
                console.log('Failed to fetch toy', error)
            }
            setLoading(false)
        })()
    }, [toyId])

    return { toy, loading };
}
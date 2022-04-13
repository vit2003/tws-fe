import { Button, Container } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import groupApi from './../../api/groupApi';
function GroupBar(props) {


    const [groupList, setGroupList] = useState([]);
    const [url, setUrl] = useState('');

    let location = useLocation();
    const pathName = location.pathname.split('/');

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const response = await groupApi.getAllGroup()
                setGroupList(response)
            } catch (error) {
                console.log('Failed to fetch groupList', error)
            }
        }
        fetchGroup();
    }, [])

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    p: 1,
                    mb: 1,
                    bgcolor: 'background.paper',
                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;"
                }}
            >
                {groupList?.map((group) => (
                    pathName[1] === "trading" ?
                        <NavLink key={group.id} style={{ textDecoration: 'none', }} activeClassName="active" to={`/trading/${group.id}`}>
                            <Button style={{ color: 'black', }} variant="text">{group.name}</Button>
                        </NavLink> :
                        <NavLink key={group.id} style={{ textDecoration: 'none', }} activeClassName="active" to={`/group/${group.id}`}>
                            <Button style={{ color: 'black', }} variant="text">{group.name}</Button>
                        </NavLink>
                ))}
            </Box>
        </Container>
    );
}

export default GroupBar;
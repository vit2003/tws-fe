const getOtherEmail = (users, currenUserId) => {
    
    return users?.filter(user => user.id !== currenUserId);
}

export default getOtherEmail;
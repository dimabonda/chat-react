import { Button, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import SearchUserInput from "../SearchUserInput/SearchUserInput"
import SearchUserList from "../SearchUserList/SearchUserList"
import {SearchUserForChatWrap, SearchUserHeader } from "./SearchUserForChat.style"

export const SearchUserForChat = ({getUsers, members}) => {
    const [users, setUser] = useState(members || [])

    const handleSetUser = (id) => {              //delete or add member
        users.find(item => item._id == id) ? 
        setUser(users.filter(item => item._id != id)) : 
        setUser([...users, {_id: id}])
    };
    
    useEffect(() => {
        getUsers(users);
    },[users])

    return(
        <SearchUserForChatWrap>
            <SearchUserHeader>Add Members <span>{members ? users.length : users.length + 1}</span></SearchUserHeader>
            <SearchUserInput/>
            <Divider sx={{mb: '8px'}}/>
            <SearchUserList members={users} handleSetUser={handleSetUser}/>
            <Divider/>
        </SearchUserForChatWrap>
    )
}
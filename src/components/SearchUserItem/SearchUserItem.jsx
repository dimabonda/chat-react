import { Avatar, Badge } from "@mui/material"
import { backendURL } from "../../helpers/gql"
import { SearchUserItemName, SearchUserItemWrapper, BadgeImgWrapper, AvatarWrapper } from "./SearchUserItem.style"
import CheckBox from "./icons8_checkbox.svg";

export const SearchUserItem = ({user, handleSetUser, invisible}) => {
    return (
        <SearchUserItemWrapper onClick={() => handleSetUser(user._id)}>
            <Badge
                sx={{margin: "0 20px"}}
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                invisible={!invisible}
                badgeContent={
                    <BadgeImgWrapper>
                        <img src={CheckBox}/>
                    </BadgeImgWrapper>
                }
            >
                <AvatarWrapper checked={invisible}>
                    <Avatar
                        alt={user.nick}
                        src={`${backendURL}/${user?.avatar?.url || ''}`}
                        sx={{ width: "100%", height: "100%"}}        
                    />
                </AvatarWrapper>
                
            </Badge>
            
            <SearchUserItemName>
                {user.nick}
            </SearchUserItemName>
        </SearchUserItemWrapper>
    )
}


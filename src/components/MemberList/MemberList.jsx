import { Avatar } from "@mui/material"
import { backendURL } from "../../helpers/gql"
import { MemberItem, MemberListWrapper, MemberName } from "./MemberList.style"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export const MemberList = ({members}) => {
    return (
        <MemberListWrapper>
            <SimpleBar style={{ maxHeight: '100%'}}>
                {members?.map((member) => <MemberItem key={member?._id}>
                    <Avatar
                        src={`${backendURL}/${member?.avatar?.url || ''}`}  
                        sx={{width: 45, height: 45, mr: '20px'}}
                        alt="member"
                    />
                    <MemberName>{member?.nick}</MemberName>
                </MemberItem>)}
            </SimpleBar>
        </MemberListWrapper>
    )
}


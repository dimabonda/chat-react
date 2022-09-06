import { connect } from "react-redux";
import { SearchUserItem } from "../SearchUserItem/SearchUserItem"
import { SearchUserListWrapper } from "./SearchUserList.style"
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const SearchUserList = ({users, members, handleSetUser, userId}) => {
    //filter current user from users
    return (
        <SearchUserListWrapper >
            <SimpleBar style={{ maxHeight: '100%'}}>
                {users.filter((item) => item._id != userId).map((item) =>
                    <SearchUserItem invisible={members.find(member => member._id === item._id)} handleSetUser={handleSetUser} key={item._id} user={item}/>)}
            </SimpleBar>
        </SearchUserListWrapper>
    )
}

export default connect(state => ({users: state?.promise?.usersList?.payload || [], userId: state?.auth?.payload?.sub?.id}))(SearchUserList);
import { useEffect, useState } from "react"
import { connect } from "react-redux";
import { actionFindUser } from "../../actions/actionsForUser";
import { SUInput, SearchUserInputWrapper } from "./SearchUserInput.style"
import SearchIcon from "./search_icon.svg";

const SearchUserInput = ({findUsers}) => {
    const DELAY = 1000;
    const [value, setValue] = useState('');
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
			findUsers(value);
		}, DELAY)
		return () => clearTimeout(delayDebounceFn);
            
    }, [value])

    return (
        <SearchUserInputWrapper>
            <img src={SearchIcon}/>
            <SUInput placeholder='Search' value={value} onChange={e => setValue(e.target.value)}/>
        </SearchUserInputWrapper>
    )
}

export default connect(null, {findUsers: actionFindUser})(SearchUserInput);
import { memo } from "react"
import { convert } from "../Time/Time"
import { MessagesDateWrapper, MsgDate } from "./MessagesDate.style"

const MessagesDate = ({timestamp, visible}) => {

    return(
        visible && <MessagesDateWrapper>
            <MsgDate>
                <div>{convert(timestamp).getDateMonthName()}</div>
            </MsgDate>
        </MessagesDateWrapper>
    )
}

export default memo(MessagesDate)
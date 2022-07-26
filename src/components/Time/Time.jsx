import { useState } from "react";
import { useEffect } from "react";
import { TimeWrapper } from "./Time.style"

export function convert(timestamp){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    let dateOfTimestamp = new Date(+timestamp);
    const getTime = () => {
        let hours = dateOfTimestamp .getHours();
        let minutes = dateOfTimestamp .getMinutes();
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
    }

    const getFullDate = () => {
        let date = dateOfTimestamp.getDate();
        let month = dateOfTimestamp.getMonth() + 1;
        let year = dateOfTimestamp.getFullYear();
        
        return `${date < 10 ? '0' + date : date}.${month < 10 ? '0' + month : month}.${year}`
    }

    const getDateMonthName = () => {
        let date = dateOfTimestamp.getDate();
        let month = dateOfTimestamp.getMonth();
        let year = dateOfTimestamp.getFullYear();

        return `${date} ${monthNames[month]} ${year}`
    }
    
    return {
        getTime, getFullDate, getDateMonthName
    }
        
}

export const TimeLastMessage = ({isActive, timestamp}) => {

    const [method, setMethod] = useState('');
    useEffect(() => {
            (new Date().getDate() != new Date(timestamp).getDate()) || (Date.now() - timestamp > 86400000) ? 
                setMethod('getFullDate')
            : 
                setMethod('getTime')
    }, [timestamp])
    
    return (timestamp) ? 
       <TimeWrapper isActive={isActive}>{method && convert(timestamp)[method]()}</TimeWrapper>
        : 
        <></> 
}
import { convert } from "../../components/Time/Time";


export function chatReducer (state={}, {type, data, id, mediaKey, name}){
	if(type === 'CHATS'){
		let chats                               ////new chats
		for(const value of data){
			chats = {
				...chats, 
				[value._id]:{...value}
			}
		}
        let newState
        for (let prop in chats){
            newState = {
                ...state, ...newState, [prop] : {...state[prop], ...chats[prop]}
            }
        }
        let arr = Object.entries(newState || {});
		return {
			...Object.fromEntries(arr.sort((a,b) => a[1].lastModified > b[1].lastModified ? -1 : 1))
		}
	}

    // if(type === 'MESSAGES'){
    //     let newMessages
    //     for(const value of data){
	// 		newMessages = {
	// 			...newMessages, 
	// 			[value._id]:{...value}
	// 		}
	// 	}
	// 	return {
	// 		...state, [id] : {...(state[id] || {_id: id, title: "loading"}),
    //          messages: Object.fromEntries(Object.entries({...(state[id]?.messages || {}), ...newMessages}).sort((a,b) => a[0] < b[0] ? 1 : -1))}
	// 	}
	// }

    // if (type === MSG){
    //     return {
    //         ...state, [id]: {...(state[id] || {_id: id, title: "loading"}), 
    //             messages : 
    //         }
    //     }
    // }

    if(type === 'MESSAGES'){
        const messages = data.reduce((p,c)=>{
            let lastArray = p[p.length - 1];
            const lastMessageOfLastArray = p[p.length-1][p[p.length-1].length - 1 ];
            if( lastMessageOfLastArray?.createdAt - c.createdAt > 600000 
                    || (lastMessageOfLastArray?.createdAt ? convert(lastMessageOfLastArray?.createdAt).getDateMonthName() !== convert(c.createdAt).getDateMonthName() : false )
                    || (lastMessageOfLastArray?.owner ? lastMessageOfLastArray?.owner?._id !== c?.owner?._id : false)  ){
                p.push([]);
                lastArray = p[p.length - 1];
            }
            lastArray.push(c);
            return p;
        }, [...(state[id]?.messages || [[]]) ]);
        
        return {
            ...state, [id] : {...(state[id] || {_id: id, title: "loading"}),
                messages : messages
            }
        }
    }

	if(type === 'LEFTCHAT'){
        let newState = {...state};
        let arr = Object.entries(newState);
        return {
            ...Object.fromEntries(arr.filter((chat) => chat[0] != data._id))
        }
	}
///
    if(type === 'CLEARCHATS'){
        return {
            
        }
    }

	if (type === 'SETMEDIA'){
        return {
            ...state, [id] : {...state[id], draft : {...state[id].draft, media: [...state[id].draft?.media || [], ...data]}}     //[...state.id || [], ...value]
        }
    } 
    if (type === 'CLEARMEDIA'){
        return {
            ...state, [id] : {...state[id], draft : {...state[id].draft, media: []}}
        }
    }
    if (type === 'DELETEMEDIA'){
		console.log(id, mediaKey)
        return {
			...state, [id] : {...state[id], draft : {...state[id].draft, media: state[id].draft.media.filter(item => item.uploadDate != mediaKey )}}
        }
    }

    if (type === 'CHANGE'){
        let newArray = [...state[id].draft.media];
        let index = newArray.findIndex(item => item.uploadDate === mediaKey)
        newArray.splice(index, 1, data[0]);
        return {
			...state, [id] : {...state[id], draft : {...state[id].draft, media: newArray}}
        }
    }

    if (type === 'SETINPUTMESSAGE'){
        return{
            ...state, [id]: {...state[id], draft: {...state[id].draft, [name]: {...(state[id]?.draft?.[name] || {}), value: data}}}
        }
    }
	
	if (type === 'ADDMESSAGEDRAFT'){
		return {
			...state, [id]: {...state[id], draft: {...state[id]?.draft, mainInputValue: {...(state[id]?.draft?.mainInputValue || {}), message: data}}}
		}
	}
	

	if (type === 'MESEDITOR'){
		return{
			...state, [id]: {...state[id], draft: {...state[id]?.draft, messageEditor: data}}
		}
	}

    if (type === 'ALLMEDIACHAT'){
        let newMedia
        for(const value of data){
			newMedia = {
				...newMedia, 
				[value._id]:{...value}
			}
		}
        return {
            ...state, [id]: {...state[id], chatMedia: {...state[id].chatMedia, ...newMedia}}
        }
    }
    
    if (type === 'MEDIACHAT'){
        return {
            ...state,
        }
    }

	return state 
}
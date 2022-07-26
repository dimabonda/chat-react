

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

    if(type === 'MSG'){
        let newMessages
        for(const value of data){
			newMessages = {
				...newMessages, 
				[value._id]:{...value}
			}
		}
		return {
			...state, [id] : {...(state[id] || {_id: id, title: "loading"}),
             messages: Object.fromEntries(Object.entries({...(state[id]?.messages || {}), ...newMessages}).sort((a,b) => a[0] < b[0] ? 1 : -1))}
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
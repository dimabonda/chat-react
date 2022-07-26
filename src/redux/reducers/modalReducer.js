export function modalReducer(state = {}, {type, value, draftName}){
    if(type === 'OPEN'){
        return {
            ...state, isOpen: value
        }
    }
    if(type === 'CONTENT'){
        return {
            ...state, content: value
        }
    }
    if(type === 'MODALDRAFT'){
        return{
            ...state, draft : {...state?.draft, [draftName]: value}
        }
    }
    return state
}
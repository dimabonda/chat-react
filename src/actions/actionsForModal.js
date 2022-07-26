export const actionIsOpen = (value) => ({type: 'OPEN', value});

export const actionModalContent = (value) => ({type: 'CONTENT', value});

export const actionModalDraft = (value, draftName) => ({type: 'MODALDRAFT', value, draftName});

export const actionOpenModal = (content) => 
    dispatch => {
        dispatch(actionModalContent(content));
        dispatch(actionIsOpen(true));
    }

import  {backendURL} from "./gql";

export const uploadFile = (file) => {
    console.log(file)
    const fd = new FormData;
    if (file.name){
        fd.append('media', file)
    } else {
        fd.append('media', file, 'record.wav')
    }

    return fetch(`${backendURL}/upload`, {
        method: "POST",
        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
        body: fd
        }).then((res) => res.json())
}
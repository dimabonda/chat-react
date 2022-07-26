export const jwtDecode = token => {
	try{
		return JSON.parse(atob(token.split('.')[1]));
	}
	catch(e){
		console.log(e.name, e.message);
	}
  }
  
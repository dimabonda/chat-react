import { TextField, Typography, IconButton, InputAdornment, Grid, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { actionFullRegister } from "../actions/actionLogin";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function RegisterPage ({onRegister}) {

    const [values, setValues] = useState({
        login: '',
        firstPassword: '',
        secondPassword: '',
        nick: '',
        showPassword: ''
    })

    const [errorValues, setErrorValues] = useState({
        login: '',
        firstPassword: '',
        secondPassword: '',
        nick: ''
    })

    useEffect(() => {
        if(Object.values(errorValues).every(item => item === false)) {
            onRegister(values.login, values.firstPassword, values.nick)
        }
    }, [errorValues])


function validatePassword(fp,l,n,sp) {
    let e = {
        login: '',
        firstPassword: '',
        secondPassword: '',
        nick: ''
    }
    let errorsP = [];
    let errorsL = [];
    let errorsN = [];
    let errorsSP = [];

    if (fp.length < 4 || fp.length > 12) {
        errorsP.push("Your password must be at least 4 and no more than 12 characters"); 
    }
    if (!/[a-z]/.test(fp)) {
        errorsP.push("Your password must contain at least one letter.");
    }
    if (!/[0-9]/.test(fp))  {
        errorsP.push("Your password must contain at least one digit."); 
    }
    if (errorsP.length > 0) {
        e = {...e, firstPassword: errorsP.join('/')}
    } else {
        e = {...e, firstPassword: false}
    }
    if(!/[a-z]/.test(l)){
        errorsL.push("Your login must contain at least one letter");
    }
    if (l.length < 4 || l.length > 8) {
        errorsL.push("Your login must be at least 4 and no more than 8 characters"); 
    }
    if (errorsL.length > 0){
        e = {...e, login: errorsL.join('/')}
    } else {
        e = {...e, login: false}
    }
    if(!/[a-z]/.test(n)){
        errorsN.push("Your nick must contain at least one letter");
    }
    if (n.length < 3 || n.length > 15) {
        errorsN.push("Your nick must be at least 3 and no more than 15 characters"); 
    }
    if (errorsN.length > 0){
        e = {...e, nick: errorsN.join('/')}
    } else {
        e = {...e, nick: false}
    }
    if(fp !== sp){
        errorsSP.push("Password not match")
    }
    if (errorsSP.length > 0){
        e = {...e, secondPassword: errorsSP.join('/')}
    } else {
        e = {...e, secondPassword: false}
    }
    setErrorValues({...errorValues, ...e})
}

    const handleChange = (prop) => (e) => {
        setValues({...values, [prop] : e.target.value})
    }

    return (
        <div className="RegisterPage">
            <form className="Form" noValidate autoComplete="off">
                    <Typography sx={{mb: '20px'}} color='primary' variant='h4'>Registration form</Typography>
                    <TextField 
                        error={!!errorValues.login}
                        sx={{width: '100%', mb: (!!errorValues.login) ? '10px' : '30px'}} 
                        required  
                        label="Login" 
                        variant="outlined" 
                        helperText={errorValues.login}
                        value={values.login}
                        autoFocus
                        onChange={handleChange('login')}
                    />
                    <TextField
                        error={!!errorValues.nick}
                        sx={{width: '100%', mb: !!errorValues.nick ? '10px' : '30px'}}
                        label="Nick"
                        helperText={errorValues.nick}
                        required
                        variant="outlined"
                        value={values.nick}
                        autoFocus
                        onChange={handleChange('nick')}
                    />

                    <TextField
                        error={!!errorValues.firstPassword}
                        sx={{width: '100%', mb: !!errorValues.firstPassword ? '10px' : '30px'}}
                        helperText={errorValues.firstPassword} 
                        required  
                        variant="outlined" 
                        label="Password"
                        type={'password'}
                        value={values.firstPassword}
                        onChange={handleChange('firstPassword')}
                        
                    />
                    <TextField
                        error={!!errorValues.secondPassword}
                        sx={{width: '100%', mb: !!errorValues.secondPassword ? '10px' : '30px'}}
                        helperText={errorValues.secondPassword} 
                        required  
                        variant="outlined" 
                        label="Confirm password "
                        type={'password'}
                        value={values.secondPassword}
                        onChange={handleChange('secondPassword')}
                    />
            <Button 
                onClick={() => { validatePassword(values.firstPassword, values.login, values.nick, values.secondPassword)}} 
                sx={{width: '200px', mt: '30px'}} 
                variant="contained">
                    Submit
            </Button><br/>
            <Link className='RegisterBtn' to='/login'>Login</Link>
            </form>
        </div>
    )
}

export default connect(null, {onRegister: actionFullRegister})(RegisterPage)
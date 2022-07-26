import { actionFullLogin } from '../actions/actionLogin';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Typography  } from '@mui/material';
import {BrowserRouter as Router, Link,} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';

function LoginPage({onLogin }){

    const [values, setValues] = useState({
        login: '', 
        password: '',
        showPassword: false, 
    })

    const [errorValues, setErrorValues] = useState({
        login: '',
        firstPassword: '',
    })

    useEffect(() => {
        if(Object.values(errorValues).every(item => item === false)) {
            onLogin(values.login, values.password)
        }
    }, [errorValues])

    function validatePassword(fp,l) {
        let e = {
            login: '',
            firstPassword: '',
        }
        let errorsP = [];
        let errorsL = [];
        
    
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
        setErrorValues({...errorValues, ...e})
    }

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop] : event.target.value})
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        })
    }

    return (
        <div style={{height: '100vh', display: 'flex', alignItems: 'center'}}>
            <form className='Form' noValidate autoComplete='off'>
                
                <Typography sx={{mb: '30px'}} color='primary' variant='h4'>Login</Typography>

                <TextField
                    error={!!errorValues.login}
                    sx={{width: '100%', mb: '30px'}} 
                    required  
                    label="Login" 
                    variant="outlined" 
                    helperText={errorValues.login}
                    value={values.login}
                    autoFocus
                    onChange={handleChange('login')}/>

                <TextField
                    error={!!errorValues.firstPassword}
                    sx={{width: '100%'}}
                    helperText={errorValues.firstPassword} 
                    required  
                    variant="outlined" 
                    label="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={(event) => event.preventDefault()}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button 
                onClick={() => {validatePassword( values.password, values.login)}
                } 
                sx={{width: '200px', mt: '30px'}} 
                variant="contained">
                    Submit
                </Button><br/>
                <Link className='RegisterBtn' to='/register'>Registration</Link>
            </form>
        </div>
    )
}

export default connect(null, {onLogin: actionFullLogin})(LoginPage)
import { actionFullLogin } from '../actions/actionLogin';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment, Typography  } from '@mui/material';
import {BrowserRouter as Router, Link,} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

function LoginPage({onLogin }){

    const [isVisible, setIsVisible] = useState(false)

    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Formik
                initialValues={{
                    login: '',
                    password: ''
                }}
                validationSchema={Yup.object({
                    login: Yup.string()
                        .min(6, "Must be 6 characters or more")
                        .matches(/^\S*$/, "Must be without space")
                        .max(10, "Must be 10 characters or less")
                        .required('Required'),
                    password: Yup.string()
                        .min(6, "Must be 6 characters or more")
                        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{0,}$/, "Must be at least one letter, one number and one special character")
                        .max(10, "Must be 10 characters or less")
                        .required('Required')
                })}
                onSubmit={async({login, password},{setFieldError, resetForm}) => {
                    let val = await onLogin(login, password)
                    val || setFieldError('formError', 'wrong login/password')
                }}
            >
                {formik => (<form className='Form' onSubmit={formik.handleSubmit} noValidate autoComplete='off'>
                <Typography sx={{mb: '30px'}} color='primary' variant='h4'>Login</Typography>
                <TextField
                    error={formik.touched.login && Boolean(formik.errors.login)}
                    sx={{width: '100%', mb: formik.touched.login && formik.errors.login ? '7px': '30px'}} 
                    required  
                    name="login"
                    label="Login" 
                    variant="outlined" 
                    helperText={formik.touched.login && formik.errors.login}
                    value={formik.values.login}
                    autoFocus
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}/>
                <TextField
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    sx={{width: '100%', mb: formik.touched.password && formik.errors.password ? '7px' : '30px'}}
                    helperText={formik.touched.password && formik.errors.password} 
                    required  
                    variant="outlined" 
                    label="Password"
                    name='password'
                    type={isVisible ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setIsVisible(!isVisible)}
                                    onMouseDown={(event) => event.preventDefault()}
                                    edge="end"
                                >
                                    {isVisible ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div>{formik.isSubmitting ? 'Loading...' : (formik.errors.formError ? formik.errors.formError : '')}</div>
                <Button 
                    type="submit"
                    disabled={formik.isSubmitting}
                    sx={{width: '200px', mt: formik.isSubmitting || formik.errors.formError ? '6px' : '30px'}} 
                    variant="contained">
                    Submit
                </Button>
                </form>)}
            </Formik>
            <Link className='RegisterBtn' to='/register'>Registration</Link>
        </div>
    )
}

export default connect(null, {onLogin: actionFullLogin})(LoginPage)
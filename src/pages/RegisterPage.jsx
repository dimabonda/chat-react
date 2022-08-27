import { TextField, Typography, IconButton, InputAdornment, Grid, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { actionFullRegister } from "../actions/actionLogin";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';



function RegisterPage ({onRegister}) {

    return (
        <div className="RegisterPage">
            <Formik
                initialValues={{
                    login: '',
                    nick: '',
                    firstPassword: '',
                    secondPassword: ''
                }}
                validationSchema={Yup.object({
                    login: Yup.string()
                        .min(6, "Must be 6 characters or more")
                        .matches(/^\S*$/, "Must be without space")
                        .max(10, "Must be 10 characters or less")
                        .required('Required'),
                    nick: Yup.string()
                        .min(3, "Must be 3 characters or more")
                        .max(15, "Must be 15 characters or less")
                        .required('Required'),
                    firstPassword: Yup.string()
                        .min(6, "Must be 6 characters or more")
                        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{0,}$/, "Must be at least one letter, one number and one special character")
                        .max(10, "Must be 10 characters or less")
                        .required('Required'),
                    secondPassword: Yup.string()
                        .oneOf([Yup.ref('firstPassword'), null], 'Passwords must match')
                        .required('Required')
                })}
                onSubmit={async({login, firstPassword, nick}, {setFieldError, resetForm}) => {
                    let val = await onRegister(login, firstPassword, nick)
                    val ? resetForm() : setFieldError('formError', 'User already exists')
                }}
            >
                {formik => (<form  className="Form" onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                    <Typography sx={{mb: '20px'}} color='primary' variant='h4'>Registration form</Typography>
                    <TextField 
                        error={formik.touched.login && Boolean(formik.errors.login)}
                        helperText={formik.touched.login && formik.errors.login}
                        sx={{width: '100%', mb: (formik.touched.login && formik.errors.login) ? '7px' : '30px'}} 
                        required  
                        name="login"
                        label="Login" 
                        variant="outlined" 
                        value={formik.values.login}
                        autoFocus
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <TextField
                        error={formik.touched.nick && Boolean(formik.errors.nick)}
                        sx={{width: '100%', mb: formik.touched.nick && formik.errors.nick ? '7px' : '30px'}}
                        label="Nick"
                        name="nick"
                        helperText={formik.touched.nick && formik.errors.nick}
                        required
                        variant="outlined"
                        value={formik.values.nick}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <TextField
                        error={formik.touched.firstPassword && Boolean(formik.errors.firstPassword)}
                        sx={{width: '100%', mb: formik.touched.firstPassword && formik.errors.firstPassword ? '7px' : '30px'}}
                        helperText={formik.touched.firstPassword && formik.errors.firstPassword} 
                        required  
                        name="firstPassword"
                        variant="outlined" 
                        label="Password"
                        type={'password'}
                        value={formik.values.firstPassword}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        
                    />
                    {console.log(formik.errors)}
                    <TextField
                        error={formik.touched.secondPassword && Boolean(formik.errors.secondPassword)}
                        sx={{width: '100%', mb: formik.touched.secondPassword && formik.errors.secondPassword ? '7px' : '30px'}}
                        helperText={formik.touched.secondPassword && formik.errors.secondPassword} 
                        required  
                        name="secondPassword"
                        variant="outlined" 
                        label="Confirm password"
                        type={'password'}
                        value={formik.values.secondPassword}
                        onChange={formik.handleChange}
                        
                    />
                    <div>{formik.isSubmitting ? 'Loading...' : (formik.errors.formError ? formik.errors.formError : '')}</div>
                    <Button 
                        type="submit"
                        disabled={formik.isSubmitting}
                        sx={{width: '200px', mt: formik.isSubmitting || formik.errors.formError ? '6px' : '30px'}} 
                        variant="contained"
                        >
                            Submit
                    </Button>
                </form>)}
            </Formik>
            
            <Link className='RegisterBtn' to='/login'>Login</Link>
            
        </div>
    )
}

export default connect(null, {onRegister: actionFullRegister})(RegisterPage)
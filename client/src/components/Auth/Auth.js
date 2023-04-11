import React, { useState } from "react";
import {
  TextField,
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Icon from "./Icon";
import Input from "./Input";
// import { GoogleLogin } from "react-google-login";
import jwt_decode from "jwt-decode";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { GoogleLogin,googleLogout } from '@react-oauth/google';
import {signin,signup} from '../../actions/auth'



const initialState = {firstname:'', lastname:'', email:'', password:'',confirmPassword:''}
const Auth = () => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [formData,setFormData]=useState(initialState);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignup){
      dispatch(signup(formData,navigate))
    }else{
      dispatch(signin(formData,navigate))
    }
  };

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    // console.log(res);
    const result = jwt_decode(res?.credential);
    const token=res.credential; // ?. does not throw error if obj does not exist it throws undefined
    console.log(result);

    try {
        dispatch({ type: 'AUTH', data: { result }});
        navigate('/');
    } catch (error) {
        console.log(error)
    }
};
  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign was unsuccessfull. Try again later");
  };
 
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Signup" : "SignIn"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstname"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastname"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          
          {/* <GoogleLogin
            // clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}

          <GoogleLogin
            // onSuccess={credentialResponse => {
            //   console.log(credentialResponse);
            // }}
            onSuccess={googleSuccess}
            // onError={() => {
            //   console.log('Login Failed');
            // }}
            onError={googleFailure}
          />
          
          <Grid conatiner justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

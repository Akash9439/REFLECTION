import React,{useState,useEffect} from 'react'
import {AppBar,Typography,Avatar,Toolbar,Button} from '@material-ui/core';
import useStyles from './styles'
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'

const Navbar = () => {
    const classes=useStyles();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const logout=()=>{
        dispatch({type:'LOGOUT'});
        navigate('/');
        setUser(null);
    }
    useEffect(()=>{
        const token=user?.credential;
        
        if(token){
            const decodedToken=decode(token);

            if(decodedToken.exp*1000 < new Date().getTime()){
                logout();
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location]);
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
         <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
        <Toolbar classes={classes.toolbar}>
            {user?.result?(
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl}>
                        {user?.result?.name?.charAt(0)}
                    </Avatar>
                    <Typography className={classes.userName} variant="h6">
                        {user?.result?.name}
                    </Typography>
                    <Button variant="contained" className={classes.logo} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ):(
                <Button component={Link} to='/auth' variant='contained' color='primary'>
                    SIGN IN
                </Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
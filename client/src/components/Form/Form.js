import React,{useState, useEffect} from 'react'
import useStyles from './styles'
import {Typography,Button,Paper} from '@material-ui/core'
import {TextField} from '@material-ui/core';
// import {Textfield} from '@mui/material/Textfield'
import FileBase from 'react-file-base64'
import {useDispatch} from 'react-redux'
import {createPost} from '../../actions/posts'
import {updatedPost} from '../../actions/posts'
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'




const Form = ({currentId,setCurrentId}) => {
  const classes = useStyles();
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const user = JSON.parse(localStorage.getItem('profile'));
  const navigate=useNavigate();
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    // dispatch(createPost(postData));

    if(currentId===0)
    {
      dispatch(createPost({...postData,name:user?.result?.name},navigate));
      clear();
    }
    else
    {
        dispatch(updatedPost(currentId,{...postData,name:user?.result?.name}));
        clear();
    }
  }


  const [postData,setPostData] = useState({
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  });
  const clear = () =>{
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  }
  const dispatch = useDispatch();
  useEffect(()=>{
    if(post)
    {
        setPostData(post);
    }
  },[post])

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories
        </Typography>
      </Paper>
    )
  }


  return (
    <Paper className={classes.paper} elevation={6}>
        <form autoComplete='off' noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
            <Typography variant="h6">
                {currentId?'Editing':'Creating'} Memory
            </Typography>
            {/* <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData,creator:e.target.value})}/> */}
            <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})}/>
            <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=>setPostData({...postData,message:e.target.value})}/>
            <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}/>
            <div className={classes.fileInput}>
                <FileBase 
                   type='file'
                   multiple={false}
                   onDone={({base64})=>setPostData({...postData,selectedFile: base64})}
                />
            </div><br></br>
            <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button><br></br>
            <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
        </form>
    </Paper>
  )
}

export default Form
import React from 'react'
import {Container,Grow,Grid,Paper,AppBar,TextField,Button} from '@material-ui/core'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import {useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import {useDispatch} from 'react-redux'
import {getPosts,getPostsBySearch} from '../../actions/posts'
import Pagination from '../Pagination'
import useStyles from './styles'


function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId,setCurrentId] = useState(0);
    // const classes = useStyles();
    const dispatch = useDispatch();
    const query=useQuery();
    const navigate=useNavigate();
    const page=query.get('page')||1;
    const searchQuery=query.get('searchQuery');
    const classes=useStyles();
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);

    function handleKeyPress(e){
      if(e.keyCode === 13)
      {
        //search post
        searchPost();
      }
    }

    function searchPost(){
      if(search.trim() || tags){
        //dispatch->fetch search post
        dispatch(getPostsBySearch({search,tags:tags.join(',')}));
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }else{
        navigate('/');
      }
    }

    function handleAdd(tag){
      setTags([...tags,tag]);
    }

    function handleDelete(tagtoDelete){
      setTags(tags.filter((tag)=>tag!==tagtoDelete))
    }
  
    // useEffect(()=>{
    //   dispatch(getPosts());
    // },[dispatch]);
  return (
    <Grow in>
        <Container maxwidth='xl'>
          <Grid container justify='space-between' alignItems='stretch' spacing='3' className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField
                  name='search'
                  variant='outlined'
                  label='Search Memories'
                  onKeyPress={handleKeyPress}
                  fullWidth
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                <ChipInput 
                  style={{margin:'10px 0'}}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  variant='outlined'
                  label='Search Tags'
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {(!searchQuery && !tags.length && (
                <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page}/>
              </Paper>
              ))}
              
            </Grid>
          </Grid>
        </Container>
    </Grow>
  )
}

export default Home
import {useEffect,useState} from 'react'
import {Container} from '@material-ui/core'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import useStyles from './styles'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails'
function App() {
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <GoogleOAuthProvider clientId="105488116269-pt5qefcu4d57mglbqc083r3k14qco72i.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxwidth='lg'>
            <Navbar />
            <Routes>
              <Route path='/' exact element={<Navigate replace to='/posts' />} />
              <Route path='/posts' exact element={<Home />} />
              <Route path='/posts/search' exact element={<Home />} />
              <Route path='/posts/:id' element={<PostDetails />} />
              <Route path='/auth' exact element={!user ? (<Auth />) : (<Navigate to={"/posts"} replace/>)} />
            </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Post from './routes/Post';
import UpdatePost from './routes/UpdatePost';
import CreatePost from './routes/CreatePost';
import Login from './routes/Login';
import Loading from './components/Loading';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <>
    <Header />
    <main>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
        } />
      <Route path="/post/:postid" element={
        <PrivateRoute>
          <Post />
        </PrivateRoute>
        } />
      <Route path="/post/:postid/update" element={
        <PrivateRoute>
          <UpdatePost />
        </PrivateRoute>
        } />
      <Route path="/post/create" element={
        <PrivateRoute>
          <CreatePost />
        </PrivateRoute>
        } />
      <Route path="/loading" element={<Loading />} />
    </Routes>
    </main>
    <Footer />
    </>
  );
}

export default App;

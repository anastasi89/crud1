import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { CreatePostPage } from './pages/CreatePostPage';
import { PostPage } from './pages/PostPage';
import { PostsPage } from './pages/PostsPage';

const App: FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/posts/new" element={<CreatePostPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
};

export default App;

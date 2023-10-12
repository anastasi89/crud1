import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Post } from '../components/Post';
import { PostTypes } from '../types';

export const PostsPage: FC = () => {
  const navigate = useNavigate();
  const navTo = () => navigate('/posts/new');

  const [posts, setPosts] = useState<PostTypes[]>([]);

  const getPosts = async () => {
    try {
      const response = await fetch('http://localhost:7070/posts');
      const data = await response.json();
      setPosts(data);
    } catch {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  const sortedPosts = posts.sort((a, b) => dayjs(b.created).diff(a.created));

  return (
    <div className="posts">
      <div className="posts__top">
        <button className="posts__top-btn-create btn" onClick={navTo}>
          Создать пост
        </button>
      </div>
      {sortedPosts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

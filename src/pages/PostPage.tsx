import { FC, FormEventHandler, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostEdit } from '../components/PostEdit';
import { PostView } from '../components/PostView';
import { PostTypes } from '../types';

export const PostPage: FC = () => {
  const navigate = useNavigate();
  const navTo = () => navigate('/');

  const params = useParams();
  const postId = Number(params.id);

  const [selectedPost, setSelectedPost] = useState<PostTypes>();
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = useMemo(() => {
    return () => setIsEdit((prevState) => !prevState);
  }, []);

  const getPost = async (id?: number) => {
    try {
      const res = await fetch(`http://localhost:7070/posts/${id}`);
      const data = await res.json();
      setSelectedPost(data.post);
    } catch {}
  };

  const deletePost = async (id?: number) => {
    try {
      await fetch(`http://localhost:7070/posts/${id}`, {
        method: 'DELETE',
      });
      navTo();
    } catch {}
  };

  const putPost = async (payload: PostTypes) => {
    try {
      await fetch(`http://localhost:7070/posts/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      await getPost(payload.id);
      toggleEdit();
    } catch {}
  };

  const onEditPost: FormEventHandler<HTMLFormElement> = useMemo(() => {
    return (e) => {
      e.preventDefault();

      if (!e.currentTarget.content.value) {
        return;
      }

      const editedPost: PostTypes = {
        id: postId,
        content: e.currentTarget.content.value,
      };

      putPost(editedPost);
    };
  }, []);

  const onDeletePost = useMemo(() => {
    return (id?: number) => () => deletePost(id);
  }, []);

  useEffect(() => {
    getPost(postId);
  }, []);

  return isEdit ? (
    <PostEdit toggleEdit={toggleEdit} onEditPost={onEditPost} {...selectedPost} />
  ) : (
    <PostView toggleEdit={toggleEdit} onDeletePost={onDeletePost} {...selectedPost} />
  );
};

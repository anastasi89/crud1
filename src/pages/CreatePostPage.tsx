import { FC, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostTypes } from '../types';

export const CreatePostPage: FC = () => {
  const navigate = useNavigate();
  const navTo = () => navigate('/');

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!e.currentTarget.content.value) {
      return;
    }

    const newPost: PostTypes = {
      content: e.currentTarget.content.value,
    };

    postPosts(newPost);
  };

  const postPosts = async (payload: PostTypes) => {
    try {
      await fetch('http://localhost:7070/posts', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      navTo();
    } catch {}
  };

  return (
    <form className="post-create" onSubmit={onSubmit} onReset={navTo}>
      <div className="post-create__top">
        <p className="post-create__top-text">Публикация</p>
        <p className="post-create__top-text">Фото/видео</p>
        <p className="post-create__top-text">Прямой эфир</p>
        <p className="post-create__top-text">Ещё</p>
        <button className="post-create__top-btn-close" type="reset">
          ✖
        </button>
      </div>
      <textarea className="post-create__textarea" name="content" />
      <button className="post-create__btn-add btn">Опубликовать</button>
    </form>
  );
};

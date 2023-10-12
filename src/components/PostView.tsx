import { FC, memo } from 'react';

import { PostTypes } from '../types';
import { formatCreated } from '../utils';

type PropsTypes = PostTypes & {
  toggleEdit: () => void;
  onDeletePost: (id?: number) => () => Promise<void>;
};

export const PostView: FC<PropsTypes> = memo(({ toggleEdit, onDeletePost, id, content, created }) => {
  return (
    <div className="post">
      <div className="post__top">
        <img
          className="post__top-img"
          src="" alt="post__top-img"
        />
        <div>
          <h3 className="post__top-title">Петров Иван</h3>
          <p className="post__top-info">
            Основатель группы • <span className="post__top-info_created">{formatCreated(created)}</span>
          </p>
        </div>
      </div>
      <p className="post__content">{content}</p>
      <div className="post__actions">
        <button className="post__actions-btn" type="button">
          Нравится
        </button>
        <button className="post__actions-btn" type="button">
          Комментировать
        </button>
      </div>
      <div className="post__bottom">
        <button className="post__bottom-btn-edit btn" onClick={toggleEdit}>
          Изменить
        </button>
        <button className="post__bottom-btn-delete btn" onClick={onDeletePost(id)}>
          Удалить
        </button>
      </div>
    </div>
  );
});

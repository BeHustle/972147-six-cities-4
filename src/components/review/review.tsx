import * as React from 'react';
import {DEFAULT_AVATAR} from '../../constants';
import * as moment from 'moment';

interface Props {
  review: {
    id: number;
    author: {
      name: string;
      avatar: string;
    };
    text: string;
    rating: number;
    date: Date;
  };
}

const Review: React.FunctionComponent<Props> = ({
  review: {author, text, rating, date}
}: Props) =>
  <li className="reviews__item">
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={author.avatar || DEFAULT_AVATAR} width="54" height="54" alt={author.name} />
      </div>
      <span className="reviews__user-name">{author.name}</span>
    </div>
    <div className="reviews__info">
      <div className="reviews__rating rating">
        <div className="reviews__stars rating__stars">
          <span style={{width: `${rating * 20}%`}}/>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <p className="reviews__text">{text}</p>
      <time className="reviews__time" dateTime={moment(date).format(`YYYY-MM-DD`)}>{moment(date).format(`MMMM YYYY`)}</time>
    </div>
  </li>;

export default Review;

// @flow
import * as React from 'react';

type Props = {
  plantInstance: any
};
import './index.scss'
const doComment = require('../../assets/icons/comment.png')

export const CommentView = (props: Props) => {
  return (
    <div className={'comment-view-component'}>
      <img src={doComment} alt=""/>
    </div>
  );
};

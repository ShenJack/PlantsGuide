import React, {useState} from 'react';
import {formatTime} from "../../utils/time";

interface Props {
  commentItem: any
}

export function CommentItem(props: Props) {
  return <div className={'comment-item'}>
    <div className="content">
      {props.commentItem.content}
    </div>
    <div className="create-time">
      {formatTime(props.commentItem.createdAt)}
    </div>
  </div>
}

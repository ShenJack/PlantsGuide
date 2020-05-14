// @flow
import React, {useState, useEffect} from 'react';
import './index.scss'
import {CommentItem} from "./commentItem";
import {Button, Input} from "antd";
import {apiCommentPlantInstance, apiGetPlantInstanceComments} from "../../api/plant";

type Props = {
  plantInstance: any
};

const doComment = require('../../assets/icons/comment.png')

function openCommentView() {

}


export const CommentView = (props: Props) => {
  let [opened, setOpened] = useState(false)
  let [comment, setComment] = useState("")
  let [comments, setComments] = useState([])


  useEffect(() => {
    apiGetPlantInstanceComments(props.plantInstance._id).then(res => {
      setComments(res.data.comments || [])
    })
  }, [])

  const publishComment = (comment) => {
    apiCommentPlantInstance(props.plantInstance._id, comment).then(() => apiGetPlantInstanceComments(props.plantInstance._id))
      .then(res => setComments(res.data.comments || [])
      )
  }

  return (
    <div className={'comment-view-component'}>
      <div className="button">
        <img className={'icon ' + (opened ? 'opened' : '')} src={doComment} alt="" onClick={() => setOpened(!opened)}/>
      </div>
      <div className={"comment-container " + (opened ? 'opened' : '')}>
        <div className="comment-container-inner">
          <div className="title">
            留言({comments.length})
          </div>
          <div className="comment-item-list">
            {comments.map(item => <CommentItem commentItem={item}/>)}
          </div>
          <div className="add-comment">
            <Input value={comment} onChange={(event) => {
              setComment(event.target.value)
            }}/>
            <div className="button">
              <Button onClick={() => {
                publishComment(comment)
              }}>留言</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

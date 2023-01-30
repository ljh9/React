import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {

    let renderReplyComment = (parentCommentId) =>
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} parentCommentId={comment._id} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </div>
                }
            </React.Fragment>
        ))

  return (
    <div>
        <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} >
            11
        </p>
    </div>
  )
}

export default ReplyComment
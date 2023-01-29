import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comment(props) {

    const videoId = props.postId;
    const user = useSelector(state => state.user)


    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
    

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('저장실패')
                }
            })
    }

  return (
    <div>
            <br />
            <p> replies</p>
            <hr />

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
                )
            ))}
        

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value
                    placeholder="입력"
                />
                <br />
            </form>
            <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
        </div>
  )
}

export default Comment
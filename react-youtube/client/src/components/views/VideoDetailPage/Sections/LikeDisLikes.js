import React from 'react'
import Axios from 'axios';

function LikeDisLikes(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {

        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    setLikes(response.data.likes.length)
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })
    }, [])

    
  return (
    <div>
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <Icon type="like"
                    theme
                    onClick />
            </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}>111</span>
        </span>

        <span key="comment-basic-dislike">
            <Tooltip title="Dislike">
                <Icon
                    type="dislike"
                    theme
                    onClick
                />
            </Tooltip> 
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}>222</span>
        </span>
    </div>
    )
}

export default LikeDisLikes
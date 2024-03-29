import React from 'react'
import Axios from 'axios';

function LikeDisLikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
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

        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                console.log('getDislike',response.data)
                if (response.data.success) {
                    setDislikes(response.data.dislikes.length)
                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get dislikes')
                }
            })

    }, [])


    const onLike = () => {
        if (LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')
                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('실패')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('실패')
                    }
                })
        }
    }

    const onDisLike = () => {
        if (DislikeAction !== null) {
            Axios.post('/api/like/unDisLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } else {
                        alert('Failed to decrease dislike')
                    }
                })

        } else {
            Axios.post('/api/like/upDisLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')
                        if(LikeAction !== null ) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('Failed to increase dislike')
                    }
                })
        }
    }
    

  return (
    <div>
        <span key="comment-basic-like">
            <Tooltip title="Like">
                <Icon type="like"
                    theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                    onClick={onLike} />
            </Tooltip>
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
        </span>

        <span key="comment-basic-dislike">
            <Tooltip title="Dislike">
                <Icon
                    type="dislike"
                    theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                    onClick={onDisLike}
                />
            </Tooltip> 
            <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
        </span>
    </div>
    )
}

export default LikeDisLikes
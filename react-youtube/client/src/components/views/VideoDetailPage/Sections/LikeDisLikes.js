import React from 'react'

function LikeDisLikes() {
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
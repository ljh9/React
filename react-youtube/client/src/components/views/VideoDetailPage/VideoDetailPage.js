import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import Axios from 'axios';

function DetailVideoPage() {


    
    const videoVariable = {
        videoId: videoId
    }
    const videoId = props.match.params.videoId

    useEffect(() => {
        Axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    setVideo(response.data.video)
                } else {
                    alert('Failed to get video Info')
                }
            })

    }, [])

    return (
        <Row>
            <Col lg={18} xs={24}>
                <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                    <video style={{ width: '100%' }} src controls></video>

                    <List.Item
                        actions
                    >
                        <List.Item.Meta
                            avatar
                            title
                            description
                        />
                        <div></div>
                    </List.Item>

                </div>
            </Col>
            <Col lg={6} xs={24}>

                <SideVideo />

            </Col>
        </Row>
    )


}

export default DetailVideoPage
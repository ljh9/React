import React, { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';

function DetailVideoPage() {


    
    const videoVariable = {
        videoId: videoId
    }
    const videoId = props.match.params.videoId

    const [VideoDetail, setVideoDetail] = useState([])


    useEffect(() => {
        Axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.VideoDetail)
                } else {
                    alert('Failed to get video Info')
                }
            })

    }, [])

    if (VideoDetail.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video>

                        <List.Item
                            actions={<Subscribe />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={Video.writer && Video.writer.image} />}
                                title={<a href="https://ant.design">{Video.title}</a>}
                                description={Video.description}
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

    } else {
        return (
            <div>Loading...</div>
        )
    }



}

export default DetailVideoPage
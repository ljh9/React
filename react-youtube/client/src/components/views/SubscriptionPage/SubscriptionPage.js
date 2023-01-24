import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

const [Videos, setVideos] = useState([])

    let variable = { userFrom : localStorage.getItem('userId')  }

    useEffect(() => {
        axios.post('/api/video/getSubscriptionVideos', variable)
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('실패')
                }
            })
    }, [])

  
    return (
        <div></div>
    )

export default SubscriptionPage
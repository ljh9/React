import React, {useEffect, useState} from 'react'
import Axios from 'axios';

function Subscribe(props) {


    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        const variable = { userTo: props.userTo }
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('실팽')
                }
            })
        
        const subscribeVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') }
        Axios.post('/api/subscribe/subscribed', subscribeVariable)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('실팽')
                }
            })

    }, [])

    return (
        <div>
            <button 
            style={{
                backgroundColor: `${Subscribed ? '#CC0000' : '#AAAAAA'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
        
    )
}

export default Subscribe
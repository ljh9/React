import React from 'react'

function Subscribe(props) {


    const [SubscribeNumber, setSubscribeNumber] = useState(initialState)


    useEffect(() => {
        const variable = { userTo: props.userTo }
        axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('실팽')
                }
            })
    }, [])

    return (
        <div>
            <button 
            style={{
                backgroundColor: '#CC0000',
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                0
            </button>
        </div>
        
    )
}

export default Subscribe
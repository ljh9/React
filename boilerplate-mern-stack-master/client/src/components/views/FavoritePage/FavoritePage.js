import Axios from 'axios';
import React, { useEffect } from 'react'
import './favorite.css';

function FavoritePage() {

  useEffect(() => {
    Axios.post('/api/favorite/getFavoredMovei', { useFrom: localStorage.getItem('userid') })
    .then(response => {
      if(response.data.success){

      } else {
        alert('실패')
      }
    })
  }, [])

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
        <h2>Favorite Movies</h2>
        <hr/>
        <table>
            <thead>
                <tr>
                    <th>Movie Title</th>
                    <th>Movie RunTime</th>
                    <td>Remove from favorites</td>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
  )
}

export default FavoritePage
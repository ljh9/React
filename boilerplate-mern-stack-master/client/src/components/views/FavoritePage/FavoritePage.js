import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import './favorite.css';

function FavoritePage() {

  const [Favorites, setFavorites] = useState([])

  useEffect(() => {
    Axios.post('/api/favorite/getFavoredMovei', { useFrom: localStorage.getItem('userid') })
    .then(response => {
      if(response.data.success){
        setFavorites(response.data.favorites)
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
              {Favorites.map((favorite, index) => (
                <tr key={index}>
                  <td>{favorite.movieTitle}</td>
                  <td>{favorite.movieRunTime} mins</td>
                  <td><button>Remove</button></td>
                </tr>
              ))}
            </tbody>
        </table>
    </div>
  )
}

export default FavoritePage
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { Icon } from './Icon.js'
import { NotFound } from './NotFound.js'

import './MovieDetails.css'

export const MovieDetails = () => {

  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  useEffect (() => {
    setLoading(true)
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e2eb26a39cdd68b3570a5c1b62c9c638&language=en-US`)  
      .then((response) => response.json())
      .then((json) => {
        setDetails(json)
        setLoading(false)
      })
  }, [id])

  if(loading) {
    return <div>Loading...</div>
  }

  if (details.id) {
    return (
      <section className='movie-details'style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.backdrop_path})`}}>
        <Link className='homepage-link' to='/'>
          <Icon />
          <p className='link-title'>
            Movies
          </p>
        </Link>
        <div className='details-summary'>
          <img className="details-image" src={`https://image.tmdb.org/t/p/w342/${details.poster_path}`} alt={details.title}/>
          <div className ="details-text">
            <h2>
              {details.title}
              <span>{details.vote_average}/10</span>
            </h2>
            <p>{details.overview}</p>
          </div>
        </div>
        <div className='details-overlay'></div>
      </section>
    )
  } else {
    return (
      <NotFound />
    )
  }
}
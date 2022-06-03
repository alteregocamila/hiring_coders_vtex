import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import * as S from './styled'

export default function Repositories() {
  const navigate = useNavigate()
  const [repositories, setRespositories] = useState([])

  useEffect(() => {
    let repositoriesName = localStorage.getItem('repositoriesName')

    if (repositoriesName !== null) {
      repositoriesName = JSON.parse(repositoriesName)
      setRespositories(repositoriesName)
    } else {
      navigate('/')
    }
  }, [navigate])

  return (
    <S.Container>
      <S.Title>Repositories</S.Title>
      <S.List>
        {repositories.map(repository => {
          return (
            <S.ListItem key={repository}>Repository: {repository} </S.ListItem>
          )
        })}
      </S.List>
      <S.LinkHome to="/"> Back </S.LinkHome>
    </S.Container>
  )
}

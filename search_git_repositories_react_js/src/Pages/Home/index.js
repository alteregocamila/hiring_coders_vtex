import React, { useState } from 'react'
import axios from 'axios'
import * as S from './styled'
import { useNavigate } from 'react-router-dom'

//useState para citar e modificar estados

function Home(props) {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [erro, setErro] = useState(false)

  function handleSearch() {
    axios
      .get(`https://api.github.com/users/${user}/repos`)
      // .get('https://api.github.com/users/' + usuario + '/repos')
      .then(response => {
        const repositories = response.data
        const repositoriesName = []

        repositories.map(repository => {
          return repositoriesName.push(repository.name)
        })
        localStorage.setItem(
          'repositoriesName',
          JSON.stringify(repositoriesName)
        )
        setErro(false)

        // repositories.forEach(item => repositoriesName.push(item.name))
        // localStorage.setItem(
        //   'repositoriesName',
        //   JSON.stringify(repositoriesName)
        // )

        navigate('/repositories')
      })
      .catch(erro => {
        setErro(true)
      })
  }

  return (
    <S.HomeContainer>
      <S.Content>
        <S.Input
          className="userInput"
          placeholder="User"
          value={user}
          onChange={e => setUser(e.target.value)}
        ></S.Input>
        <S.Button type="button" onClick={handleSearch}>
          Search
        </S.Button>
      </S.Content>
      {/* // Operador Ternário */}
      {erro ? <S.ErrorMsg>An error has occurred. Try again.</S.ErrorMsg> : ''}
    </S.HomeContainer>
  )
}

export default Home

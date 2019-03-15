import React from 'react'
import PropTypes from 'prop-types'
import { Container, Repository } from './styles'

const CompareList = ({
  repositories, excluir, loading, refresh, repositoryRefresh,
}) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <div className="botao">
          <button type="button" onClick={() => refresh(repository.id)}>
            {loading && repositoryRefresh === repository.id ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              <i className="fa fa-spinner" />
            )}
          </button>
          <button type="button" onClick={() => excluir(repository.id)}>
            <i className="fa fa-trash" />
          </button>
        </div>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.owner.name}</strong>
          <small>{repository.owner.login}</small>
        </header>
        <ul>
          <li>
            {repository.stargazers_count}
            <small>starts</small>
          </li>
        </ul>
        <ul>
          <li>
            {repository.forks_count}
            <small>forks</small>
          </li>
        </ul>
        <ul>
          <li>
            {repository.open_issues_count}
            <small>issues</small>
          </li>
        </ul>
        <ul>
          <li>
            {repository.lastCommit}
            <small>last commit</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
)

CompareList.propTypes = {
  repositoryRefresh: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  excluir: PropTypes.func.isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      lastCommit: PropTypes.string,
    }),
  ).isRequired,
}

export default CompareList

import React, { Component } from 'react'
import moment from 'moment'
import logo from '../../assets/logo.png'
import api from '../../services/api'
import CompareList from '../../components/CompareList'

import { Container, Form } from './styles'

export default class Main extends Component {
  state = {
    loading: false,
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
    repositoryRefresh: -1,
  }

  componentDidMount = () => {
    const repos = localStorage.getItem('repositories')
    if (repos) {
      const repositories = JSON.parse(repos)
      this.setState({ repositories })
    }
  }

  getRepositoryData = repositoryInput => api.get(`/repos/${repositoryInput}`)

  handleAddorRefreshRepository = async (e, id) => {
    e.preventDefault()
    this.setState({ loading: true, repositoryRefresh: id })
    try {
      const { repositoryInput, repositories } = this.state
      const { data: repository } = await this.getRepositoryData(repositoryInput)
      repository.lastCommit = moment(repository.pushed_at).fromNow()
      let newRepos = []
      if (id) newRepos = this.refreshRepo(id, repository)
      else newRepos = [...repositories, repository]
      this.setState({
        repositories: newRepos,
        repositoryInput: '',
        repositoryError: false,
      })
      localStorage.setItem('repositories', JSON.stringify(newRepos))
    } catch (err) {
      this.setState({ repositoryError: true })
    } finally {
      this.setState({ loading: false, repositoryRefresh: -1 })
    }
  }

  excluir = (id) => {
    const { repositories } = this.state
    repositories.splice(repositories.findIndex(repo => repo.id === id), 1)
    this.setState({ repositories })
    localStorage.setItem('repositories', JSON.stringify(repositories))
  }

  refreshRepo = (id, repository) => {
    const { repositories } = this.state
    const repoRefresh = repositories.findIndex(repo => repo.id === id)
    repositories[repoRefresh] = repository
    return repositories
  }

  render() {
    const {
      repositories, repositoryError, repositoryInput, loading, repositoryRefresh,
    } = this.state
    return (
      <Container>
        <img src={logo} alt="Github compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddorRefreshRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList
          repositories={repositories}
          excluir={this.excluir}
          loading={loading}
          refresh={this.handleAddorRefreshRepository}
          repositoryRefresh={repositoryRefresh}
        />
      </Container>
    )
  }
}

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
    repositoryRefresh: '',
  }

  componentDidMount = () => {
    // localStorage.removeItem('repositories')
    const repos = localStorage.getItem('repositories')
    if (repos) {
      const repositories = JSON.parse(repos)
      this.setState({ repositories })
    }
  }

  getRepositoryData = async (repositoryInput) => {
    const { data: repository } = await api.get(`/repos/${repositoryInput}`)
    repository.lastCommit = moment(repository.pushed_at).fromNow()
    return repository
  }

  handleAddRepository = async (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    try {
      const { repositoryInput, repositories } = this.state
      const newRepos = [...repositories, await this.getRepositoryData(repositoryInput)]
      this.setState({
        repositories: newRepos,
        repositoryInput: '',
        repositoryError: false,
      })
      localStorage.setItem('repositories', JSON.stringify(newRepos))
    } catch (err) {
      this.setState({ repositoryError: true })
    } finally {
      this.setState({ loading: false })
    }
  }

  excluir = (id) => {
    const { repositories } = this.state
    repositories.splice(repositories.findIndex(repo => repo.id === id), 1)
    this.setState({ repositories })
    localStorage.setItem('repositories', JSON.stringify(repositories))
  }

  refreshRepo = async (fullName) => {
    this.setState({ loading: true, repositoryRefresh: fullName })
    const { repositories } = this.state
    const repoIndex = repositories.findIndex(repo => repo.full_name === fullName)
    repositories[repoIndex] = await this.getRepositoryData(fullName)
    this.setState({
      repositories,
    })
    localStorage.setItem('repositories', JSON.stringify(repositories))
    this.setState({ loading: false, repositoryRefresh: '' })
  }

  render() {
    const {
      repositories, repositoryError, repositoryInput, loading, repositoryRefresh,
    } = this.state
    return (
      <Container>
        <img src={logo} alt="Github compare" />
        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {loading && !repositoryRefresh ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}
          </button>
        </Form>
        <CompareList
          repositories={repositories}
          excluir={this.excluir}
          loading={loading}
          refresh={this.refreshRepo}
          repositoryRefresh={repositoryRefresh}
        />
      </Container>
    )
  }
}

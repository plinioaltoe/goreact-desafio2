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
  }

  componentDidMount = () => {
    const repos = localStorage.getItem('repositories')
    console.log(repos)
    if (repos) {
      const repositories = JSON.parse(repos)
      this.setState({ repositories })
    }
  }

  handleAddRepository = async (e) => {
    e.preventDefault()

    this.setState({ loading: true })

    try {
      const { repositoryInput, repositories } = this.state
      const { data: repository } = await api.get(`/repos/${repositoryInput}`)
      repository.lastCommit = moment(repository.pushed_at).fromNow()
      const newRepos = [...repositories, repository]
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

  render() {
    const {
      repositories, repositoryError, repositoryInput, loading,
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
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    )
  }
}

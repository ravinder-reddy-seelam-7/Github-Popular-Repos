import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStateConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeLanguageId: languageFiltersData[0].id,
    respositoryItems: [],
    resultState: apiStateConstants.inProgress,
  }

  componentDidMount() {
    this.getRepositoryItem()
  }

  changingLanguage = id => {
    this.setState(
      {activeLanguageId: id, resultState: apiStateConstants.inProgress},
      this.getRepositoryItem,
    )
  }

  getRepositoryItem = async () => {
    const {activeLanguageId} = this.state
    console.log(activeLanguageId)
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`

    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))

      this.setState({
        respositoryItems: updatedData,
        resultState: apiStateConstants.success,
      })
    } else {
      this.setState({resultState: apiStateConstants.failure})
    }
  }

  getLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  gettingRepositoryItems = () => {
    const {respositoryItems} = this.state
    return (
      <ul className="repository-items-container">
        {respositoryItems.map(eachItem => (
          <RepositoryItem key={eachItem.id} eachItem={eachItem} />
        ))}
      </ul>
    )
  }

  getFailureView = () => (
    <div className="failure-view-container">
      <img src="" className="failure-image" alt="" />
      <p className="failure-text">Something Went Wrong</p>
    </div>
  )

  switchCaseConditionView = () => {
    const {resultState} = this.state
    switch (resultState) {
      case apiStateConstants.inProgress:
        return this.getLoader()
      case apiStateConstants.success:
        return this.gettingRepositoryItems()
      case apiStateConstants.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="bg-container">
        <h1 className="bg-heading">Popular</h1>
        <ul className="languages-container">
          {languageFiltersData.map(eachItem =>
            eachItem.id === activeLanguageId ? (
              <LanguageFilterItem
                key={eachItem.id}
                eachItem={eachItem}
                changingLanguage={this.changingLanguage}
                btnStyling="btn-styling"
              />
            ) : (
              <LanguageFilterItem
                key={eachItem.id}
                eachItem={eachItem}
                changingLanguage={this.changingLanguage}
                btnStyling=""
              />
            ),
          )}
        </ul>
        {this.switchCaseConditionView()}
      </div>
    )
  }
}
export default GithubPopularRepos

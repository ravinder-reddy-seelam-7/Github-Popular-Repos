// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = eachItem
  return (
    <li className="repository-item">
      <img src={avatarUrl} alt={name} className="image" />
      <h1 className="repository-name">{name}</h1>
      <div className="small-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="repository-text">{starsCount} stars</p>
      </div>
      <div className="small-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="repository-text">{forksCount} forks</p>
      </div>
      <div className="small-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="repository-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, changingLanguage, btnStyling} = props
  const {id, language} = eachItem

  const clickingLanguageBtn = () => {
    changingLanguage(id)
  }

  return (
    <li className="language-list-item">
      <button
        type="button"
        className={`language-button ${btnStyling}`}
        onClick={clickingLanguageBtn}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

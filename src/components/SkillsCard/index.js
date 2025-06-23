import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails

  return (
    <li className="skills-list-item">
      <img src={imageUrl} alt={name} className="skillImage" />
      <p className="skill-name">{name}</p>
    </li>
  )
}
export default SkillsCard

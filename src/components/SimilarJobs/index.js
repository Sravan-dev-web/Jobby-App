import './index.css'

import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

const SimilarJobs = props => {
  const {eachItem} = props
  const {
    employmentType,
    companyLogoUrl,
    jobDescription,
    location,
    rating,
    title,
  } = eachItem

  return (
    <li className="similar-job-item">
      <div className="similar-job-item-container">
        <div className="company-logo-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="job-title-container">
            <h1 className="job-title">{title}</h1>
            <div className="job-rating-container">
              <FaStar className="star-icon" size={12} />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="description-heading">Description</h1>
        <p className="similar-job-description-txt">{jobDescription}</p>
        <div className="job-details-container">
          <div className="job-location-container">
            <MdLocationOn size={10} className="icon" />
            <p className="text">{location}</p>
          </div>
          <div className="employment-type-container">
            <BsBriefcaseFill size={10} className="icon" />
            <p className="text">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs

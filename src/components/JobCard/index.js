import {Link} from 'react-router-dom'

import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaStar} from 'react-icons/fa'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-list-item-containet">
      <li className="job-list-item">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo-image"
          />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" size={12} />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="company-details-container">
          <div className="details-contaner">
            <div className="location-container">
              <MdLocationOn className="icon" size={12} />
              <p className="text">{location}</p>
            </div>
            <div className="employment-type-container">
              <BsBriefcaseFill className="icon" size={15} />
              <p className="text">{employmentType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-head">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard

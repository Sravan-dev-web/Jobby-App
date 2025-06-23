import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {RiShareBoxFill} from 'react-icons/ri'
import {FaStar} from 'react-icons/fa'

import Cookies from 'js-cookie'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import SkillsCard from '../SkillsCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemData: {},
    similarJobData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getItemDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
    title: data.title,
  })

  getSimilarJobData = each => ({
    companyLogoUrl: each.company_logo_url,
    employmentType: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    location: each.location,
    rating: each.rating,
    title: each.title,
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = this.getItemDetails(data.job_details)

      const updatedSimilarJobItemData = data.similar_jobs.map(eachSimilarJob =>
        this.getSimilarJobData(eachSimilarJob),
      )

      this.setState({
        jobItemData: updatedData,
        similarJobData: updatedSimilarJobItemData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-item-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-txt">
        We cannot seem to find the page you are looking for
      </p>
      <button
        data-testid="button"
        type="button"
        className="retry-button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemView = () => {
    const {jobItemData, similarJobData} = this.state
    console.log(jobItemData)

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      location,
      title,
      jobDescription,
      lifeAtCompany,
      packagePerAnnum,
      rating,
      skills,
    } = jobItemData

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="jobs-container">
        <div className="job-container">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="job-title-container">
              <h1 className="job-title">{title}</h1>
              <div className="job-rating-container">
                <FaStar className="star-icon" size={12} />
                <p className="rating-text">{rating}</p>
              </div>
            </div>
          </div>

          <div className="job-location-container">
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

            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="visit-container">
            <h1 className="description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-button">
              Visit <RiShareBoxFill className="share-icon" size={12} />
            </a>
          </div>
          <p className="job-description-txt">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachSkill => (
              <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-contianer">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobData.map(eachJobData => (
            <SimilarJobs eachItem={eachJobData} key={eachJobData.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderResultJobItem = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemView()

      case apiStatusConstants.inProgress:
        return this.renderInProgressView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-app-container">
        <Header />

        <div className="jobs-item-bg-container">
          {this.renderResultJobItem()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails

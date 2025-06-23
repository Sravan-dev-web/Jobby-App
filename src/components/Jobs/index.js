import Cookies from 'js-cookie'

import {Component} from 'react'
import {IoIosSearch} from 'react-icons/io'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    checkboxInputs: [],
    radioInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {checkboxInputs, radioInput, searchInput} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInputs.join()}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.id}, this.getJobsData)
  }

  onGetInputOption = event => {
    const {checkboxInputs} = this.state
    const inputNotInList = checkboxInputs.filter(
      eachItem => eachItem === event.target.id,
    )

    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkboxInputs: [...prevState.checkboxInputs, event.target.id],
        }),
        this.getJobsData,
      )
    } else {
      const filteredData = checkboxInputs.filter(
        eachItem => eachItem !== event.target.id,
      )

      this.setState({checkboxInputs: filteredData}, this.getJobsData)
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  renderInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-image"
      />
      <h1 className="job-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        data-testid="button"
        type="button"
        className="retry-button"
        onClick={this.getJobsData}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            className="no-jobs-image"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachItem => (
          <JobCard key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderResultView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.inProgress:
        return this.renderInProgressView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-app-container">
        <Header />
        <div className="jobs-lists-container">
          <div className="jobs-portal-container">
            <div className="search-inputs-container">
              <div className="search-container">
                <input
                  onChange={this.onChangeSearchInput}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  data-testid="searchButton"
                  type="button"
                  className="search-icon-button"
                  onClick={this.getJobsData}
                >
                  <IoIosSearch className="search-icon" />
                </button>
              </div>
              <div className="profile-options-container">
                <Profile />
                <hr className="line" />
                <ul className="types-of-employment-container">
                  <h1 className="employment-heading">Type of Employment</h1>
                  {employmentTypesList.map(eachItem => (
                    <li
                      className="employ-list-item"
                      key={eachItem.employmentTypeId}
                    >
                      <input
                        type="checkbox"
                        id={eachItem.employmentTypeId}
                        onChange={this.onGetInputOption}
                      />
                      <label
                        className="employ-label"
                        htmlFor={eachItem.employmentTypeId}
                      >
                        {eachItem.label}
                      </label>
                    </li>
                  ))}
                </ul>
                <hr className="line" />
                <ul className="salary-list-container">
                  <h1 className="salary-range-heading">Salary Range</h1>
                  {salaryRangesList.map(eachItem => (
                    <li
                      className="salary-list-item"
                      key={eachItem.salaryRangeId}
                    >
                      <input
                        name="option"
                        type="radio"
                        id={eachItem.salaryRangeId}
                        onChange={this.onGetRadioOption}
                      />
                      <label
                        className="salary-label"
                        htmlFor={eachItem.salaryRangeId}
                      >
                        {eachItem.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="jobs-list-app-container">
              <div className="search-ccontainer">
                <input
                  onChange={this.onChangeSearchInput}
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  data-testid="searchButton"
                  type="button"
                  className="search-icon-button"
                  onClick={this.getJobsData}
                >
                  <IoIosSearch className="search-icon" />
                </button>
              </div>
              {this.renderResultView()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

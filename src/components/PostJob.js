import React, {Component} from 'react';
import JobForm from './JobForm';
import axios from 'axios';


class PostJob extends Component {

  constructor() {
    super();
    this.displayMessage = this.displayMessage.bind(this);
    this.postJobSkill = this.postJobSkill.bind(this);
    this.postJob = this.postJob.bind(this);
    this.state = {
      owner: localStorage.getItem("userID"),
      title: '',
      description: '',
      jobID: null,
      jobskills: [],
    };

  }

  displayMessage() {
    document.getElementById('message').innerHTML = '';
    document.getElementById('message').innerHTML = 'Job Posted!';
    document.getElementById('job-form').reset();
  }

  postJob(job) {

    axios({
      method: 'POST',
      url: `${this.props.baseurl}/api/job/`,
      data: job
    }).then((response) => {
      this.setState({jobID: response.data.id});
      this.props.getData('myjobs');
      this.props.getData('alljobs');
      this.displayMessage();
    }).catch(function(error) {
      console.log(error);
    })
  }

  postJobSkill(jobskill) {
    jobskill.owner = this.state.jobID
    axios({
      method: 'POST',
      url: `${this.props.baseurl}/api/requiredskill/`,
      data: jobskill
    }).then((response) => {
      let thisskills = this.state.jobskills;
      thisskills.push(
        {label: jobskill.skill_string,
         key: jobskill.skill});
      this.setState({jobskills: thisskills});
      this.props.getData('myjobs');

    }).catch(function(error) {
      console.log(error);
    });
  }


    render() {

        return (
            <div>
              <p id='message'></p>
              <JobForm
                baseurl={this.props.baseurl}
                allskills={this.props.allskills}
                displayMessage={this.displayMessage}
                postJobSkill={this.postJobSkill}
                postJob={this.postJob} />
          </div>
        );
    }
}

export default PostJob;

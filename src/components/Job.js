import React from 'react';
import axios from 'axios';

let Panel = require('react-bootstrap').Panel;
let Button = require('react-bootstrap').Button;

class Job extends React.Component {

  constructor() {
    super();
    this.getJobSkills=this.getJobSkills.bind(this);
    this.state = {
      open: false,
      jobskills: []
    };
  }

  componentDidMount() {
    this.getJobSkills();
  }

  getJobSkills() {
    console.log('getJobSkills', this.props.job.title, this.props.job.id);
    axios
    .get(`${this.props.baseurl}/api/requiredskill/job/${this.props.job.id}`)
    .then((response) => {
      console.log('JobID: ', this.props.job.id, response);
    })
  }


  render() {

    const jobstyle = {
      textAlign:'left',
      margin: '5px',
      padding: '5px'
    }
    const jobheader = {
      backgroundColor: '#ccc',
      padding: '5px'
    }
    const jobcontainer = {
      width: '90%',
      margin: '0 auto',
    }

    const jobwrapper = {
      margin: '5px',
      backgroundColor: '#eee'
    }


		return (
      <div style={jobcontainer}>
        <p style={jobheader} onClick={ () => this.setState({open: !this.state.open})}>{this.props.job.title}</p>
        <Panel collapsible expanded={this.state.open} style={jobwrapper}  >
          <p style={jobstyle}>{this.props.job.description}</p>
          <Button bsSize='xsmall'>Message the Job Owner</Button>
        </Panel>
      </div>
		);
  }
}

export default Job;

import React from 'react';
import Chip from 'material-ui/Chip';
import axios from 'axios';

let Panel = require('react-bootstrap').Panel;
let Button = require('react-bootstrap').Button;

class Job extends React.Component {

  constructor() {
    super();
    this.getJobSkills=this.getJobSkills.bind(this);
    this.renderChip=this.renderChip.bind(this);
    this.state = {
      open: false,
      jobskills: []
    };
    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '10px'
      },
    };
  }

  componentDidMount() {
    this.setState({jobskills: []});
    this.getJobSkills();
  }

  getJobSkills() {
    console.log('getJobSkills', this.props.job.title, this.props.job.id);
    axios
    .get(`${this.props.baseurl}/api/requiredskill/job/${this.props.job.id}`)
    .then((response) => {
      console.log('JobID: ', this.props.job.id, response);
      let jskills= response.data.results;
      let jskillArr = []
        for (let i in jskills) {
          jskillArr.push({"key":jskills[i].skill, "label": jskills[i].skill_string});
        };
      this.setState({jobskills: jskillArr})
    })
  }

  renderChip(data) {

      return (
        <Chip
          key={data.key}
          style={this.styles.chip}
          >
          {data.label}
        </Chip>)
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
            <h3>Skills required for this job:</h3>
            <div style={this.styles.wrapper}>
          {  (this.state.jobskills.length>0)
          ?  (this.state.jobskills.map(this.renderChip, this))
          :  (<p>No specific skills required</p>)}
        </div>

          <Button bsSize='xsmall'>Message the Job Owner</Button>
        </Panel>
      </div>
		);
  }
}

export default Job;

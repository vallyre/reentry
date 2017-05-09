import React from 'react';
import TextField from 'material-ui/TextField';
import BtnSubmit from './BtnSubmit';
import ChooseForm from './ChooseForm';

import Chip from 'material-ui/Chip';


class JobForm extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.createJob = this.createJob.bind(this);
    this.renderChip = this.renderChip.bind(this);
    this.updateJobskills = this.updateJobskills.bind(this);
    this.state = {
      owner: localStorage.getItem("userID"),
      title: '',
      description: '',
      jobID: null,
      jobskills: []
    };
    this.styles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      },
    };
  }

  handleChange = (e) => {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  createJob(event) {
    event.preventDefault();
    console.log('in createJob');
    const job = {
      owner: this.state.owner,
      title: this.state.title,
      description: this.state.description
    };
    this.props.postJob(job);
  }

  renderChip(data) {
    let skillchip = {
      key: data.skill,
      label: data.skill_string
    }
    return (
      <Chip key={skillchip.key} style={this.styles.chip}>
        {skillchip.label}
      </Chip>
    );
  }

  updateJobskills(jobskill) {
    console.log('updateJobskills', jobskill);
    let skillstate = this.state.jobskills;
    skillstate.push(jobskill);
    this.setState({jobskills: skillstate});
    this.props.postJobSkill(jobskill);
  }

    render() {

        const styles = {
            postForm: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            hintStyle: {
                width: '100%',
                textAlign: 'center'
            },
            underlineFocusStyle: {
                borderColor: '#d9b310'
            }
        }

        return (
          <div>
            <form id='job-form' style={styles.postForm} onSubmit={this.createJob}>
                <TextField
                  type="text"
                  name='title'
                  id='title'
                  value={this.state.title}
                  onFocus={this.hideError}
                  onChange={this.handleChange}
                  hintText='job title'
                  hintStyle={styles.hintStyle}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineFocusStyle}
                  required/>
                <TextField
                  type="text"
                  name='description'
                  value={this.state.description}
                  onFocus={this.hideError}
                  onChange={this.handleChange}
                  multiLine={true}
                  rows={1}
                  hintText='describe this job'
                  hintStyle={styles.hintStyle}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineFocusStyle}
                  required/>
                <BtnSubmit type="submit" onClick={(e) => this.createJob(e)}>Create my Job</BtnSubmit>
            </form>
            <ChooseForm
              choose={'jobskills'}
              jobID={this.state.jobID}
              baseurl={this.props.baseurl}
              allskills={this.props.allskills}
              updateJobskills={this.updateJobskills}
              displayMessage={this.props.displayMessage}
              owner={this.state.owner} />
            <div style={this.styles.wrapper}>
              {this.state.jobskills.map(this.renderChip, this)}
            </div>
          </div>
        );
    }
}

export default JobForm;

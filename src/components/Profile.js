import React, {Component} from 'react';
import Header from './Header';
import ProfileData from './ProfileData';
import ProfileForm from './ProfileForm';
import ChooseForm from './ChooseForm';
import Chips from './Chips';
import HeaderBar from './HeaderBar';
import ShowJobs from './ShowJobs';
import PostJob from './PostJob';

let Panel = require('react-bootstrap').Panel;
let Accordion = require('react-bootstrap').Accordion;

import axios from 'axios';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.postSkill = this.postSkill.bind(this);
    this.getId = this.getId.bind(this);
    this.deleteChip = this.deleteChip.bind(this);
    this.postLocation = this.postLocation.bind(this);
    this.state = {
      profile: {
        firstname: null,
        lastname: null,
        email: null,
        bio: null,
        user: null
      },
      // userid: 1,
      userid: localStorage.getItem("userID"),
      userlocations: [],
      allskills: [],
      userskills: [],
      alllocations: [],
      alljobs: [],
      userjobs: [],
      myjobs: []
    }
  }

  componentDidMount() {
    this.getData('profile');
    this.getData('userlocations');
    this.getData('userskills');
    this.getData('alllocations');
    this.getData('allskills');
    this.getData('userjobs');
    this.getData('alljobs');
    this.getData('myjobs');
  }

  getData(type) {
    let url;
    if (type==='profile') {
      url=`${this.props.baseurl}/api/user_profile/${this.state.userid}/`;
    } else if (type === 'userskills') {
      url=`${this.props.baseurl}/api/providedskill/user/${this.state.userid}/`;
    } else if (type === 'userlocations') {
      url=`${this.props.baseurl}/api/userlocation/user/${this.state.userid}/`;
    } else if (type === 'alllocations') {
      url=`${this.props.baseurl}/api/location/`;
    } else if (type === 'allskills') {
      url=`${this.props.baseurl}/api/skills/`;
    } else if (type === 'userjobs') {
      url=`${this.props.baseurl}/api/jobmatch/${this.state.userid}/`;
    } else if (type === 'alljobs') {
      url=`${this.props.baseurl}/api/job/`;
    } else if (type === 'myjobs') {
      url=`${this.props.baseurl}/api/ownedjob/${this.state.userid}/`;
    }

    axios
      .get(url).then((response) => {

        if (type === 'profile') {
          let profile = {profile: response.data};
          console.log('got profile:', profile);
          this.setState(profile);
          localStorage.setItem('firstname',profile.firstname);
          this.showProfileForm();
        } else if (type === 'userskills') {
          let thing = response.data.results;
          console.log('got userskills:', thing);
          let skills=[];
          for (let i in thing) {
            skills.push({"key":thing[i].id, "label": thing[i].skill_string});
          };
          console.log('skills: ', skills);
          this.setState({userskills: skills});
          return;
        } else if (type === 'userlocations') {
          let thing = response.data.results;
          console.log('got userlocation:', thing);
          let locations=[];
          for (let i in thing) {
            locations.push({"key":thing[i].id, "label": thing[i].location_string});
          };
          console.log('locations: ', locations);
          this.setState({userlocations: locations});
        } else if (type === 'allskills'){
          let allskills = {allskills: response.data.results};
          console.log('got allskills: ', allskills);
          this.setState(allskills);
        } else if (type === 'alllocations') {
          let alllocations = {alllocations: response.data.results};
          console.log('got alllocations: ', alllocations);
          this.setState(alllocations);
        } else if (type === 'userjobs') {
          let userjobs = {userjobs: response.data.results};
          console.log('got userjobs: ', userjobs);
          this.setState(userjobs);
        } else if (type === 'alljobs') {
          let alljobs = {alljobs: response.data.results};
          console.log('got alljobs: ', alljobs);
          this.setState(alljobs);
        } else if (type === 'myjobs') {
          let myjobs = {myjobs: response.data.results};
          console.log('got myjobs: ', myjobs);
          this.setState(myjobs);
        } else {return};
    }).catch(function(error) {
        console.log(error);
    });
  }

  showProfileForm() {

    if (this.state.profile.firstname !== null) {
      return (
        <ProfileData currProfile={this.state.profile} baseurl={this.props.baseurl}/>
      )
    } else {
      return (

        <ProfileForm getProfile={this.getData} baseurl={this.props.baseurl} userid={this.state.userid} />
      )
    }
  }

  postSkill(skill) {
    axios({
      method: 'POST',
      url:`${this.props.baseurl}/api/providedskill/`,
      data: skill
    }).then((response) => {
      console.log('skillposted!!', response);
      this.getData('userskills');
      this.getData('userjobs');
    }).catch(function(error) {
      console.log(error);
    });
  }

  postLocation(location) {
    console.log('in postLocation');
    axios({
      method: 'POST',
      url:`${this.props.baseurl}/api/userlocation/`,
      data: location
    }).then((response) => {
      console.log('locationposted!!', response);
      this.getData('userlocations');
      this.getData('userjobs');
    }).catch(function(error) {
      console.log(error);
    });
  }

  getId(chip, type) {
    console.log('in getId', chip, type);
    if (type === 'skill') {
      let skills = this.state.alluserskills;
      let selectedSkill = skills.find(function (skill) {
        return skill.skill_string === chip
      });
      console.log('skill id match', selectedSkill);
      selectedSkill ? this.deleteChip(selectedSkill, 'skills'):console.log('no match');
    } else if (type ==='location') {
      let locations = this.state.alllocations;
      let shortcity = chip.substring(0, chip.length-4);
      console.log('locations', locations);
      let selectedLocation = locations.find(function (location) {
        return location.city === shortcity
      });
      console.log('shortcity', shortcity);
      console.log('location id match', selectedLocation);
    } else {
      console.log('what called the getId function???')
    }
  }

  deleteChip(chip, type) {
    console.log('in deleteChip');
    let url;
    let getdata;
    if (type === 'skills') {
      url = `${this.props.baseurl}/api/providedskill/${chip}/`;
      getdata = 'userskills';
    } else if (type === 'locations') {
      console.log('waiting on api refactor to enable location deletion');
      url = `${this.props.baseurl}/api/userlocation/${chip}/`;
    } else {
      console.log('how did you get in deleteChip??')
    }
    axios({
      method: 'DELETE',
      url: url,
    }).then((response) => {
      console.log('chip deleted!');
      this.getData(getdata);
      this.getData('userjobs');
    }).catch(function(error) {
      console.log(error);
    });
  }

    render() {

        const styles = {

            profileBody: {
                backgroundColor: '#ccc'
            },
            chipsContainer: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                padding: '20px 0'
            },
            opportunities: {
                textAlign: 'center'
            },
            opportunity: {
                borderBottom: '1px solid #ccc',
                padding: '5px'
            },
        }


        return (
            <div>
                <Header/>
                <div style={styles.profileBody}>

                    <div>
                      <HeaderBar innerText='Your Profile' />
                      <div>
                        {this.showProfileForm()}
                      </div>
                    </div>

                    <Accordion className='section-skills'>

                        <Panel header="Your Skills" eventKey='1'>
                        <ChooseForm choose='skills' baseurl={this.props.baseurl} userid={this.state.userid} allskills={this.state.allskills} postSkill={this.postSkill}/>
                          <Chips chipData={this.state.userskills} choose='skills' deleteChip={this.deleteChip} />
                        </Panel>

                        <Panel header="Your Locations" eventKey='2'>
                          <ChooseForm choose='locations' baseurl={this.props.baseurl} userid={this.state.userid} alllocations={this.state.alllocations} postLocation={this.postLocation}/>
                          <Chips chipData={this.state.userlocations} choose='locations' deleteChip={this.deleteChip} />
                        </Panel>

                        <Panel header="Jobs Matched To You" eventKey='3'>
                          <h1>You've matched {this.state.userjobs.length} jobs</h1>
                          <p>Click a job to view details.</p>
                          <ShowJobs jobs={this.state.userjobs} baseurl={this.props.baseurl} />
                        </Panel>

                        <Panel header="View All Jobs" eventKey='4'>
                          <ShowJobs jobs={this.state.alljobs} baseurl={this.props.baseurl}/>
                        </Panel>

                        <Panel header="Post Your Job" eventKey='5'>
                          <PostJob choose='jobskills' baseurl={this.props.baseurl} allskills={this.state.allskills} userid={this.state.userid} getData={this.getData} deleteChip={this.deleteChip}/>
                        </Panel>

                        <Panel header="Jobs You've Posted" eventKey='6'>
                          <ShowJobs jobs={this.state.myjobs} baseurl={this.props.baseurl} />
                        </Panel>

                        <Panel header='Your Messages' eventKey='7'>
                          <button><a href={`${this.props.baseurl}/secondchances/messages`} target='_blank' >Click to enter the Message Center</a></button>
                        </Panel>

                        <Panel header='Resources' eventKey='8'>
                          <Accordion>
                            <Panel header='I need mental health help.' eventKey='1'>
                              <p>Mental Health help</p>
                              <p>Mental Health help</p>
                              <p>Mental Health help</p>
                            </Panel>
                            <Panel header='I need help finding food.' eventKey='2'>
                              <p>Food resource</p>
                              <p>Food resource</p>
                              <p>Food resource</p>
                            </Panel>
                            <Panel header='I need help finding housing.' eventKey='3'>
                              <p>Housing</p>
                              <p>Housing</p>
                              <p>Housing</p>
                            </Panel>
                          </Accordion>
                        </Panel>
                    </Accordion>

                </div>

            </div>
        );
    }
}

export default Profile;

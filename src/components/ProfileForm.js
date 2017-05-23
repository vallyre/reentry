import React from 'react';
import TextField from 'material-ui/TextField';
import axios from 'axios';

const Button = require('react-bootstrap').Button;

class ProfileForm extends React.Component {

    constructor() {
        super();
        this.createProfile = this.createProfile.bind(this);
        this.setProfile = this.setProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          firstname: '',
          lastname: '',
          email: '',
          location: '',
          bio: ''
        };
    }

    createProfile(event) {
      event.preventDefault();
        const profile = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            emailaddress: this.state.email,
            bio: this.state.bio,
          };
        this.setProfile(profile);
    }

    setProfile(profile) {

      axios({
        method: 'PATCH',
        url: `${this.props.baseurl}/api/user_profile/${this.props.userid}/`,
        auth: {
          username: 'admin',
          password: 'mypassword'
        },
        data: profile
      }).then((response) => {
        this.props.getProfile('profile');
      }).catch(function(error) {
        console.log(error);
      });
    }

    handleChange = (e) => {
      let newState = {};
      newState[e.target.name] = e.target.value;
      this.setState(newState);
    };

    render() {

        const styles = {
            profileForm: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#eee'
            },
            hintStyle: {
              width: '100%',
              textAlign: 'center',
            },
            underlineFocusStyle: {
              borderColor: '#d9b310',
            }
        }

        return (
            <form id='profile-form' style={styles.profileForm} onSubmit={this.createProfile}>
                <p>Tell us a little about yourself</p>
                    <TextField
                      type="text"
                      name='firstname'
                      id='firstname'
                      value={this.state.firstname}
                      onFocus={this.hideError}
                      onChange={this.handleChange}
                      hintText='first name'
                      hintStyle={styles.hintStyle}
                      underlineStyle={styles.underlineStyle}
                      underlineFocusStyle={styles.underlineFocusStyle}
                      required/>
                    <TextField
                      type="text"
                      name='lastname'
                      value={this.state.lastname}
                      onFocus={this.hideError}
                      onChange={this.handleChange}
                      hintText='last name'
                      hintStyle={styles.hintStyle}
                      underlineStyle={styles.underlineStyle}
                      underlineFocusStyle={styles.underlineFocusStyle}
                      required/>
                <TextField
                  type="email"
                  name='email'
                  id='email'
                  value={this.state.email}
                  onFocus={this.hideError}
                  onChange={this.handleChange}
                  hintText='email'
                  hintStyle={styles.hintStyle}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineFocusStyle}/>
                <TextField
                  type='text'
                  name='bio'
                  id='bio'
                  value={this.state.bio}
                  onFocus={this.hideError}
                  onChange={this.handleChange}
                  multiLine={true}
                  rows={1}
                  hintText='Share your story'
                  hintStyle={styles.hintStyle}
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineFocusStyle}/>
                <Button bsSize='small' bsStyle='primary' type="submit" onClick={(e) => this.createProfile(e)}>Make my Profile</Button>
            </form>
        );
    }

}
export default ProfileForm;

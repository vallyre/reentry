import React, {Component} from 'react';
import '../stylesheets/profile.css';
import msgicon from '../images/msgicon.png';

class ProfileData extends Component {

    makeInitials(first, last) {
        let firstArr = (first).toLowerCase().split('');
        let firstInitial = firstArr[0];
        let secondArr = (last).toLowerCase().split('');
        let secondInitial = secondArr[0];
        let initials = [`${firstInitial}${secondInitial}`];

        return (
            <p className='initials'>{initials}</p>
        )
    }

    render() {

        return (
          <div className='profile-container'>

            <div className='profile-flex'>
                <div className='initial-circle'>
                  {this.makeInitials(this.props.currProfile.firstname, this.props.currProfile.lastname)}
                </div>
                <div className='profile-data'>
                  <p className='profile-username'>{this.props.currProfile.firstname} {this.props.currProfile.lastname}</p>
                  <p className='profile-email'>{this.props.currProfile.emailaddress}</p>
                  <p className='profile-bio'>{this.props.currProfile.bio}</p>
                </div>

                <div className='messages'>
                  <a href={`${this.props.baseurl}/secondchances/messages/${this.props.currProfile.user}/`} target='_blank'><img src={msgicon} alt='message center'/></a>
                </div>
              </div>
            </div>
            );
          }
        }
        export default ProfileData;

import React from 'react';
import Job from './Job'

class ShowJobs extends React.Component {


	render() {
    const space = {
      marginTop: '10px'
    }

		return (
        <div style={space}>
        {Object
            .keys(this.props.jobs)
            .map(key => <Job key={key} job={this.props.jobs[key]} baseurl={this.props.baseurl} />)}
        </div>
		);
	}
}

export default ShowJobs;

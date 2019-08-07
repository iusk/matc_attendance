import React from 'react';
import LocationList from './locationList';
import UserList from './userList';

class CustomAdminList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.type === 'location') {
            return (
                <LocationList name={this.props.name} id={this.props.id} />
            );
        } else if (this.props.type === 'user') {
            return (
                <UserList name={this.props.name} id={this.props.id} />
            );
        }
    }
}

export default CustomAdminList;
import React from 'react';
import Avatar from 'react-avatar';

const Client = ({ username }) => {
    return (
        <div className='each-client'>
            <Avatar name={username} size="50" round="10px" />
            <span className='client-name'>
                {username}
            </span>
        </div>
    );
}

export default Client;
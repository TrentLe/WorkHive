// This is a component we are currently not using and it might be unnecessary

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOW } from '../../utils/mutations';
import { QUERY_FOLLOWING } from '../../utils/queries';

import Auth from '../../utils/auth';

const FollowForm = () => {
    const [followedUser, setFollowedUser] = useState([]);
    const [followedUserCount, setFollowedUserCount] = useState(0);

const [addFollow, { error }] = useMutation(ADD_FOLLOW, {
    update(cache, { data: { addFollow } }) {
        try {
            const { followedUser } = cache.readQuery({ query: QUERY_FOLLOWING });
            cache.writeQuery({
                query: QUERY_FOLLOWING,
                data: { followedUser: [addFollow, ...followedUser] },
            });
        } catch (e) {
            console.error(e);
        }
    },
});

const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        const { data } = await addFollow({
            variables: {
                followedUser,
                followedUserCount,
            },
        });

        setFollowedUser('')
        setFollowedUserCount(0);
    } catch (err) {
        console.error(err);
    }

    window.location.reload();
}

const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'followedUser' && value.length <= 280) {
        setFollowedUser(value);
        setFollowedUserCount(value.length);
    }
}

return (
    <div>
        <h1>User</h1>
        <p>Followed User: {followedUser}</p>
        <p>Followed User Count: {followedUserCount}</p>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="followedUser">Followed User:</label>
                <input
                    placeholder="Followed User"
                    name="followedUser"
                    type="text"
                    id="followedUser"
                    value={followedUser}
                    onChange={handleChange}
                />
            </div>
            </form>
            </div>


);

}





export default FollowForm;

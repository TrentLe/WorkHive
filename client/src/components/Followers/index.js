import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOW } from '../../utils/mutations';
import './FollowForm.scss'

const FollowForm = (meInfo, userInfo) => {
    const [followedUser, setFollowedUser] = useState([]);
    const [followedUserCount, setFollowedUserCount] = useState(0);

    return (
        <div className='follow-box'>
            <div className='container'>
                <h1>User</h1>
                <p>Followed User</p>
                <p>Followed User Count</p>
                <form>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="followedUser">Followed User:</label>
                        <textarea

                        ></textarea>
                    </div>
                    <div className="flex-row flex-end">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    );

};

export default FollowForm;
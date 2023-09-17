import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_FOLLOW } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import './FollowForm.scss'

const FollowForm = (meInfo, userInfo) => {


    const followed = meInfo.meInfo.me?.following?.length
    const followers = meInfo.meInfo.me?.followers?.length

    const otherFollowed = meInfo.meInfo?.user?.following?.length
    const otherFollowers = meInfo.meInfo?.user?.followers?.length
    console.log(meInfo.meInfo.user)
    console.log(userInfo)




    const [followedUser, setFollowedUser] = useState([]);
    const [followedUserCount, setFollowedUserCount] = useState(0);

    return (
        <div className='follow-box'>
            <div className='container'>
                {meInfo.meInfo.me ? (
                    <>
                        <h1>Your Follow Info</h1>
                        <p>Followed: {followed}</p>
                        <p>Following: {followers} </p>
                    </>
                ) : (
                    <>
                        <img src={meInfo.meInfo.user?.profilepicture} alt="their display"/>
                        <h1>{meInfo.meInfo.user?.username}'s Follow Info</h1>
                        <p>Followed: {otherFollowed}</p>
                        <p>Following: {otherFollowers} </p>
                    </>

                )}
                {/* <form>
                    <div className="flex-row space-between my-2">
                        <label htmlFor="followedUser">Followed User:</label>
                        <textarea

                        ></textarea>
                    </div>
                    <div className="flex-row flex-end">
                        <button type="submit">Submit</button>
                    </div>
                </form> */}
            </div>

        </div>
    );

};

export default FollowForm;
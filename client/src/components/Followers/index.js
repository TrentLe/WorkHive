import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FollowForm.scss'
import AmIFollowing from '../AmIFollowing/AmIFollowing';
import DisplayPicture from '../DisplayPicture/DisplayPicture';

const FollowForm = ({ meInfo }) => {

    const [followedUsersCount, setFollowedUsersCount] = useState(0)
    const [followerUsersCount, setFollowerUsersCount] = useState(0)
    const [otherFollowedUsersCount, setOtherFollowedUsersCount] = useState(0)
    const [otherFollowerUsersCount, setOtherFollowerUsersCount] = useState(0)

    useEffect(() => {
        setFollowedUsersCount(meInfo?.me?.following?.length)
        setFollowerUsersCount(meInfo?.me?.followers?.length)
    }, [meInfo.me])

    useEffect(() => {
        setOtherFollowedUsersCount(meInfo?.user?.following?.length)
        setOtherFollowerUsersCount(meInfo?.user?.followers?.length)
    }, [meInfo.user])

    return (
        <div className='follow-box'>
            <div className='container'>
                {meInfo.me ? (
                    <>                        
                        <h5 className='text-center '>Your Follow Info</h5>
                        <p>Following: {followedUsersCount}</p>
                        <p>Followers: {followerUsersCount} </p>

                        <h5 className='text-center'> Following</h5>
                    </>
                ) : (
                    <>  
                        <DisplayPicture user={meInfo.user}/>
                        <h1>{meInfo.user?.username}'s Follow Info</h1>
                        <p>Following: {otherFollowedUsersCount}</p>
                        <p>Followers: {otherFollowerUsersCount} </p>

                        <AmIFollowing user={meInfo.user} />

                        <h1 className='text-center'>Following</h1>
                    </>
                )}
                <div className='all-follow-info'>
                    {meInfo.me ? (meInfo.me.following?.map((followedPerson) => {
                        return (<>
                            <div className='followed-info' key={followedPerson._id}>
                                <Link to={`/profiles/${followedPerson.username}`} style={{ textDecoration: "none", color: "inherit", marginBottom: ".7rem" }}>
                                    <DisplayPicture user={followedPerson} />
                                    <h5>{followedPerson.username}</h5>
                                </Link>
                            </div>
                        </>
                        )
                    })) : (meInfo.user.following?.map((followedPerson) => {
                        return (<>
                            <div className='followed-info' key={followedPerson._id}>
                                <Link to={`/profiles/${followedPerson.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <DisplayPicture user={followedPerson} />
                                    <h5>{followedPerson.username}</h5>
                                </Link>
                            </div>
                        </>
                        )
                    }))}
                </div>

            </div>

        </div>
    );

};

export default FollowForm;
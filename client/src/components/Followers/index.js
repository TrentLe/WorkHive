import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOW } from '../../utils/mutations';
import { Link } from 'react-router-dom';

import './FollowForm.scss'

const FollowForm = ({ meInfo }) => {
    const client = useApolloClient()

    const [ followedUsersCount, setFollowedUsersCount ] = useState(0)
    const [ followerUsersCount, setFollowerUsersCount] = useState(0)
    const [ otherFollowedUsersCount, setOtherFollowedUsersCount ] = useState(0)
    const [ otherFollowerUsersCount, setOtherFollowerUsersCount ] = useState(0)

    useEffect( () => {
        setFollowedUsersCount(meInfo?.me?.following?.length)
        setFollowerUsersCount(meInfo?.me?.followers?.length)
    }, [meInfo.me] )

    useEffect( () => {
        setOtherFollowedUsersCount(meInfo?.user?.following?.length)
        setOtherFollowerUsersCount(meInfo?.user?.followers?.length)
    }, [meInfo.user])

    const followed = meInfo?.me?.following?.length
    // const followers = meInfo?.me?.followers?.length

    // const otherFollowed = meInfo?.user?.following?.length
    // const otherFollowers = meInfo?.user?.followers?.length

    const [followUser] = useMutation(ADD_FOLLOW)

    const handleFollow = async () => {

        const userId = meInfo.user?._id

        try {
            console.log(userId)

            await followUser({
                variables: {
                    userId: userId
                }
            }).then(res => {
                console.log(res)
            })

            await client.refetchQueries({
                include: "all",
            })


        } catch (err) {
            console.error(err)
        }

    }



    return (
        <div className='follow-box'>
            <div className='container'>
                {meInfo.me ? (
                    <>
                        <h1>Your Follow Info</h1>
                        <p>Following: {followedUsersCount}</p>
                        <p>Followers: {followerUsersCount} </p>

                        <h1> Following</h1>
                    </>
                ) : (
                    <>
                        <img src={meInfo.user?.profilepicture} alt="their display" />
                        <h1>{meInfo.user?.username}'s Follow Info</h1>
                        <p>Following: {otherFollowedUsersCount}</p>
                        <p>Followers: {otherFollowerUsersCount} </p>

                        <button onClick={handleFollow}>Follow</button>

                        <h1>Following</h1>
                    </>
                )}

                {followed ? (meInfo.me.following.map((followedPerson) => {
                    return (<>
                        <Link to={`/profiles/${followedPerson.username}`} style={{ textDecoration: "none", color: "inherit", marginBottom: ".7rem"}}>
                        <div className='followed-info'>
                            <img src={followedPerson.profilepicture} alt='following' />
                            <h5>{followedPerson.username}</h5>
                        </div>
                        </Link>
                    </>
                    )
                })) : (meInfo.user.following.map((followedPerson) => {
                    return (<>
                        <Link to={`/profiles/${followedPerson.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className='followed-info'>
                                <img src={followedPerson.profilepicture} alt='following' />
                                <h5>{followedPerson.username}</h5>
                            </div>
                        </Link>
                    </>
                    )
                }))







                }
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
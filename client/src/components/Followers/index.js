import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOW, REMOVE_FOLLOW} from '../../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import './FollowForm.scss'

const FollowForm = ({ meInfo }) => {
    const client = useApolloClient()

    const [followedUsersCount, setFollowedUsersCount] = useState(0)
    const [followerUsersCount, setFollowerUsersCount] = useState(0)
    const [otherFollowedUsersCount, setOtherFollowedUsersCount] = useState(0)
    const [otherFollowerUsersCount, setOtherFollowerUsersCount] = useState(0)
    const [ amIfollowing, setAmIfollowing ] = useState(false)


    useEffect(() => {
        setFollowedUsersCount(meInfo?.me?.following?.length)
        setFollowerUsersCount(meInfo?.me?.followers?.length)
    }, [meInfo.me])

    useEffect(() => {
        setOtherFollowedUsersCount(meInfo?.user?.following?.length)
        setOtherFollowerUsersCount(meInfo?.user?.followers?.length)
        const followerIdArr = meInfo?.user?.followers?.map((follower) => {
            return follower._id
        })        
        setAmIfollowing(followerIdArr?.includes(Auth.getProfile().data._id))
    }, [meInfo.user])

    const [followUser] = useMutation(ADD_FOLLOW)
    const [unfollowUser] = useMutation(REMOVE_FOLLOW)

    const handleFollow = async () => {

        const userId = meInfo.user?._id

        try {
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

    const handleUnfollow = async () => {

        const userId = meInfo.user?._id

        try {
            await unfollowUser({
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

                        {amIfollowing ? (<button className="btn btn-primary" onClick={handleUnfollow}>Unfollow</button>)
                        
                        : (<button className="btn btn-primary" onClick={handleFollow}>Follow</button>)}

                        <h1>Following</h1>
                    </>
                )}

                {meInfo.me ? (meInfo.me.following.map((followedPerson) => {
                    return (<>
                        <Link to={`/profiles/${followedPerson.username}`} style={{ textDecoration: "none", color: "inherit", marginBottom: ".7rem" }}>
                            <div className='followed-info' key={followedPerson._id}>
                                <img src={followedPerson.profilepicture} alt='following' />
                                <h5>{followedPerson.username}</h5>
                            </div>
                        </Link>
                    </>
                    )
                })) : (meInfo.user.following.map((followedPerson) => {
                    return (<>
                        <Link to={`/profiles/${followedPerson.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <div className='followed-info' key={followedPerson._id}>
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
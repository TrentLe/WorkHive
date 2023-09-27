import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOW, REMOVE_FOLLOW } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import './FollowForm.scss'

const FollowForm = ({ meInfo }) => {
    const client = useApolloClient()

    const [followedUsersCount, setFollowedUsersCount] = useState(0)
    const [followerUsersCount, setFollowerUsersCount] = useState(0)
    const [otherFollowedUsersCount, setOtherFollowedUsersCount] = useState(0)
    const [otherFollowerUsersCount, setOtherFollowerUsersCount] = useState(0)
    const [amIfollowing, setAmIfollowing] = useState(false)
    const [stockPic, setStockPic] = useState("")
    const [loadingState, setLoadingState] = useState(false)
    const [theirDisplay, setTheirDisplay] = useState("")

    useEffect(() => {
        setFollowedUsersCount(meInfo?.me?.following?.length)
        setFollowerUsersCount(meInfo?.me?.followers?.length)
    }, [meInfo.me])

    useEffect(() => {
        setOtherFollowedUsersCount(meInfo?.user?.following?.length)
        setOtherFollowerUsersCount(meInfo?.user?.followers?.length)
        setTheirDisplay(meInfo?.user?.profilepicture)
        const followerIdArr = meInfo?.user?.followers?.map((follower) => {
            return follower._id
        })
        setAmIfollowing(followerIdArr?.includes(Auth.getProfile().data._id))
        setLoadingState(true)
    }, [meInfo.user])

    useEffect(() => {
        setStockPic("https://i.ibb.co/znBQMM4/stockimageprofilepicture.png")
    }, [loadingState])

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
                        <h5 className='text-center '>Your Follow Info</h5>
                        <p>Following: {followedUsersCount}</p>
                        <p>Followers: {followerUsersCount} </p>

                        <h5 className='text-center'> Following</h5>
                    </>
                ) : (
                    <>  
                        <img className="their-display" src={theirDisplay ? theirDisplay : stockPic} alt="their display" />                        
                        <h1>{meInfo.user?.username}'s Follow Info</h1>
                        <p>Following: {otherFollowedUsersCount}</p>
                        <p>Followers: {otherFollowerUsersCount} </p>

                        {amIfollowing ? (<button className="btn btn-primary" onClick={handleUnfollow}>Unfollow</button>)

                            : (<button className="btn btn-primary" onClick={handleFollow}>Follow</button>)}

                        <h1 className='text-center'>Following</h1>
                    </>
                )}
                <div className='all-follow-info'>
                    {meInfo.me ? (meInfo.me.following.map((followedPerson) => {
                        return (<>
                            <div className='followed-info' key={followedPerson._id}>
                                <Link to={`/profiles/${followedPerson.username}`} style={{ textDecoration: "none", color: "inherit", marginBottom: ".7rem" }}>
                                    <img src={followedPerson.profilepicture ? followedPerson.profilepicture : stockPic} alt='following' />
                                    <h5>{followedPerson.username}</h5>
                                </Link>
                            </div>
                        </>
                        )
                    })) : (meInfo.user.following.map((followedPerson) => {
                        return (<>
                            <div className='followed-info' key={followedPerson._id}>
                                <Link to={`/profiles/${followedPerson.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                                    <img src={followedPerson.profilepicture ? followedPerson.profilepicture : stockPic} alt='following' />
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
import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOW } from '../../utils/mutations';
import { Link } from 'react-router-dom';
import './FollowForm.scss'

const FollowForm = (meInfo, userInfo) => {   

    const followed = meInfo.meInfo?.me?.following?.length
    const followers = meInfo.meInfo?.me?.followers?.length

    const otherFollowed = meInfo.meInfo?.user?.following?.length
    const otherFollowers = meInfo.meInfo?.user?.followers?.length

    
    const [followUser] = useMutation(ADD_FOLLOW)

    const handleFollow = async () => {

        const userId = meInfo.meInfo.user?._id

        try {
            console.log(userId)

            await followUser({
                variables: {
                    userId: userId
                }
            }).then(res => {
                console.log(res)
            })

            window.location.reload()


        } catch (err) {
            console.error(err)
        }

    }



    return (
        <div className='follow-box'>
            <div className='container'>
                {meInfo.meInfo.me ? (
                    <>
                        <h1>Your Follow Info</h1>
                        <p>Following: {followed}</p>
                        <p>Followers: {followers} </p>

                        <h1> Following</h1>
                    </>
                ) : (
                    <>
                        <img src={meInfo.meInfo.user?.profilepicture} alt="their display" />
                        <h1>{meInfo.meInfo.user?.username}'s Follow Info</h1>
                        <p>Following: {otherFollowed}</p>
                        <p>Followers: {otherFollowers} </p>

                        <button onClick={handleFollow}>Follow</button>

                        <h1>Following</h1>
                    </>
                )}

                {followed ? ( meInfo.meInfo.me?.following?.map((followedPerson) => {
                    return (<>
                        <Link to={`/profiles/${followedPerson.username}`} style={{ textDecoration: "none", color: "inherit", marginBottom: ".7rem"}}>
                        <div className='followed-info'>
                            <img src={followedPerson.profilepicture} alt='following' />
                            <h5>{followedPerson.username}</h5>
                        </div>
                        </Link>
                    </>
                    )
                })) : ( meInfo.meInfo.user?.following?.map((followedPerson) => {
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
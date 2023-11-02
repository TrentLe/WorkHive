import React, { useEffect, useState } from 'react'
import Auth from '../../utils/auth'
import { useApolloClient } from '@apollo/client'
import { ADD_FOLLOW, REMOVE_FOLLOW } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const AmIFollowing = ({ user }) => {
    const client = useApolloClient()

    const [amIfollowing, setAmIfollowing] = useState(false)
    const [followUser] = useMutation(ADD_FOLLOW)
    const [unfollowUser] = useMutation(REMOVE_FOLLOW)

    useEffect(() => {
        const followerIdArr = user?.followers?.map((follower) => {
            return follower._id
        })
        setAmIfollowing(followerIdArr?.includes(Auth.getProfile().data._id))
    }, [user])

    const handleFollow = async () => {

        const userId = user?._id
        try {
            await followUser({
                variables: {
                    userId: userId
                }
            })

            await client.refetchQueries({
                include: "all",
            })
        } catch (err) {
            console.error(err)
        }
    }

    const handleUnfollow = async () => {

        const userId = user?._id
        try {
            await unfollowUser({
                variables: {
                    userId: userId
                }
            })

            await client.refetchQueries({
                include: "all",
            })
        } catch (err) {
            console.error(err)
        }
    }

    if (Auth.getProfile().data._id === user?._id) {
        return (
            <>

            </>

        )
    }

    if (!user.username) {
        return (<>
        </>)
    }

    return (

        <>
            {amIfollowing ? (<button className="btn btn-primary" onClick={handleUnfollow}>Unfollow</button>)

                : (<button className="btn btn-primary" onClick={handleFollow}>Follow</button>)}


        </>

    )
}

export default AmIFollowing
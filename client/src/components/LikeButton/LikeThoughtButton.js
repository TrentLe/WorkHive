import React, { useEffect, useState } from 'react'
import { ADD_THOUGHT_LIKE, REMOVE_THOUGHT_LIKE } from '../../utils/mutations'
import { useApolloClient, useMutation } from '@apollo/client'
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import Auth from '../../utils/auth'

const LikeThoughtButton = ({ thought }) => {
    const client = useApolloClient()

    const [doIlike, setDoILike] = useState(false)
    const [likeThought] = useMutation(ADD_THOUGHT_LIKE)
    const [unlikeThought] = useMutation(REMOVE_THOUGHT_LIKE)

    useEffect(() => {
        const thoughtLikeArray = thought.likes?.map((like) => like._id)
        setDoILike(thoughtLikeArray?.includes(Auth.getProfile().data._id))
    }, [thought])

    const handleLike = async () => {
        try {
            await likeThought({
                variables: {
                    thoughtId: thought._id
                }
            })

            await client.refetchQueries({
                include: "all",
            })
            console.log("done correctly")
        } catch (err) {
            console.error(err)
        }
    }

    const handleUnlike = async () => {
        try {
            await unlikeThought({
                variables: {
                    thoughtId: thought._id
                }
            })

            await client.refetchQueries({
                include: "all",
            })
            console.log("done correctly")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div>
                {doIlike ? <p onClick={handleUnlike}>< FcLike size='2rem' /> {thought?.likes?.length}</p> : <p onClick={handleLike}> <FcLikePlaceholder size='2rem' /> {thought?.likes?.length}</p> }
            </div>
        </>
    )
}

export default LikeThoughtButton
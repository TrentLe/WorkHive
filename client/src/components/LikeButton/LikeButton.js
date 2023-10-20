import React, { useEffect, useState } from 'react'
import { ADD_LIKE } from '../../utils/mutations'
import { useApolloClient, useMutation } from '@apollo/client'
import Auth from '../../utils/auth'

const LikeButton = ({ thought, commentId }) => {
    const client = useApolloClient()

    const [doIlike, setDoILike] = useState(false)
    const [likeThoughtOrComment] = useMutation(ADD_LIKE)

    useEffect(() => {
        setDoILike(thought?.likes?.includes(Auth.getProfile().data._id))
    }, [thought])

    const handleLike = async () => {

        const userId = Auth.getProfile().data._id
        try {
            await likeThoughtOrComment({
                variables: {
                    userId: userId,
                    thoughtId: thought._id
                }
            })

            await client.refetchQueries({
                include: "all",
            })
            console.log("dont correctly")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div>
                {!doIlike ? (<button onClick={handleLike}>Like</button>) : ""}
            </div>
        </>
    )
}

export default LikeButton
import { useState, useEffect } from 'react'

export const useFilterUser = (users, user, thought, comment) => {

    const [filteredUser, setFilteredUser] = useState({})

    useEffect(() => {
        if (users && thought) {
            const displayUser = users?.filter((individual) => individual.username === thought.thoughtAuthor)
            const targetUser = displayUser[0]
            setFilteredUser(targetUser)
        } else if (users && comment) {
            const displayUser = users?.filter((individual) => individual.username === comment.commentAuthor)
            const targetUser = displayUser[0]
            setFilteredUser(targetUser)
        } else {
            setFilteredUser(user)
        }
    }, [users, user, thought, comment])

    return filteredUser
}
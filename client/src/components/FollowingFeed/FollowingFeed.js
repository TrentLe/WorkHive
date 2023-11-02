import { useQuery } from '@apollo/client'
import React from 'react'
import { QUERY_ME, QUERY_THOUGHTS, QUERY_USERS } from '../../utils/queries'
import ThoughtList from '../ThoughtList'
import Left from '../left/left'

const FollowingFeed = () => {
    const query1 = useQuery(QUERY_ME)
    const query2 = useQuery(QUERY_THOUGHTS)
    const query3 = useQuery(QUERY_USERS)

    const followedUsers = query1.data?.me?.following?.map((following) => following.username)
    const followFeed = query2.data?.thoughts?.filter((thought) => followedUsers?.includes(thought.thoughtAuthor))

    if (query1.loading || query2.loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className='text-center'>Posts from people you follow</div>

            {query1.loading || query2.loading ? (<div>Loading...</div>) : (
                <>
                    <div className='d-inline-flex'>
                        <Left />

                        <ThoughtList
                            thoughts={followFeed}
                            users={query3.data?.users}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default FollowingFeed
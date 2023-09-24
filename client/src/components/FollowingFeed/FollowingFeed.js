import { useQuery } from '@apollo/client'
import React from 'react'
import { QUERY_ME, QUERY_THOUGHTS } from '../../utils/queries'
import ThoughtList from '../ThoughtList'
import Left from '../left/left'

const FollowingFeed = ({ me, thoughts }) => {
    const query1 = useQuery(QUERY_ME)
    const query2 = useQuery(QUERY_THOUGHTS)

    console.log(query1.data)
    console.log(query2.data)

    const followedUsers = query1.data?.me?.following?.map((following) => following.username)
    const followFeed = query2.data?.thoughts?.filter((thought) => followedUsers?.includes(thought.thoughtAuthor))

    if (query1.loading || query2.loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div>FollowingFeed</div>

            {query1.loading || query2.loading ? (<div>Loading...</div>) : (
                <>
                    <div className='feed-container'>
                        <Left />

                        <ThoughtList
                            thoughts={followFeed}
                            users={query1.data?.me?.following}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default FollowingFeed
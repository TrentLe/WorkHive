import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { QUERY_USERS } from '../../utils/queries'
import { Link } from 'react-router-dom'
import AmIFollowing from '../AmIFollowing/AmIFollowing'
import './UserList.css'
import DisplayPicture from '../DisplayPicture/DisplayPicture'

const UserList = () => {
    
    const query1 = useQuery(QUERY_USERS)

    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(query1.data?.users)
    }, [query1.data])

    if (query1.loading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <h3 className='user-list-title'>Users</h3>
            <div className='user-list'>

                {users && users.map((user) => {
                    return (
                        <div className="user-box">
                            <Link to={`/profiles/${user.username}`}>
                                <DisplayPicture user={user} />
                            </Link>
                            <p className='user-name'>{user.username}</p>
                            <p>Followers: {user.followers.length}</p>
                            <AmIFollowing user={user} />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default UserList
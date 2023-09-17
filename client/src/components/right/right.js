import './right.scss'
// import Auth from '../../utils/auth';
import ThoughtForm from '../ThoughtForm';
import FollowForm from '../Followers';
import News from '../News/News';

const Right = (me, user) => {    

    return (

        <div className='right'>

            <div className='container'>

                {me.me && (
                    <ThoughtForm
                        meInfo={me}
                    />
                )}

                <FollowForm
                    meInfo={me}
                    userInfo={user} />
                <News />
            </div>
        </div>)

}

export default Right;


import './right.scss'
import Auth from '../../utils/auth';
import ThoughtForm from '../ThoughtForm';
import FollowForm from '../Followers';

const Right = (me) => {

    return (

        <div className='right'>

            <div className='container'>
                <ThoughtForm
                    meInfo={me}
                />
                <FollowForm meInfo={me} />
            </div>
        </div>)

}

export default Right;


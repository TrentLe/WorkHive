import './right.scss'
import Auth from '../../utils/auth';
import ThoughtForm from '../ThoughtForm';
import FollowForm from '../Followers';
import News from '../News/News';

const Right = (me, url) => {

    return (

        <div className='right'>

            <div className='container'>
                <ThoughtForm
                    meInfo={me}
                />
                <FollowForm meInfo={me} />
                <News url={url}/>
            </div>
        </div>)

}

export default Right;


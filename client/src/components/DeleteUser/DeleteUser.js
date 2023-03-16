import { useMutation, useQuery } from '@apollo/client';
import { DELETE_USER } from '../../utils/mutations';
import { QUERY_ME, QUERY_USER } from '../../utils/queries'
import Auth from '../../utils/auth'
import { Navigate, useParams } from 'react-router-dom';


function RemoveUser() {
  const { _id: userParam } = useParams();

  const [deleteUser, { error }] = useMutation(DELETE_USER);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const handleDelete = async () => {
    const userId = data._id;

      if ( userId === Auth.getProfile().data._id ) {
        try {
          
          await deleteUser({ variables: { userId } });
          Auth.logout()
          // Handle success
        } catch (error) {
          
          console.log(error)
        }
      }
    };
  
    return (
      <div>
        
        <button onClick={handleDelete} disabled={loading}>
          <p>Delete Your Account</p>
        </button>
        {error && <p>{error.message}</p>}
      </div>
    );
  }

export default RemoveUser;
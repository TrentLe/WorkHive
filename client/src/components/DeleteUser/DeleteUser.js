import { useMutation, useQuery } from '@apollo/client';
import { DELETE_USER } from '../../utils/mutations';
import { QUERY_ME, QUERY_USER } from '../../utils/queries'
import Auth from '../../utils/auth'
import { useParams } from 'react-router-dom';


function RemoveUser() {
  const { userId: userParam } = useParams();

  const [deleteUser] = useMutation(DELETE_USER);

  const { data, loading, error } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { userId: userParam },
  });

  const user = data?.me || data?.user;

  const handleDelete = async () => {
    if (user && user._id === Auth.getProfile().data._id) {
      try {
        await deleteUser({ variables: { userId: user._id } });
        Auth.logout();
        // Handle success
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <button onClick={handleDelete} disabled={!user}>
        <p>Delete Your Account</p>
      </button>
      {!user && <p>User not found</p>}
    </div>
  );
}

export default RemoveUser;
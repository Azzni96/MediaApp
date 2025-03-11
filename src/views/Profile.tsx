import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
    <form className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
      {user && (
        <>
          <p className="text-gray-700">
            {user.username} ({user.email})
          </p>
          <p className="text-gray-600">User level: {user.level_name}</p>
          <p className="text-gray-600">Registered: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </>
      )}
      </form>
    </>
  );
};

export default Profile;

import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';
import Comments from '../components/Comments';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Single</h2>
      <form className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
          Add a comment:
        </label>
        <input
          type="text"
          id="comment"
          name="comment"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Write your comment here..."
        />
      </form>
      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
      <p className="text-gray-600">{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      {item.media_type.includes('image') ? (
        <img
          className="max-w-full rounded-lg shadow-md border-4 border-blue-500"
          src={item.filename}
          alt={item.title}
        />
      ) : (
        <video
          className="max-w-full rounded-lg shadow-md border-4 border-green-500"
          src={item.filename}
          controls
        />
      )}
      <Likes item={item} />
      <p className="mt-4 text-gray-700">{item.description}</p>
      <p className="text-gray-600">Owner: {item.username}</p>
      <p className="text-gray-600">Type: {item.media_type}</p>
      <p className="text-gray-600">Size: {Math.round(item.filesize / 1024)} kB</p>
      <Comments item={item} />
      <button
        className="mt-4 w-full cursor-pointer rounded-md bg-blue-600 p-2 text-white transition-all duration-500 ease-in-out hover:bg-blue-800"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </button>
    </>
  );
};

export default Single;

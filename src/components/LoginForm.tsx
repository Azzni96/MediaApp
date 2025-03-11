import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/FormHooks';
import {Credentials} from '../types/LocalTypes';
import {useNavigate} from 'react-router-dom'; // Import useNavigate

type Props = {
  toggleRegister: () => void;
};

const LoginForm = (props: Props) => {
  const toggleRegister = props.toggleRegister;
  const {handleLogin} = useUserContext();
  const navigate = useNavigate(); // Initialize useNavigate
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs as Credentials);
      navigate('/Home'); // Redirect to home page after successful login
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <h1 className="mt-5 text-3xl font-bold text-center text-indigo-800">Login</h1>
      <form
        className="flex flex-col items-center justify-center mt-4 bg-black p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex w-[80%] flex-col mb-4">
          <label htmlFor="loginusername" className="mb-2 font-medium text-indigo-700">Username</label>
          <input
            className="rounded-md border border-solid border-indigo-300 p-[10px] bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div className="flex w-[80%] flex-col mb-4">
          <label htmlFor="loginpassword" className="mb-2 font-medium text-indigo-700">Password</label>
          <input
            className="rounded-md border border-solid border-indigo-300 p-[10px] bg-black text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button
          className="m-[10px] w-4/5 cursor-pointer rounded-md bg-indigo-600 p-[10px] text-white font-semibold transition-all duration-500 ease-in-out hover:bg-indigo-800"
          type="submit"
        >
          Login
        </button>
        <button
          className="w-4/5 cursor-pointer rounded-md bg-gray-600 p-[10px] text-white font-semibold transition-all duration-500 ease-in-out hover:bg-gray-800"
          onClick={toggleRegister}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default LoginForm;

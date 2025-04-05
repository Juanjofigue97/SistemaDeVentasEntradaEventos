import LoginForm from '../components/login/LoginForm';

const Login = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 shadow-lg text-white">
        <h1 className="text-3xl font-semibold mb-6 text-center">Iniciar sesión</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

// src/pages/Register.tsx

import RegisterForm from "../components/login/RegisterForm";

const Register = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 shadow-lg text-white">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;

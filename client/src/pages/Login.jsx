function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            HR Portal
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to manage and generate offer letters.
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="hr@company.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-lg
                       font-medium hover:bg-gray-800 transition"
          >
            Sign In
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Offer Letter Automation System
        </p>

      </div>

    </div>
  );
}

export default Login;
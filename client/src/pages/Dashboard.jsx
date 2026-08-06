import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Offer Letter Automation
            </h1>

            <p className="text-sm text-gray-500">
              HR Management Dashboard
            </p>
          </div>

          <div className="flex items-center gap-4">

            <span className="text-sm text-gray-600">
              {user?.name || "HR Admin"}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm border border-gray-300
                         rounded-lg hover:bg-gray-100 transition"
            >
              Logout
            </button>

          </div>

        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Dashboard
          </h2>

          <p className="text-gray-500 mt-1">
            Manage candidates and generate offer letters.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Total Candidates
            </p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              0
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Offers Generated
            </p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              0
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-sm text-gray-500">
              Emails Sent
            </p>

            <p className="text-3xl font-bold text-gray-900 mt-2">
              0
            </p>
          </div>

        </div>

        {/* Actions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            Quick Actions
          </h3>

          <div className="flex flex-wrap gap-4">

            <button
              className="bg-gray-900 text-white px-5 py-3 rounded-lg
                         font-medium hover:bg-gray-800 transition"
            >
              View Candidates
            </button>

            <button
              className="border border-gray-300 text-gray-700 px-5 py-3
                         rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Generate Offer
            </button>

            <button
              className="border border-gray-300 text-gray-700 px-5 py-3
                         rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Offer History
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
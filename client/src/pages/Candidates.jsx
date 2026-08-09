import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Candidates() {

    const navigate = useNavigate();

    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCandidates = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
               `${import.meta.env.VITE_API_URL}/candidates`,
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
            throw new Error("Failed to fetch candidates");
            }

            const data = await response.json();

            setCandidates(data.candidates);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
        };

        fetchCandidates();
    }, []);

    if (loading) {
        return (
        <div className="min-h-screen bg-gray-100 p-8">
            <p>Loading candidates...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-screen bg-gray-100 p-8">
            <p className="text-red-600">{error}</p>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-8">
        <div className="max-w-7xl mx-auto">

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                    Candidates
                    </h1>

                    <p className="text-gray-500 mt-2">
                    Candidates imported from Google Sheets.
                    </p>
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 border border-gray-300 bg-white rounded-lg
                            text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                    Back to Dashboard
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left">

                <thead className="bg-gray-50 border-b">
                <tr>
                    <th className="px-5 py-4">Candidate ID</th>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Designation</th>
                    <th className="px-5 py-4">Department</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Action</th>
                </tr>
                </thead>

                <tbody>
                {candidates.map((candidate, index) => (
                    <tr
                    key={candidate.candidateId || index}
                    className="border-b last:border-b-0"
                    >
                    <td className="px-5 py-4">
                        {candidate.candidateId}
                    </td>

                    <td className="px-5 py-4 font-medium">
                        {candidate.candidateName}
                    </td>

                    <td className="px-5 py-4">
                        {candidate.email}
                    </td>

                    <td className="px-5 py-4">
                        {candidate.designation}
                    </td>

                    <td className="px-5 py-4">
                        {candidate.department}
                    </td>

                    <td className="px-5 py-4">
                        {candidate.status}
                    </td>

                    <td className="px-5 py-4">
                        {candidate.status === "Offer Sent" ? (
                            <button
                                disabled
                                className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg
                                        text-sm font-medium cursor-not-allowed"
                            >
                                Offer Already Generated
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    navigate("/generate-offer", {
                                        state: { candidate },
                                    })
                                }
                                className="bg-gray-900 text-white px-4 py-2 rounded-lg
                                        text-sm font-medium hover:bg-gray-800 transition"
                            >
                                Generate Offer
                            </button>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>

            </table>

            {candidates.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                No candidates found.
                </div>
            )}
            </div>

        </div>
        </div>
  );
}

export default Candidates;
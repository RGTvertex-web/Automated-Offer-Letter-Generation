import { useEffect, useState } from "react";

function OfferHistory() {

    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    const fetchOffers = async () => {
        try {
        const token = localStorage.getItem("token");

        const response = await fetch(
        `${import.meta.env.VITE_API_URL}/offers`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        if (!response.ok) {
            throw new Error("Failed to fetch offer history");
        }

        const data = await response.json();

        setOffers(data.offers);
        } catch (error) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };

    fetchOffers();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900">
            Offer History
            </h1>

            <p className="text-gray-500 mt-2">
            View all generated offer letters.
            </p>
            {loading && (
            <p className="mt-6 text-gray-500">
                Loading offer history...
            </p>
            )}

            {error && (
            <p className="mt-6 text-red-600">
                {error}
            </p>
            )}

            {!loading && !error && (
            <div className="mt-8 bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                    <th className="px-6 py-4">Candidate</th>
                    <th className="px-6 py-4">Designation</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Stipend</th>
                    <th className="px-6 py-4">Issue Date</th>
                    <th className="px-6 py-4">Email Status</th>
                    </tr>
                </thead>

                <tbody>
                    {offers.length === 0 ? (
                    <tr>
                        <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-gray-500"
                        >
                        No offers generated yet.
                        </td>
                    </tr>
                    ) : (
                    offers.map((offer) => (
                        <tr
                        key={offer._id}
                        className="border-b border-gray-100"
                        >
                        <td className="px-6 py-4">
                            <div className="font-medium">
                            {offer.candidateName}
                            </div>

                            <div className="text-sm text-gray-500">
                            {offer.candidateEmail}
                            </div>
                        </td>

                        <td className="px-6 py-4">
                            {offer.designation}
                        </td>

                        <td className="px-6 py-4">
                            {offer.department}
                        </td>

                        <td className="px-6 py-4">
                            ₹{offer.stipendOrCTC}
                        </td>

                        <td className="px-6 py-4">
                            {new Date(offer.offerIssueDate).toLocaleDateString("en-IN")}
                        </td>

                        <td className="px-6 py-4">
                            <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                            {offer.emailStatus}
                            </span>
                        </td>
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
}

export default OfferHistory;
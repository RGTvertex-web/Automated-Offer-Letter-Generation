import { useLocation, useNavigate } from "react-router-dom";

function GenerateOffer() {
  const location = useLocation();
  const navigate = useNavigate();

  const candidate = location.state?.candidate;
  const handleGenerateOffer = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/offers/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(candidate),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate offer letter");
    }

    // Convert response into PDF blob
    const blob = await response.blob();

    // Create temporary URL for the PDF
    const url = window.URL.createObjectURL(blob);

    // Create temporary download link
    const link = document.createElement("a");
    link.href = url;
    link.download = `Offer_${candidate.candidateId}.pdf`;

    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    alert("Offer letter generated successfully!");
  } catch (error) {
    console.error("Generate offer error:", error);
    alert(error.message);
  }
  };

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900">
            No Candidate Selected
          </h2>

          <p className="text-gray-500 mt-2">
            Please select a candidate before generating an offer.
          </p>

          <button
            onClick={() => navigate("/candidates")}
            className="mt-5 bg-gray-900 text-white px-5 py-2 rounded-lg"
          >
            View Candidates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Generate Offer Letter
            </h1>

            <p className="text-gray-500 mt-2">
              Review candidate details before generating the offer.
            </p>
          </div>

          <button
            onClick={() => navigate("/candidates")}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg
                       text-gray-700 font-medium hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8">

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Candidate Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">Candidate ID</p>
              <p className="font-medium">{candidate.candidateId}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Candidate Name</p>
              <p className="font-medium">{candidate.candidateName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{candidate.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{candidate.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Designation</p>
              <p className="font-medium">{candidate.designation}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">{candidate.department}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Internship Type</p>
              <p className="font-medium">{candidate.internshipType}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Stipend</p>
              <p className="font-medium">₹{candidate.stipend}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium">{candidate.startDate}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium">{candidate.endDate}</p>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleGenerateOffer}
              type="button"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg
                         font-medium hover:bg-gray-800 transition"
            >
              Generate Offer Letter
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default GenerateOffer;
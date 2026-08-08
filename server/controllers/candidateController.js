const { sheets } = require("../config/googleSheets");

const getCandidates = async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A2:K",
    });

    const rows = response.data.values || [];

    const candidates = rows.map((row) => ({
      candidateId: row[0] || "",
      candidateName: row[1] || "",
      email: row[2] || "",
      phone: row[3] || "",
      designation: row[4] || "",
      department: row[5] || "",
      internshipType: row[6] || "",
      startDate: row[7] || "",
      endDate: row[8] || "",
      stipend: row[9] || "",
      status: row[10] || "",
    }));

    res.status(200).json({
      success: true,
      count: candidates.length,
      candidates,
    });
  } catch (error) {
    console.error("Google Sheets Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch candidates from Google Sheets",
    });
  }
};

module.exports = {
  getCandidates,
};
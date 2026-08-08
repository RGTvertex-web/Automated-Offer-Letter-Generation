const { google } = require("googleapis");
const path = require("path");

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(
    __dirname,
    "../credentials/google-service-account.json"
  ),

  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

const updateCandidateStatus = async (
  spreadsheetId,
  sheetName,
  candidateId,
  newStatus
) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
    });

    const rows = response.data.values || [];


    if (rows.length === 0) {
      throw new Error("Google Sheet is empty");
    }

    const headers = rows[0].map((header) =>
      String(header).trim().replace(/^\uFEFF/, "")
    );



    const candidateIdIndex = headers.indexOf("Candidate ID");
    const statusIndex = headers.indexOf("Status");

    if (candidateIdIndex === -1) {
      throw new Error("Candidate ID column not found");
    }

    if (statusIndex === -1) {
      throw new Error("Status column not found");
    }

    const candidateRowIndex = rows.findIndex(
      (row, index) =>
        index > 0 && row[candidateIdIndex] === candidateId
    );

    if (candidateRowIndex === -1) {
      throw new Error(
        `Candidate ${candidateId} not found in Google Sheet`
      );
    }

    const sheetRowNumber = candidateRowIndex + 1;
    const statusColumnLetter = String.fromCharCode(
      65 + statusIndex
    );

    const range = `${sheetName}!${statusColumnLetter}${sheetRowNumber}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [[newStatus]],
      },
    });

    console.log(
      `Google Sheet status updated: ${candidateId} → ${newStatus}`
    );
  } catch (error) {
    console.error(
      "Google Sheet status update error:",
      error.message
    );

    throw error;
  }
};

module.exports = {
  sheets,
  updateCandidateStatus,
};

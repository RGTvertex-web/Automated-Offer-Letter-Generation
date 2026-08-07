const PDFDocument = require("pdfkit");

const generateOfferPDF = (candidate) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 60,
      });

      const chunks = [];

      doc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });

      doc.on("error", reject);

      // Heading
      doc
        .fontSize(20)
        .font("Helvetica-Bold")
        .text("INTERNSHIP OFFER LETTER", {
          align: "center",
        });

      doc.moveDown(2);

      // Date
      doc
        .fontSize(11)
        .font("Helvetica")
        .text(
          `Date: ${new Date().toLocaleDateString("en-IN")}`
        );

      doc.moveDown(2);

      // Candidate
      doc
        .font("Helvetica-Bold")
        .text(`Dear ${candidate.candidateName},`);

      doc.moveDown();

      doc
        .font("Helvetica")
        .text(
          `We are pleased to offer you the position of ${candidate.designation} in our ${candidate.department} department.`,
          {
            align: "justify",
          }
        );

      doc.moveDown();

      doc.text(
        `We are delighted to have you join us as part of our ${candidate.internshipType} program.`
      );

      doc.moveDown(2);

      // Internship details
      doc
        .font("Helvetica-Bold")
        .text("Internship Details");

      doc.moveDown();

      doc.font("Helvetica");

      doc.text(`Candidate ID: ${candidate.candidateId}`);
      doc.text(`Designation: ${candidate.designation}`);
      doc.text(`Department: ${candidate.department}`);
      doc.text(`Internship Type: ${candidate.internshipType}`);
      doc.text(`Start Date: ${candidate.startDate}`);
      doc.text(`End Date: ${candidate.endDate}`);
      doc.text(`Stipend: Rs. ${candidate.stipend}`);

      doc.moveDown(2);

      doc.text(
        "We look forward to having you as part of our team and wish you a successful and rewarding internship experience."
      );

      doc.moveDown(3);

      doc.font("Helvetica-Bold").text("Regards,");
      doc.text("HR Department");
      doc.text("Offer Letter Automation System");

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = generateOfferPDF;
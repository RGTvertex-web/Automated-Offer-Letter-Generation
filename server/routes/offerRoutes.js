const express = require("express");
const generateOfferPDF = require("../services/pdfService");
const Offer = require("../models/Offer");
const transporter = require("../services/emailService");

const router = express.Router();


router.post("/generate", async (req, res) => {
  try {
    const candidate = req.body;

    if (!candidate || !candidate.candidateName) {
      return res.status(400).json({
        message: "Candidate details are required",
      });
    }

    console.log("Generating offer for:", candidate.candidateName);

    const [day, month, year] = candidate.startDate.split("/");

    const dateOfJoining = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
    );

    const offer = await Offer.create({
    candidateName: candidate.candidateName,
    candidateEmail: candidate.email,
    designation: candidate.designation,
    department: candidate.department,

    dateOfJoining: dateOfJoining,

    stipendOrCTC: candidate.stipend,

    reportingManager: "HR Manager",

    offerIssueDate: new Date(),

    emailStatus: "Pending",
    });

    console.log("Offer saved to MongoDB:", offer._id);

    const pdfBuffer = await generateOfferPDF(candidate);

    await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: candidate.email,
    subject: `Internship Offer Letter - ${candidate.candidateName}`,

    text: `Dear ${candidate.candidateName},

    Congratulations!

    Please find your internship offer letter attached.

    Regards,
    HR Department`,

    attachments: [
        {
        filename: `Offer_${candidate.candidateId}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
        },
    ],
    });
    offer.emailStatus = "Sent";
    await offer.save();

    console.log("Email sent successfully to:", candidate.email);
    console.log("Email status updated to Sent");
    

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
    "Content-Disposition",
    `attachment; filename="Offer_${candidate.candidateId}.pdf"`
    );

    res.send(pdfBuffer);

  } catch (error) {
    console.error("Offer generation error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        message: "Failed to generate offer letter",
      });
    }
  }
});
// Get all generated offers
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: offers.length,
      offers,
    });
  } catch (error) {
    console.error("Fetch offers error:", error);

    res.status(500).json({
      message: "Failed to fetch offers",
    });
  }
});
module.exports = router;
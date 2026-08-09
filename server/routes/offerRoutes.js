const express = require("express");
const generateOfferPDF = require("../services/pdfService");
const Offer = require("../models/Offer");
const resend = require("../services/emailService");
const { updateCandidateStatus } = require("../config/googleSheets");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Generate Offer
router.post("/generate", protect, async (req, res) => {
  try {
    const candidate = req.body;

    if (!candidate || !candidate.candidateName) {
      return res.status(400).json({
        message: "Candidate details are required",
      });
    }

    console.log("Generating offer for:", candidate.candidateName);

    // Check if an offer already exists for this candidate
    const existingOffer = await Offer.findOne({
      candidateId: candidate.candidateId,
    });

    if (existingOffer) {
      return res.status(409).json({
        message: "Offer letter has already been generated for this candidate",
      });
    }

    // Convert start date
    const [day, month, year] = candidate.startDate.split("/");

    const dateOfJoining = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    // Create offer in MongoDB
    const offer = await Offer.create({
      candidateId: candidate.candidateId,
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

    // Generate PDF
    const pdfBuffer = await generateOfferPDF(candidate);

    // ------------------------------------------------
    // Send Email
    // ------------------------------------------------

    try {
      await resend.emails.send({
          from: "onboarding@resend.dev",
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
            },
          ],
        });

      // Email successfully sent
      offer.emailStatus = "Sent";
      await offer.save();

      console.log("Email sent successfully to:", candidate.email);
      console.log("Email status updated to Sent");

    } catch (emailError) {
      // Email failed
      console.error(
        "Email sending failed:",
        emailError.message
      );

      offer.emailStatus = "Failed";
      await offer.save();

      return res.status(500).json({
        message: "Offer generated, but email could not be sent",
        error: emailError.message,
      });
    }

    // ------------------------------------------------
    // Update Google Sheet
    // ------------------------------------------------

    try {
      await updateCandidateStatus(
        process.env.GOOGLE_SHEET_ID,
        "Sheet1",
        candidate.candidateId,
        "Offer Sent"
      );

      console.log(
        `Google Sheet status updated: ${candidate.candidateId} → Offer Sent`
      );

    } catch (sheetError) {
      // Email was successful, so do not mark the offer as Failed
      console.error(
        "Google Sheet status update failed:",
        sheetError.message
      );
    }

    // ------------------------------------------------
    // Send PDF to Frontend
    // ------------------------------------------------

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Offer_${candidate.candidateId}.pdf"`
    );

    res.send(pdfBuffer);

  } catch (error) {
    console.error(
      "Offer generation error:",
      error
    );

    if (!res.headersSent) {
      res.status(500).json({
        message: "Failed to generate offer letter",
      });
    }
  }
});


// Get all generated offers
router.get("/", protect, async (req, res) => {
  try {
    const offers = await Offer.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: offers.length,
      offers,
    });

  } catch (error) {
    console.error(
      "Fetch offers error:",
      error
    );

   return res.status(500).json({
    message: "Offer generated, but email could not be sent",
    error: emailError.message,
  });
  }
});


module.exports = router;

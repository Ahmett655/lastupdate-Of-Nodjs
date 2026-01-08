const LicenseRequest = require("../models/licenseRequest");
const Payment = require("../models/paymentModel");
const generateLicenseId = require("../utils/generateLicenseId");

exports.getAllRequests = async (req, res, next) => {
  try {
    const requests = await LicenseRequest.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    res.json(requests);
  } catch (err) {
    next(err);
  }
};

// ✅ APPROVE only if payment is PAID
exports.approveRequest = async (req, res, next) => {
  try {
    const requestId = req.params.id;

    const request = await LicenseRequest.findById(requestId);
    if (!request) return res.status(404).json({ message: "Request not found" });

    const paid = await Payment.findOne({ requestId, status: "PAID" });
    if (!paid) {
      return res.status(402).json({
        message: "Payment is required before approval. (status must be PAID)",
      });
    }

    request.status = "APPROVED";
    request.licenseId = generateLicenseId();
    await request.save();

    res.json(request);
  } catch (err) {
    next(err);
  }
};

exports.updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const updated = await LicenseRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Request not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    const deleted = await LicenseRequest.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Request deleted ✅" });
  } catch (err) {
    next(err);
  }
};

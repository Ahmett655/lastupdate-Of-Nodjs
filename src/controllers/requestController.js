const LicenseRequest = require("../models/licenseRequest");

exports.createRequest = async (req, res, next) => {
  try {
    const { fullName, placeOfBirth, yearOfBirth, vehicleType } = req.body;

    if (!fullName || !placeOfBirth || !yearOfBirth) {
      return res.status(400).json({ message: "fullName, placeOfBirth, yearOfBirth are required" });
    }

    const request = await LicenseRequest.create({
      fullName,
      placeOfBirth,
      yearOfBirth,
      vehicleType: vehicleType || "A1",
      userId: req.user._id,
    });

    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};

exports.getMyRequests = async (req, res, next) => {
  try {
    const requests = await LicenseRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

exports.getRequestById = async (req, res, next) => {
  try {
    const request = await LicenseRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (err) {
    next(err);
  }
};

exports.updateRequest = async (req, res, next) => {
  try {
    const updated = await LicenseRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

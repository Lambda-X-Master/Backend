const Vendor = require("../models/vendor");
const db = require("../database/dbconfig");

exports.getVendors = async (req, res, next) => {
  try {
    const allVendors = await Vendor.getVendors();
    console.log(allVendors);
    res.status(200).json(allVendors);
  } catch (error) {
    res.status(500).json(`No vendors found: ${error}`);
  }
};

exports.getVendorById = async (req, res) => {
  try {
    const { firebase_id } = req.params;
    if (firebase_id) {
      const vendor = await Vendor.getVendorById(firebase_id);
      res.status(200).json(vendor);
    } else {
      res.status(400).json({ message: "No Vendor with that firebase Id" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Vendor could not be found in the database: ${error}` });
  }
};

exports.addVendor = async (req, res) => {
  try {
    const newVendor = req.body;
    console.log(newVendor);
    if (newVendor) {
      const vendor = await Vendor.addVendor(newVendor);
      console.log(vendor, "vendor added");
      res.status(200).json(vendor);
    } else {
      res.status(400).json({ message: "Must enter all input fields" });
    }
  } catch (error) {
    res.status(500).json({
      error: `There was an error while adding vendor to the database: ${error}`
    });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.updateVendor(req.params.id, req.body);
    if (vendor) {
      res.status(200).json(vendor);
    } else {
      res.status(400).json({ message: "Vendor is not found" });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating vendor: ${error}` });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let vendor = await Vendor.deleteVendor(id);
      res.status(200).json(vendor);
    } else {
      res.status(400).json({ message: "No vendor by that id" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `There was an error deleting vendor: ${error}` });
  }
};

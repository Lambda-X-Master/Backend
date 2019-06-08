const Vendor = require("../models/vendor");
const Market = require("../models/market");
const db = require("../database/dbconfig");

exports.getVendors = async (req, res, next) => {
  try {
    const allVendors = await Vendor.getVendors();
    // console.log(allVendors);
    res.status(200).json(allVendors);
  } catch (error) {
    res.status(500).json(`No vendors found: ${error}`);
  }
};

exports.getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const vendor = await Vendor.getVendorById(id);
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

exports.getVendorByFirebaseId = async (req, res) => {
  try {
    const { firebase_id } = req.params;
    if (firebase_id) {
      const vendor = await Vendor.getVendorByfirebaseId(firebase_id);
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
    // console.log(newVendor);
    if (newVendor) {
      const vendor = await Vendor.addVendor(newVendor);
      //   console.log(vendor, "vendor added");
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
    const vendor = await Vendor.updateVendor(req.params.firebase_id, req.body);
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
    const { firebase_id } = req.params;
    if (firebase_id) {
      let vendor = await Vendor.deleteVendor(firebase_id);
      res.status(200).json({ message: `${vendor} was deleted` });
    } else {
      res.status(400).json({ message: "No vendor by that id" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `There was an error deleting vendor: ${error}` });
  }
};

exports.getVendorByMarketFirebaseId = async (req, res) => {
  const { firebaseId } = req.params;
  try {
    const market = await Market.getMarketByfirebaseId(firebaseId);
    const vendors = await Vendor.getVendorByMarketFirebaseId(firebaseId);
    if (market) {
      res.status(200).json({ ...market, vendors });
    } else {
      res.status(404).json({ message: `market or vendor not found.` });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addVendorByFirebaseId = async (req, res) => {
  try {
    const firebase_id = req.params.firebaseId;
    if (!firebase_id) {
      res.status(404).json({ message: `You are missing firebase Id` });
    } else {
      let vendor = req.body;
      console.log("Vendor", vendor);
      const newVendor = await Vendor.addVendorByFirebaseId(
        vendor,
        firebase_id
      );
      console.log("Added vendor", newVendor);
      res.status(200).json(newVendor);
    }
  } catch (err) {
    res.status(500).json(`Can not add vendor: ${err}`);
    console.log(err);
  }
};

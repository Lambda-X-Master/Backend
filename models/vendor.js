const db = require("../database/dbconfig");

module.exports = {
  getVendors,
  getVendorById,
  addVendor,
  updateVendor,
  deleteVendor
};

function getVendors() {
  return db("vendor");
}

function getVendorById(firebase_id) {
  return db("vendor")
    .where({ 'firebase_id': firebase_id })
    .first();
}

async function addVendor(vendor) {
  const [id] = await db("vendor")
    .insert(vendor)
    .returning("id");
  return getVendorById(id);
}

function updateVendor(id, changes) {
  return db("vendor")
    .where({ id: id })
    .update(changes);
}

function deleteVendor(id) {
    return db('vendor').where({ id }).del();
}

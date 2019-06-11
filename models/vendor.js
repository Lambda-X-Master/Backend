const db = require("../database/dbconfig");

module.exports = {
  getVendors,
  getVendorById,
  addVendor,
  updateVendor,
  deleteVendor,
  findVendorBy,
  getVendorByfirebaseId,
  getVendorByMarketFirebaseId,
  addVendorByFirebaseId
};

function getVendors() {
  return db("vendor");
}

function getVendorById(id) {
  return db("vendor")
    .where({ id })
    .first();
}
function getVendorByfirebaseId(firebase_id) {
    return db("vendor")
      .where({'firebase_id': firebase_id })
      .first();
  }

async function findVendorBy(filter) {
  console.log("Filter: ", filter);
  try {
    const vendor = await db("vendor")
      .where(filter)
      .first();
    return vendor;
  } catch (error) {
    throw new Error(`Could not find vendor by (${filter})`);
  }
}

async function addVendor(vendor) {
  const [id] = await db("vendor")
    .insert(vendor)
    .returning("id");
  return getVendorById(id);
}

async function addVendorByFirebaseId(vendor, firebaseId) {
  try {
    let addedVendor = {
      ...vendor,
      firebase_id: firebaseId
    };
    const [id] = await db("vendor")
      .insert(addedVendor)
      .returning("id");
    return getVendorById(id);
  } catch (err) {
    console.log(err);
  }
}

function updateVendor(firebase_id, changes) {
  return db("vendor")
    .where({ firebase_id })
    .update(changes, "*");
}

function deleteVendor(id) {
  return db("vendor")
    .where({ 'firebase_id': id })
    .del();
}

function getVendorByMarketFirebaseId(firebaseId) {
  return db("vendor")
    .where({ 'market_id': firebaseId })
    
}

// async function addVendor(vendor, firebaseId) {
//   try {
//     let addedVendor = {
//       ...vendor,
//       firebase_id: firebaseId
//     };
//     const [id] = await db("vendor")
//       .insert(addedVendor)
//       .returning("id");
//       console.log(id)
//     return findVendorBy(id);
//   } catch (err) {
//     console.log(err);
//   }
// }
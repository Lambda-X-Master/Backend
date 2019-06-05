const admin = require("firebase-admin");
const client = admin.initializeApp();

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    client
      .auth()
      .verifyIdToken(token)
      .then(decodedToken => {
        req.user = decodedToken.uid;
        return next();
      })
      .catch(err => {
        console.error("Error while verifying Firebase Id token:", err);
        res.status(403).send("Unauthorized");
      });
  } else {
    res
      .status(401)
      .json({ message: "Log in and provide token to view this content." });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 5140b362a22df1da27e380c31768d8364efa2779

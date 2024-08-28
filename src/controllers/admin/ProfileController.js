const pool = require("../../configs/Databases");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  profile(req, res) {
    let id = req.session.username;
    pool.getConnection(function (err, connection) {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(500).send("Internal Server Error");
      }

      const query = `
                SELECT auth.*, siswa.* 
                FROM auth 
                JOIN siswa ON siswa.nis = auth.nis_siswa 
                WHERE username = ?;
            `;

      connection.query(query, [id], function (error, results) {
        if (error) {
          console.error("Database query error:", error);
          return res.status(500).send("Internal Server Error");
        }

        if (results.length > 0) {
          res.render("siswa/profile", {
            userName: req.session.username,
            nama_user: results[0]["username"],
            nama_siswa: results[0]["nama_siswa"],
            nis: results[0]["nis"],
            kelas: results[0]["kelas"],
            nama_wali: results[0]["nama_wali"],
            gender: results[0]["gender"],
          });
        } else {
          res.status(404).send("Profile not found");
        }
      });

      connection.release();
    });
  },
};

const connection = require('../configs/Databases');

//


const getSiswa = async (id_kelas = null) => {
    return new Promise((resolve, reject) => {
        let query = `
          SELECT siswa.*, kelas.nama_kelas AS nama_kelas, tahun_ajaran.nama_ajaran AS nama_ajaran FROM siswa JOIN kelas ON siswa.id_kelas = kelas.id_kelas JOIN tahun_ajaran ON siswa.idth = tahun_ajaran.idth
        `;

        const params = [];

        // If `id_kelas` is provided, filter by class
        if (id_kelas) {
            query += ` WHERE siswa.id_kelas = ?`;
            params.push(id_kelas);
        }

        query += ` ORDER BY siswa.id_siswa`;

        // Execute the query with or without filtering by class
        connection.query(query, params, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};


const getSiswaById = async (id_siswa) => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT * FROM siswa WHERE id_siswa = ?
        `, [id_siswa], (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Siswa tidak ditemukan'));
            }
            resolve(result[0]);
        });
    });
}
const getInfoSiswa = async (nis) => {
    return new Promise((resolve, reject) => {
        connection.query(`
         SELECT siswa.*, kelas.nama_kelas as nama_kelas 
          FROM siswa 
          JOIN kelas ON siswa.id_kelas = kelas.id_kelas WHERE nis = ?
        `, [nis], (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Siswa tidak ditemukan'));
            }
            resolve(result[0]);
        });
    });
}

const InsertSiswa = async (
    nis, nama_siswa, tlp, tgl_lahir, id_kelas, idth, jk, nama_wali, alamat, pekerjaan_wali, password, foto
  ) => {
    return new Promise((resolve, reject) => {
      // Cek apakah NIS sudah ada
      connection.query(`
        SELECT * FROM siswa WHERE nis = ?
      `, [nis], (error, results) => {
        if (error) return reject(error);
  
        if (results.length > 0) {
          return reject(new Error('NIS sudah digunakan, tidak boleh menambahkan data NIS yang sama'));
        }
  
        // Jika NIS belum ada, lanjutkan insert data
        connection.query(`
          INSERT INTO siswa 
          (nis, nama_siswa, tlp, tgl_lahir, id_kelas, idth, jk, nama_wali, alamat, pekerjaan_wali, password, foto) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [nis, nama_siswa, tlp, tgl_lahir, id_kelas, idth, jk, nama_wali, alamat, pekerjaan_wali, password, foto], 
        (insertError, insertResults) => {
          if (insertError) return reject(insertError);
          resolve(insertResults);
        });
      });
    });
  };

  const UpdateSiswa = async (id_siswa, nis, nama_siswa, tlp, tgl_lahir, id_kelas, idth, jk, nama_wali, alamat, pekerjaan_wali, password, foto) => {
    return new Promise((resolve, reject) => {
        // Logging untuk melihat data yang masuk ke dalam query
        

        connection.query(`
            SELECT * FROM siswa WHERE id_siswa = ?
        `, [id_siswa], (error, results) => {
            if (error) {
                console.error("Error SELECT siswa:", error);
                return reject(error);
            }

            if (results.length === 0) {
                console.error("Siswa tidak ditemukan dengan id_siswa:", id_siswa);
                return reject(new Error('Data siswa tidak ditemukan'));
            }

            // Update data siswa
            connection.query(`
                UPDATE siswa 
                SET nis = ?, nama_siswa = ?, tlp =?, tgl_lahir = ?, id_kelas = ?, idth = ?, jk = ?, nama_wali = ?, alamat = ?,pekerjaan_wali = ?, password = ?, foto = ? 
                WHERE id_siswa = ?
            `, [nis, nama_siswa, tlp, tgl_lahir, id_kelas, idth, jk, nama_wali, alamat, pekerjaan_wali, password, foto, id_siswa], (updateError, updateResults) => {
                if (updateError) {
                    console.error("Error UPDATE siswa:", updateError);
                    return reject(updateError);
                }

                // Logging jika update berhasil
                console.log("Berhasil mengupdate data siswa dengan id:", id_siswa);
                resolve(updateResults);
            });
        });
    });
};

const DeleteSiswa = async (id_siswa) => {
    return new Promise ((resolve, reject) => {
       
                connection.query(`
                    DELETE FROM siswa WHERE id_siswa = ?
                    `, [id_siswa], (deleteError,deleteResults) => {
                        if(deleteError) return reject(deleteError)
                        resolve(deleteResults);
                    })

            
    })
}
const GetSiswaKelas = async (id_kelas) => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT siswa.*, kelas.nama_kelas AS nama_kelas, tahun_ajaran.nama_ajaran AS nama_ajaran FROM siswa JOIN kelas ON siswa.id_kelas = kelas.id_kelas JOIN tahun_ajaran ON siswa.idth = tahun_ajaran.idth WHERE siswa.id_kelas = ? order by siswa.nis; 
        `,[id_kelas], (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

module.exports = { getSiswa, getSiswaById, InsertSiswa, UpdateSiswa, DeleteSiswa, GetSiswaKelas, getInfoSiswa };

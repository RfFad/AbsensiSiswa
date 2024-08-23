const connection = require('../configs/Databases');

const getSiswa = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT siswa.*, kelas.nama_kelas as nama_kelas FROM siswa join kelas on siswa.id_kelas = kelas.id_kelas order by siswa.id_siswa 
        `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

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

const InsertSiswa = async (nis, nama_siswa, id_kelas, jk, nama_wali, alamat,password) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM siswa WHERE nis = ?
        `, [nis], (error, results) => {
            if (error) return reject(error);

            if (results.length > 0) {
                return reject(new Error('NIS sudah digunakan, tidak boleh menambahkan data NIS yang sama'));
            }
           
            // Insert data
            connection.query(`
                INSERT INTO siswa (nis, nama_siswa, id_kelas, jk, nama_wali, alamat,password) VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [nis, nama_siswa, id_kelas, jk, nama_wali, alamat,password], (insertError, insertResults) => {
                if (insertError) return reject(insertError);
                resolve(insertResults);
            });
        });
    });
}

const UpdateSiswa = async (id_siswa, nis, nama_siswa, id_kelas, jk, nama_wali, alamat,password) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM siswa WHERE id_siswa = ?
        `, [id_siswa], (error, results) => {
            if (error) return reject(error);

            if (results.length === 0) {
                return reject(new Error('Data siswa tidak ditemukan'));
            }

            // Update data
            connection.query(`
                UPDATE siswa 
                SET nis = ?, nama_siswa = ?, id_kelas = ?, jk = ?, nama_wali = ?, alamat = ?, password = ? 
                WHERE id_siswa = ?
            `, [nis, nama_siswa, id_kelas, jk, nama_wali, alamat,password, id_siswa], (updateError, updateResults) => {
                if (updateError) return reject(updateError);
                resolve(updateResults);
            });
        });
    });
}
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

module.exports = { getSiswa, getSiswaById, InsertSiswa, UpdateSiswa, DeleteSiswa };

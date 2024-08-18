const connection = require('../configs/Databases');

const getGuru = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT * FROM guru 
        `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

const getGuruById = async (id_guru) => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT * FROM guru WHERE id_guru = ?
        `, [id_guru], (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Guru tidak ditemukan'));
            }
            resolve(result[0]);
        });
    });
}

const InsertGuru = async (nip, nama_guru, jk, jabatan, alamat, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM guru WHERE nip = ?
        `, [nip], (error, results) => {
            if (error) return reject(error);

            if (results.length > 0) {
                return reject(new Error('NIP sudah digunakan, tidak boleh menambahkan data NIP yang sama'));
            }
            // Insert data
            connection.query(`
                INSERT INTO guru (nip, nama_guru, jk, jabatan, alamat, password) VALUES (?, ?, ?, ?, ?, ?)
            `, [nip, nama_guru, jk, jabatan, alamat, password], (insertError, insertResults) => {
                if (insertError) return reject(insertError);
                resolve(insertResults);
            });
        });
    });
}

const UpdateGuru = async (id_guru, nip, nama_guru, jk, jabatan, alamat, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM guru WHERE id_guru = ?
        `, [id_guru], (error, results) => {
            if (error) return reject(error);

            if (results.length === 0) {
                return reject(new Error('Data guru tidak ditemukan'));
            }

            // Update data
            connection.query(`
                UPDATE guru 
                SET nip = ?, nama_guru = ?, jk = ?, jabatan = ?, alamat = ?, password = ? 
                WHERE id_guru = ?
            `, [nip, nama_guru, jk, jabatan, alamat, password, id_guru], (updateError, updateResults) => {
                if (updateError) return reject(updateError);
                resolve(updateResults);
            });
        });
    });
}
const DeleteGuru = async (id_guru) => {
    return new Promise ((resolve, reject) => {
       
                connection.query(`
                    DELETE FROM guru WHERE id_guru = ?
                    `, [id_guru], (deleteError,deleteResults) => {
                        if(deleteError) return reject(deleteError)
                        resolve(deleteResults);
                    })

            
    })
}

module.exports = { getGuru, getGuruById, InsertGuru, UpdateGuru, DeleteGuru };

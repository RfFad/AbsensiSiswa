const connection = require('../configs/Databases');

const getSekolah = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM sekolah 
        `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result[0]);
        });
    });
}

const getSekolahById = async (id_sekolah) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM sekolah WHERE id_sekolah = ?',
            [id_sekolah],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                if (result.length === 0) {
                    return reject(new Error('Data Sekolah Tidak Ditemukan'));
                }
                resolve(result[0]);
            }
        );
    });
};

const updateSekolah = async (id_sekolah, nama, kode, email, alamat) => {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE sekolah SET nama = ?, kode = ?, email = ?, alamat = ? WHERE id_sekolah = ?',
            [nama, kode, email, alamat, id_sekolah],
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
    });
};

module.exports = { getSekolahById, updateSekolah, getSekolah };

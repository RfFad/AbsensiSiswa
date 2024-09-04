const connection = require('../configs/Databases');

const getRiwayat = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT riwayat.*, siswa.nama_siswa as nama_siswa FROM riwayat join siswa on riwayat.id_siswa = siswa.id_siswa order by riwayat.id_riwayat 
        `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}

const getRiwayatById = async (id_riwayat) => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT * FROM riwayat WHERE id_riwayat = ?
        `, [id_riwayat], (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Riwayat tidak ditemukan'));
            }
            resolve(result[0]);
        });
    });
}

const InsertRiwayat = async (id_siswa, id_kelas, prestasi, pelanggaran, tanggal) => {
    return new Promise((resolve, reject) => {
            // Insert data
            connection.query(`
                INSERT INTO riwayat (id_siswa, id_kelas, prestasi, pelanggaran, tanggal) VALUES (?, ?, ?, ?, ?)
            `, [id_siswa, id_kelas, prestasi, pelanggaran, tanggal], (insertError, insertResults) => {
                if (insertError) return reject(insertError);
                resolve(insertResults);
            });
        ;
    });
}

const UpdateRiwayat = async (id_riwayat, id_siswa, id_kelas, prestasi, pelanggaran, tanggal) => {
    return new Promise((resolve, reject) => {
        // Check if the record exists
        connection.query(`
            SELECT * FROM riwayat WHERE id_riwayat = ?
        `, [id_riwayat], (error, results) => {
            if (error) return reject(error);

            if (results.length === 0) {
                return reject(new Error('Data siswa tidak ditemukan'));
            }

            // Update the record
            connection.query(`
                UPDATE riwayat 
                SET id_siswa = ?, id_kelas = ?, prestasi = ?, pelanggaran = ?, tanggal = ?
                WHERE id_riwayat = ?
            `, [id_siswa, id_kelas, prestasi, pelanggaran, tanggal, id_riwayat], (updateError, updateResults) => {
                if (updateError) return reject(updateError);
                resolve(updateResults);
            });
        });
    });
}

const DeleteRiwayat = async (id_riwayat) => {
    return new Promise ((resolve, reject) => {
       
                connection.query(`
                    DELETE FROM riwayat WHERE id_riwayat = ?
                    `, [id_riwayat], (deleteError,deleteResults) => {
                        if(deleteError) return reject(deleteError)
                        resolve(deleteResults);
                    })

            
    })
}

module.exports = { getRiwayat, getRiwayatById, InsertRiwayat, UpdateRiwayat, DeleteRiwayat };

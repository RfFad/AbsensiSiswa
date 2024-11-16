const connection = require('../configs/Databases');

const getRiwayat = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT riwayat.*, siswa.nama_siswa as nama_siswa, kelas.nama_kelas AS nama_kelas FROM riwayat join siswa on riwayat.id_siswa = siswa.id_siswa JOIN kelas ON riwayat.id_kelas = kelas.id_kelas order by riwayat.id_riwayat 
        `, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
}
const getRiwayatBySiswa = async (nis) => {
    // Return a Promise to handle asynchronous database query
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                riwayat.*, 
                siswa.nama_siswa AS nama_siswa, 
                kelas.nama_kelas AS nama_kelas 
            FROM 
                riwayat 
            JOIN 
                siswa 
            ON 
                riwayat.id_siswa = siswa.id_siswa 
            JOIN 
                kelas 
            ON 
                riwayat.id_kelas = kelas.id_kelas  
            WHERE 
                siswa.nis = ? 
            ORDER BY 
                riwayat.tanggal
        `;

        // Perform the database query
        connection.query(query, [nis], (error, results) => {
            if (error) {
                // Reject the Promise with the error if the query fails
                return reject(error);
            }
            // Resolve the Promise with the query results
            resolve(results);
        });
    });
};

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

const InsertRiwayat = async (id_siswa, id_kelas, jenis_riwayat, deskripsi, tanggal) => {
    return new Promise((resolve, reject) => {
            // Insert data
            connection.query(`
                INSERT INTO riwayat (id_siswa, id_kelas, jenis_riwayat, deskripsi, tanggal) VALUES (?, ?, ?, ?, ?)
            `, [id_siswa, id_kelas, jenis_riwayat, deskripsi, tanggal], (insertError, insertResults) => {
                if (insertError) return reject(insertError);
                resolve(insertResults);
            });
        ;
    });
}

const UpdateRiwayat = async (id_riwayat, id_siswa, id_kelas, jenis_riwayat, deskripsi, tanggal) => {
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
                SET id_siswa = ?, id_kelas = ?, jenis_riwayat = ?, deskripsi = ?, tanggal = ?
                WHERE id_riwayat = ?
            `, [id_siswa, id_kelas, jenis_riwayat, deskripsi, tanggal, id_riwayat], (updateError, updateResults) => {
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

module.exports = { getRiwayat, getRiwayatBySiswa, getRiwayatById, InsertRiwayat, UpdateRiwayat, DeleteRiwayat };

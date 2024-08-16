
const connection = require('../configs/Databases'); // Adjust if necessary

const getKelas = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT * FROM kelas 
            `, (error, result) => {
                if(error) {
                    return reject (error) ;
                }
                resolve(result);
            })
    })
}

const InsertKelas = async (nama_kelas) => {
    return new Promise((resolve, reject) => {
        // Check if nama_kelas already exists
        connection.query(`
            SELECT * FROM kelas WHERE nama_kelas = ?
        `, [nama_kelas], (error, results) => {
            if (error) return reject(error);

            if (results.length > 0) {
                return reject(new Error('Nama kelas sudah ada, tidak bisa menambahkan data yang sama.'));
            }

            // Insert the new nama_kelas if it doesn't exist
            connection.query(`
                INSERT INTO kelas (nama_kelas) VALUES (?)
            `, [nama_kelas], (insertError, insertResults) => {
                if (insertError) return reject(insertError);
                resolve(insertResults);
            });
        });
    });
};

module.exports = { InsertKelas, getKelas };

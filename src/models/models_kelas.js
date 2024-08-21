
const connection = require('../configs/Databases'); // Adjust if necessary
const getKelasById = async (id_kelas) => {
    return new Promise((resolve, reject) => {
        connection.query(`
           SELECT * FROM kelas WHERE id_kelas = ? 
            `, [id_kelas], (error, result) => {
                if(error){
                    return reject(error);
                }
                if(result.length === 0){
                    return reject (new Error('Kelas TIdak Ditemukan'));
                }
                resolve(result[0]);
            })
    })
}
const getKelas = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT * FROM kelas ORDER BY id_kelas
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

const UpdateKelas = async (id_kelas, nama_kelas) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM kelas WHERE id_kelas = ?
            `, [id_kelas], (error, results) => {
                if (error) return reject(error);

                if(results.length === 0){
                    return reject(new Error('Data kelas tidak ditemukan'));
                }

                connection.query (`
                   UPDATE kelas SET nama_kelas = ?  WHERE id_kelas = ?
                    `, [nama_kelas, id_kelas], (updateError, updateResults) => {
                        if(updateError) return reject (updateError);
                        resolve(updateResults);
                    })
            })
    })
}
const DeleteKelas = async (id_kelas) => {
    return new Promise ((resolve, reject) => {
       
                connection.query(`
                    DELETE FROM kelas WHERE id_kelas = ?
                    `, [id_kelas], (deleteError,deleteResults) => {
                        if(deleteError) return reject(deleteError)
                        resolve(deleteResults);
                    })

            
    })
}
module.exports = { InsertKelas, getKelas, getKelasById, UpdateKelas, DeleteKelas };


const connection = require('../configs/Databases'); // Adjust if necessary
const getMapelById = async (idm) => {
    return new Promise((resolve, reject) => {
        connection.query(`
           SELECT * FROM mata_pelajaran WHERE idm = ? 
            `, [idm], (error, result) => {
                if(error){
                    return reject(error);
                }
                if(result.length === 0){
                    return reject (new Error('Mapel TIdak Ditemukan'));
                }
                resolve(result[0]);
            })
    })
}
const getMapelByName = async (nama_mp) => {
    return new Promise((resolve, reject) => {
        connection.query(`
           SELECT * FROM mata_pelajaran WHERE nama_mp = ? 
            `, [nama_mp], (error, result) => {
                if(error){
                    return reject(error);
                }
                if(result.length === 0){
                    return reject (new Error('Mapel TIdak Ditemukan'));
                }
                resolve(result[0]);
            })
    })
}
const getMapel = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT * FROM mata_pelajaran ORDER BY idm
            `, (error, result) => {
                if(error) {
                    return reject (error) ;
                }
                resolve(result);
            })
    })
}

const InsertMapel = async (nama_mp) => {
    return new Promise((resolve, reject) => {
        // Check if nama_mp already exists
        connection.query(`
            SELECT * FROM mata_pelajaran WHERE nama_mp = ?
        `, [nama_mp], (error, results) => {
            if (error) return reject(error);

            if (results.length > 0) {
                return reject(new Error('Nama Mapel sudah ada, tidak bisa menambahkan data yang sama.'));
            }

            // Insert the new nama_mp if it doesn't exist
            connection.query(`
                INSERT INTO mata_pelajaran (nama_mp) VALUES (?)
            `, [nama_mp], (insertError, insertResults) => {
                if (insertError) return reject(insertError);
                resolve(insertResults);
            });
        });
    });
};

const UpdateMapel = async (idm, nama_mp) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM mata_pelajaran WHERE idm = ?
            `, [idm], (error, results) => {
                if (error) return reject(error);

                if(results.length === 0){
                    return reject(new Error('Data Mapel tidak ditemukan'));
                }

                connection.query (`
                   UPDATE mata_pelajaran SET nama_mp = ?  WHERE idm = ?
                    `, [nama_mp, idm], (updateError, updateResults) => {
                        if(updateError) return reject (updateError);
                        resolve(updateResults);
                    })
            })
    })
}
const DeleteMapel = async (idm) => {
    return new Promise ((resolve, reject) => {
       
                connection.query(`
                    DELETE FROM mata_pelajaran WHERE idm = ?
                    `, [idm], (deleteError,deleteResults) => {
                        if(deleteError) return reject(deleteError)
                        resolve(deleteResults);
                    })

            
    })
}
module.exports = { InsertMapel, getMapelByName, getMapel, getMapelById, UpdateMapel, DeleteMapel };

const connect = require('../configs/Databases');

const getHari = async () => {
    return new Promise((resolve, reject) => {
        connect.query(`
          SELECT * FROM hari ORDER BY idh
            `, (error, result) => {
                if(error) {
                    return reject (error) ;
                }
                resolve(result);
            })
    })
}

const InsertHari = async (hari) => {
    return new Promise ((resolve, reject) => {
        connect.query(`
            SELECT * FROM hari WHERE hari = ?
            `, [hari], (error, results) => {
                if(error) return reject (error)
                    if(results.length > 0) {
                        return reject(new Error('Hari tidak boleh sama'))
                    };
                connect.query(`
                   INSERT INTO hari (hari) VALUES (?) 
                    `, [hari], (InsertError, InsertResults)=> {
                    if(InsertError) return reject (error);
                    resolve(InsertResults);
                });
            })
    })
}
const HariById = async ( idh ) => {
    return new Promise((resolve, reject) => {
        connect.query (`
            SELECT * FROM hari WHERE idh = ?
            `, [idh], (error, results) => {
                if(error){
                    return reject (error);
                }
                if(results.length === 0) {
                    return reject (new Error('Hari Tidak ada'));
                }
                resolve(results[0]);
            })
    })
}
const UpdateHari = async (idh, hari) => {
    return new Promise((resolve, reject) => {
        connect.query(`
            SELECT * FROM hari WHERE idh = ?
            `, [idh], (error, results) => {
                if (error) return reject(error);

                if(results.length === 0){
                    return reject(new Error('Data hari tidak ditemukan'));
                }

                connect.query (`
                   UPDATE hari SET hari = ?  WHERE idh = ?
                    `, [hari, idh], (updateError, updateResults) => {
                        if(updateError) return reject (updateError);
                        resolve(updateResults);
                    })
            })
    })
}
const DeleteHari = async (idh) => {
    return new Promise ((resolve, reject) => {
       
                connect.query(`
                    DELETE FROM hari WHERE idh = ?
                    `, [idh], (deleteError,deleteResults) => {
                        if(deleteError) return reject(deleteError)
                        resolve(deleteResults);
                    })

            
    })
}

module.exports = {HariById, UpdateHari, InsertHari, getHari, DeleteHari};
const connect = require('../configs/Databases');

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
    return new Promise((reject, resolve) => {
        connect (`
            SELECT * FROM hari WHERE idh = ?
            `, idh, (error, results) => {
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
    return new Promise((reject, resolve) => {
        connect.query (`
          SELECT * FROM hari WHERE hari = ?  
            `, [hari], (error,results) => {
                if(error) return reject (error);
                if(results.length > 0) return reject (new Error('Gagal Update Karena Data Ada Yang Sama'));

                connect.query(`
                   UPDATE SET hari hari = ? WHERE idh = ?
                    `, hari, idh, (error, results) => {
                        if(error) return reject (error);
                        resolve(results)
                    })
            })

    })
}

module.exports = {HariById, UpdateHari, InsertHari};
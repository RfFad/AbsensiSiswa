const connect = require('../configs/Databases');
const tahunajar = {
 getTahunAjar : async () => {
    return new Promise((resolve, reject) => {
        connect.query(`
          SELECT * FROM tahun_ajaran ORDER BY idth
            `, (error, result) => {
                if(error) {
                    return reject (error) ;
                }
                resolve(result);
            })
    })
},

 InsertTahunAjar : async (nama_ajaran, status) => {
    return new Promise ((resolve, reject) => {
        connect.query(`
            SELECT * FROM tahun_ajaran WHERE nama_ajaran = ?
            `, [nama_ajaran], (error, results) => {
                if(error) return reject (error)
                    if(results.length > 0) {
                        return reject(new Error('Hari tidak boleh sama'))
                    };
                connect.query(`
                   INSERT INTO tahun_ajaran (nama_ajaran, status) VALUES (?, ?) 
                    `, [nama_ajaran, status], (InsertError, InsertResults)=> {
                    if(InsertError) return reject (error);
                    resolve(InsertResults);
                });
            })
    })
},
 TahunById : async ( idth ) => {
    return new Promise((resolve, reject) => {
        connect.query (`
            SELECT * FROM tahun_ajaran WHERE idth = ?
            `, [idth], (error, results) => {
                if(error){
                    return reject (error);
                }
                if(results.length === 0) {
                    return reject (new Error('Hari Tidak ada'));
                }
                resolve(results[0]);
            })
    })
},
getTahunAjaranByName : async ( nama_ajaran ) => {
    return new Promise((resolve, reject) => {
        connect.query (`
            SELECT * FROM tahun_ajaran WHERE nama_ajaran = ?
            `, [nama_ajaran], (error, results) => {
                if(error){
                    return reject (error);
                }
                if(results.length === 0) {
                    return reject (new Error('Hari Tidak ada'));
                }
                resolve(results[0]);
            })
    })
},
 UpdateTahun : async (idth, nama_ajaran, status) => {
    return new Promise((resolve, reject) => {
        connect.query(`
            SELECT * FROM tahun_ajaran WHERE idth = ?
            `, [idth], (error, results) => {
                if (error) return reject(error);

                if(results.length === 0){
                    return reject(new Error('Data hari tidak ditemukan'));
                }

                connect.query (`
                   UPDATE tahun_ajaran SET nama_ajaran = ?, status= ?  WHERE idth = ?
                    `, [nama_ajaran, status, idth], (updateError, updateResults) => {
                        if(updateError) return reject (updateError);
                        resolve(updateResults);
                    })
            })
    })
},
 DeleteAjaran : async (idth) => {
    return new Promise ((resolve, reject) => {
       
                connect.query(`
                    DELETE FROM tahun_ajaran WHERE idth = ?
                    `, [idth], (deleteError,deleteResults) => {
                        if(deleteError) return reject(deleteError)
                        resolve(deleteResults);
                    })

            
    })
}
}
module.exports = tahunajar;
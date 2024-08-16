const connection = require('../configs/Databases');

const getGuru = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT * FROM guru 
            `, (error, result) => {
                if(error) {
                    return reject (error) ;
                }
                resolve(result);
            })
    })
}

const InsertGuru = async (nip, nama_guru, jk, jabatan, alamat, password) => {
    return new Promise((resolve, reject) => {
            connection.query(`
                SELECT * FROM guru WHERE nip = ?
                `, [nip], (error, results) => {
                    if(error) return reject (error)

                    if(results.length > 0) {
                        return reject(new Error('nip sudah digunakan, tidak boleh menambahkan data nip yang sama'))
                    }
                    //insert data
                    connection.query(`
                        INSERT INTO guru (nip, nama_guru, jk, jabatan, alamat, password) VALUES (?, ?, ?, ?, ?, ?)
                        `, [nip, nama_guru, jk, jabatan, alamat, password], (insertError,insertResults) => {
                            if(insertError) return reject(insertError);
                            resolve(insertResults)
                        })
        })
    })
}
module.exports ={ InsertGuru, getGuru }; 
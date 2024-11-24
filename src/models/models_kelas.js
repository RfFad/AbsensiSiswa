
const connection = require('../configs/Databases'); // Adjust if necessary
const getKelasByName = (nama_kelas) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM kelas WHERE nama_kelas = ?", [nama_kelas], (error, results) => {
        if (error) {
          reject(error); // Jika ada error, reject promise
        } else {
          resolve(results.length > 0 ? results[0] : null); // Resolusi data
        }
      });
    });
}
const updateKenaikan = (id_siswa, { id_kelas }) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE siswa SET id_kelas = ? WHERE id_siswa = ?";
      connection.query(query, [id_kelas, id_siswa], (error, results) => {
        if (error) {
          reject(error); // Jika error, reject promise
        } else {
          resolve(results); // Jika berhasil, resolve dengan hasil query
        }
      });
    });
  };
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
                INSERT INTO kelas (nama_kelas, id_sekolah) VALUES (?, 1)
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
module.exports = { InsertKelas, updateKenaikan, getKelasByName, getKelas, getKelasById, UpdateKelas, DeleteKelas };

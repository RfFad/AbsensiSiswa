
const db = require('../configs/Databases')

module.exports = {
    dataUser : async() => {

            return new Promise((resolve, reject) =>{
                db.query(`SELECT * FROM user`, (error, result) => {
                    if(error){
                        return reject(error)
                    }
                    resolve(result);
                })
            })
        
    },
    userByid : async(id_user) => {

            return new Promise((resolve, reject) =>{
                db.query(`SELECT * FROM user WHERE id_user = ?`, [id_user], (error, result) => {
                    if(error){
                        return reject(error)
                    }
                    resolve(result[0]);
                })
            })
        
    },
    adminFp : async(username) => {

            return new Promise((resolve, reject) =>{
                db.query(`SELECT * FROM user WHERE username = ?`, [username], (error, result) => {
                    if(error){
                        return reject(error)
                    }
                    resolve(result[0]);
                })
            })
        
    },
    insertUser : async (username, email, password, jk, foto) => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT * FROM user WHERE username = ?
              `, [username], (error, results) => {
                if (error) return reject(error);
          
                if (results.length > 0) {
                  return reject(new Error('username sudah digunakan, tidak boleh menambahkan data NIS yang sama'));
                }
            db.query(`INSERT INTO user (username, email, password, jk, foto, id_sekolah) VALUES (?, ?, ?, ?, ?, 1     )`, [username, email, password, jk, foto], (error, result) => {
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
              })
        })
    },
    updateUser : async (id_user, username, email, password, jk, foto) => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT * FROM user WHERE id_user = ?
        `, [id_user], (error, results) => {
            if (error) return reject(error);

            if (results.length === 0) {
                return reject(new Error('Data user tidak ditemukan'));
            }
            db.query(`UPDATE user SET username = ?, email = ?, password = ?, jk = ?, foto = ? WHERE id_user = ?`, [username, email, password, jk, foto, id_user], (error, result) => {
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
              })
        })
    },
    deleteUser : async(id_user) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM user WHERE id_user = ?`, [id_user], (error, result) => {
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    }

}
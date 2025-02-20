const { resolve } = require('path');
const connection = require('../configs/Databases');

const getGuru = async (nama_guru = null, alamat = null, jk = null, jabatan = null, nama_mp = null, nip=null) => {
    return new Promise((resolve, reject) => {
       let query = ` SELECT guru.*, mata_pelajaran.nama_mp FROM guru JOIN mata_pelajaran ON guru.idm = mata_pelajaran.idm `

       const params = [];
       const condition = [];

       if(nama_guru){
        condition.push(`guru.nama_guru LIKE ?`)
        params.push(`%${nama_guru}%`);
       }
       if(alamat){
        condition.push(`guru.alamat LIKE ?`)
        params.push(`%${alamat}%`);
       }
       if(jk){
        condition.push(`guru.jk LIKE ?`)
        params.push(`%${jk}%`);
       }
       if(jabatan){
        condition.push(`guru.jabatan LIKE ?`)
        params.push(`%${jabatan}%`);
       }
       if(nip){
        condition.push(`guru.nip LIKE ?`)
        params.push(`%${nip}%`);
       }
       if(nama_mp){
        condition.push(`mata_pelajaran.idm = ?`)
        params.push(nama_mp);
       }
       if(condition.length > 0){
        query += `WHERE ` + condition.join (" AND ");
       }
       query += ` ORDER BY guru.id_guru `;

        connection.query(query, params, (error, result) => {
            if(error){
                return reject(error)
            }
            resolve(result);
        });
    });
}
const getInfoGuru = async (nip) => {
    return new Promise((resolve, reject) => {
        connection.query(`
        SELECT guru.*, mata_pelajaran.nama_mp FROM guru JOIN mata_pelajaran ON guru.idm = mata_pelajaran.idm WHERE nip = ?
        `, [nip], (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Guru tidak ditemukan'));
            }
            resolve(result[0]);
        });
    });
}
const getGuruById = async (id_guru) => {
    return new Promise((resolve, reject) => {
        connection.query(`
          SELECT * FROM guru WHERE id_guru = ?
        `, [id_guru], (error, result) => {
            if (error) {
                return reject(error);
            }
            if (result.length === 0) {
                return reject(new Error('Guru tidak ditemukan'));
            }
            resolve(result[0]);
        });
    });
}

const InsertGuru = async (nip, nama_guru, idm, jk, jabatan, alamat, tlp, password, foto) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM guru WHERE nip = ?
        `, [nip], (error, results) => {
            if (error) return reject(error);

            if (results.length > 0) {
                return reject(new Error('NIP sudah digunakan, tidak boleh menambahkan data NIP yang sama'));
            }
            // Insert data
            connection.query(`
                INSERT INTO guru (nip, nama_guru, idm, jk, jabatan, alamat, tlp, password, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [nip, nama_guru, idm, jk, jabatan, alamat, tlp, password, foto], (insertError, insertResults) => {
                if (insertError) return reject(insertError);
                resolve(insertResults);
            });
        });
    });
}

const UpdateGuru = async (id_guru, nip, nama_guru, idm, jk, jabatan, alamat, tlp, password, foto) => {
    return new Promise((resolve, reject) => {
        connection.query(`
            SELECT * FROM guru WHERE id_guru = ?
        `, [id_guru], (error, results) => {
            if (error) return reject(error);

            if (results.length === 0) {
                return reject(new Error('Data guru tidak ditemukan'));
            }

            // Update data
            connection.query(`
                UPDATE guru 
                SET nip = ?, nama_guru = ?, idm = ?, jk = ?, jabatan = ?, alamat = ?, tlp = ?, password = ?, foto = ? 
                WHERE id_guru = ?
            `, [nip, nama_guru, idm, jk, jabatan, alamat, tlp, password, foto, id_guru], (updateError, updateResults) => {
                if (updateError) return reject(updateError);
                resolve(updateResults);
            });
        });
    });
}
const DeleteGuru = async (id_guru) => {
    return new Promise ((resolve, reject) => {
       
                connection.query(`
                    DELETE FROM guru WHERE id_guru = ?
                    `, [id_guru], (deleteError,deleteResults) => {
                        if(deleteError) return reject(deleteError)
                        resolve(deleteResults);
                    })

            
    })
}
const deleteSelectedGuru = async(req, res) => {
    const {id_guru} = req.body;
    if (!Array.isArray(id_guru) || id_guru.length === 0) {
        return res.status(400).json({ message: 'Tidak ada data yang dipilih.' });
      }

    try {
        const result = await new Promise((resolve, reject)=> {
            const placeholder = id_guru.map(()=>'?').join(',');
            const query = `DELETE FROM guru WHERE id_guru IN(${placeholder})`
            connection.query(query, id_guru, (error, result) => {
                if(error){
                    return reject(error);
                }
                resolve(result);
            });
        });
        res.status(200).json({messages:'Data berhasil dihapus.'})
    } catch (error) {
        console.error('Error:', error);
        res.status(404).json({messages:'gagal menghapus'})
    }
}

module.exports = { getGuru, getInfoGuru, getGuruById, InsertGuru, UpdateGuru, DeleteGuru, deleteSelectedGuru };

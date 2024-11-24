const db = require('../configs/Databases');

module.exports = {
    createIzin : async(id_siswa, id_guru, jenis, keterangan, tanggal, status) => {
        return new Promise((resolve, reject) => {
      db.query(`INSERT INTO izin (id_siswa, id_guru, jenis, keterangan, tanggal, status)
      VALUES (?, ?, ?, ?, ?, ?)`, [id_siswa, id_guru, jenis, keterangan, tanggal, status], (error, results)=>{
        if(error){
            return reject(error)
        }
        resolve(results)
      })
        })
    },
    notif : async(nip) =>{
        return new Promise((resolve, reject) => {
            db.query(`SELECT izin.id_siswa, siswa.nama_siswa, izin.read, izin.jenis FROM izin JOIN siswa ON izin.id_siswa = siswa.id_siswa JOIN guru ON izin.id_guru = guru.id_guru WHERE guru.nip = ? AND izin.read = 0`, [nip], (error, results) =>{
                    if(error){
                        return reject(error)
                    }
                    resolve(results)
                })
            
        })
    },
    read : async(id_guru) =>{
        return new Promise((resolve, reject) => {
            db.query(`UPDATE izin SET izin.read = 1 WHERE id_guru = ?`, [id_guru], (error, results) =>{
                    if(error){
                        return reject(error)
                    }
                    resolve(results)
                })
            
        })
    },
    setujui : async(id_izin) =>{
        return new Promise((resolve, reject) => {
            db.query(`UPDATE izin SET izin.status = 'disetujui' WHERE id_izin = ?`, [id_izin], (error, results) =>{
                    if(error){
                        return reject(error)
                    }
                    resolve(results)
                })
            
        })
    },
    tolak : async(id_izin) =>{
        return new Promise((resolve, reject) => {
            db.query(`UPDATE izin SET izin.status = 'ditolak' WHERE id_izin = ?`, [id_izin], (error, results) =>{
                    if(error){
                        return reject(error)
                    }
                    resolve(results)
                })
            
        })
    },
    izin : async(nip) =>{
        return new Promise((resolve, reject) => {
            db.query(`SELECT izin.id_izin, izin.created_at, izin.id_siswa, siswa.nama_siswa, kelas.nama_kelas, izin.keterangan, izin.tanggal, izin.read, izin.jenis FROM izin JOIN siswa ON izin.id_siswa = siswa.id_siswa JOIN guru ON izin.id_guru = guru.id_guru JOIN kelas ON siswa.id_kelas = kelas.id_kelas WHERE guru.nip = ? AND izin.status = 'pending'`, [nip], (error, results) =>{
                    if(error){
                        return reject(error)
                    }
                    resolve(results)
                })
            
        })
    },
    izinSiswa : async(nis) =>{
        return new Promise((resolve, reject) => {
            db.query(`SELECT izin.id_izin, izin.status, guru.nama_guru, izin.created_at, izin.id_siswa, siswa.nama_siswa, kelas.nama_kelas, izin.keterangan, izin.tanggal, izin.read, izin.jenis FROM izin JOIN siswa ON izin.id_siswa = siswa.id_siswa JOIN guru ON izin.id_guru = guru.id_guru JOIN kelas ON siswa.id_kelas = kelas.id_kelas WHERE siswa.nis = ? `, [nis], (error, results) =>{
                    if(error){
                        return reject(error)
                    }
                    resolve(results)
                })
            
        })
    },
    izinDetail : async(id_izin) =>{
        return new Promise((resolve, reject) => {
            db.query(`SELECT izin.id_izin, guru.nama_guru, izin.created_at, izin.id_siswa, siswa.nama_siswa, kelas.nama_kelas, izin.keterangan, izin.tanggal, izin.read, izin.jenis FROM izin JOIN siswa ON izin.id_siswa = siswa.id_siswa JOIN guru ON izin.id_guru = guru.id_guru JOIN kelas ON siswa.id_kelas = kelas.id_kelas WHERE izin.id_izin = ?`, [id_izin], (error, result) =>{
                    if(error){
                        return reject(error)
                    }
                    resolve(result[0])
                })
            
        })
    },
    hapusIzin : async(id_izin) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM izin WHERE id_izin = ?`, [id_izin], (error, result) => {
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    }
}
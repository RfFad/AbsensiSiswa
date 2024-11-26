const { resolve } = require('path');
const db = require('../../configs/Databases');
const { rejects } = require('assert');
const { error } = require('console');

module.exports = {
    dataTugas: async (nip) => {
        return new Promise((resolve, reject) => {
            // Query pertama untuk update status
            const updateQuery = `
                UPDATE tugas
                SET status = CASE
                    WHEN CONCAT(tugas.tanggal_deadline, ' ', tugas.waktu_deadline) < NOW() 
                    AND tugas.status = 'aktif' THEN 'selesai'
                    ELSE tugas.status
                END
               
            `;
    
            // Jalankan query update terlebih dahulu
            db.query(updateQuery, [nip], (error, result) => {
                if (error) {
                    return reject(error); // Jika ada error pada query UPDATE
                }
    
                // Jika query update berhasil, lanjutkan dengan query SELECT
                const selectQuery = `
                    SELECT 
                        tugas.id_tugas,
                        tugas.judul_tugas,
                        tugas.deskripsi,
                        tugas.tanggal_diberikan,
                        CONCAT(tugas.tanggal_deadline, ' ', tugas.waktu_deadline) AS full_deadline, 
                        tugas.tanggal_deadline,
                        guru.nama_guru,
                        kelas.nama_kelas,
                        mata_pelajaran.nama_mp,
                        kelas.id_kelas,
                        tugas.file_tugas,
                        tugas.status,
                        tugas.waktu_deadline
                    FROM 
                        tugas
                    JOIN 
                        guru ON tugas.id_guru = guru.id_guru
                    JOIN 
                        kelas ON tugas.id_kelas = kelas.id_kelas
                    JOIN 
                        mata_pelajaran ON tugas.id_mapel = mata_pelajaran.idm
                    WHERE 
                        guru.nip = ?;
                `;
    
                // Jalankan query select setelah update berhasil
                db.query(selectQuery, [nip], (error, result) => {
                    if (error) {
                        return reject(error); // Jika ada error pada query SELECT
                    }
                    resolve(result); // Berhasil, kirimkan hasil SELECT
                });
            });
        });
    }
    
    ,
    dataTugasByid : async(id_tugas) =>{
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT 
    tugas.id_tugas,
    tugas.judul_tugas,
    tugas.deskripsi,
    tugas.tanggal_diberikan,
    tugas.tanggal_deadline,
    guru.nama_guru,
    kelas.nama_kelas,
    mata_pelajaran.nama_mp,
    kelas.id_kelas,
    tugas.file_tugas,
    tugas.waktu_deadline,
    tugas.status,
    tugas.waktu_deadline
FROM 
    tugas
JOIN 
    guru ON tugas.id_guru = guru.id_guru
JOIN 
    kelas ON tugas.id_kelas = kelas.id_kelas
JOIN 
    mata_pelajaran ON tugas.id_mapel = mata_pelajaran.idm
WHERE 
    tugas.id_tugas = ?;

`, [id_tugas], (error, result) => {
    if(error){
        return reject(error);
    }
    resolve(result[0])
})
        })
    },
    insertTugas: async (
        id_guru,
        id_kelas,
        id_mapel,
        judul_tugas,
        deskripsi,
        tanggal_diberikan,
        tanggal_deadline,
        file_tugas,
        status
    ) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO tugas 
                (id_guru, id_kelas, id_mapel, judul_tugas, deskripsi, tanggal_diberikan, tanggal_deadline, file_tugas, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
            
            const values = [
                id_guru,
                id_kelas,
                id_mapel,
                judul_tugas,
                deskripsi,
                tanggal_diberikan,
                tanggal_deadline,
                file_tugas,
                status
            ];
    
            db.query(query, values, (error, result) => {
                if (error) {
                    console.error("Database Insertion Error:", error);
                    return reject(new Error("Gagal menyimpan tugas. Silakan coba lagi."));
                }
                resolve(result);
            });
        });
    },
   
    insertPengumpulan: async (
        id_tugas, id_siswa, tanggal_pengumpulan, file_jawaban, text_jawaban, status, nilai
    ) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO pengumpulan_tugas (id_tugas, id_siswa, tanggal_pengumpulan, file_jawaban, text_jawaban, status, nilai)
VALUES (?, ?, ?, ?, ?, ?, ?);

            `;
            
            const values = [
                id_tugas, id_siswa, tanggal_pengumpulan, file_jawaban, text_jawaban, status, nilai
            ];
    
            db.query(query, values, (error, result) => {
                if (error) {
                    console.error("Database Insertion Error:", error);
                    return reject(new Error("Gagal menyimpan tugas. Silakan coba lagi."));
                }
                resolve(result);
            });
        });
    },
    dataPengumpulan : async(id_tugas) =>{
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT 
    pengumpulan_tugas.id_pengumpulan,
    siswa.nama_siswa,
    tugas.judul_tugas,
    pengumpulan_tugas.tanggal_pengumpulan,
    pengumpulan_tugas.file_jawaban,
    pengumpulan_tugas.status,
    pengumpulan_tugas.nilai,
    pengumpulan_tugas.text_jawaban
FROM 
    pengumpulan_tugas
JOIN 
    tugas ON pengumpulan_tugas.id_tugas = tugas.id_tugas
JOIN 
    siswa ON pengumpulan_tugas.id_siswa = siswa.id_siswa
WHERE 
    pengumpulan_tugas.id_tugas = ?;

`, [id_tugas], (error, result) => {
    if(error){
        return reject(error);
    }
    resolve(result)
})
        })
    },
    dataNilaiBySiswa : async(nis) =>{
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT 
    pengumpulan_tugas.id_pengumpulan,
    siswa.nama_siswa,
    siswa.id_siswa,
    tugas.judul_tugas,
    tugas.id_tugas,
    guru.nama_guru,
    pengumpulan_tugas.tanggal_pengumpulan,
    pengumpulan_tugas.file_jawaban,
    pengumpulan_tugas.status,
    pengumpulan_tugas.nilai,
    pengumpulan_tugas.text_jawaban,
    mata_pelajaran.nama_mp
FROM 
    pengumpulan_tugas
JOIN 
    tugas ON pengumpulan_tugas.id_tugas = tugas.id_tugas
JOIN 
    siswa ON pengumpulan_tugas.id_siswa = siswa.id_siswa
JOIN 
    guru ON tugas.id_guru = guru.id_guru
JOIN
    mata_pelajaran ON tugas.id_mapel = mata_pelajaran.idm
WHERE 
    siswa.nis = ?;

`, [nis], (error, result) => {
    if(error){
        return reject(error);
    }
    resolve(result)
})
        })
    },
    //for siswa
    dataTugasBysiswa : async(id_kelas) =>{
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT 
    tugas.id_tugas,
    tugas.judul_tugas,
    tugas.deskripsi,
    tugas.tanggal_diberikan,
    tugas.tanggal_deadline,
    guru.nama_guru,
    kelas.nama_kelas,
    mata_pelajaran.nama_mp,
    tugas.status,
    tugas.waktu_deadline
FROM 
    tugas
JOIN 
    guru ON tugas.id_guru = guru.id_guru
JOIN 
    kelas ON tugas.id_kelas = kelas.id_kelas
JOIN 
    mata_pelajaran ON tugas.id_mapel = mata_pelajaran.idm
WHERE 
    kelas.id_kelas = ?;

`, [id_kelas], (error, result) => {
    if(error){
        return reject(error);
    }
    resolve(result)
})
        })
    },
    detailPengumpulan : async(id_pengumpulan) =>{
        return new Promise((resolve, reject) => {
            db.query(`
                 SELECT 
    pengumpulan_tugas.id_pengumpulan,
    siswa.nama_siswa,
    siswa.foto,
    kelas.nama_kelas,
    tugas.judul_tugas,
    mata_pelajaran.nama_mp,
    pengumpulan_tugas.tanggal_pengumpulan,
    pengumpulan_tugas.file_jawaban,
    pengumpulan_tugas.status,
    pengumpulan_tugas.nilai,
    pengumpulan_tugas.text_jawaban
FROM 
    pengumpulan_tugas
JOIN 
    tugas ON pengumpulan_tugas.id_tugas = tugas.id_tugas
JOIN 
    siswa ON pengumpulan_tugas.id_siswa = siswa.id_siswa
JOIN
    kelas ON siswa.id_kelas = kelas.id_kelas
JOIN
    mata_pelajaran ON tugas.id_mapel = mata_pelajaran.idm
WHERE 
    pengumpulan_tugas.id_pengumpulan = ?

`, [id_pengumpulan], (error, result) => {
    if(error){
        return reject(error);
    }
    resolve(result[0])
})
        })
    },
    updateNilai : async(id_pengumpulan, nilai, status)=>{
        return new Promise((resolve, reject) => {
            db.query(`UPDATE pengumpulan_tugas SET nilai = ?, status= ? WHERE id_pengumpulan = ?`, [nilai, status, id_pengumpulan], (error, result) => {
                if(error){
                    return reject(error)
                }
                resolve(result);
            })
        })
    },
     updateTugas : async (
        id_guru,
        id_kelas,
        id_mapel,
        judul_tugas,
        deskripsi,
        tanggal_diberikan,
        tanggal_deadline,
        file_tugas,
        status,
        id_tugas
    ) => {
        return new Promise((resolve, reject) => {
            // Pastikan query menggunakan parameter yang benar
            const query = `
                UPDATE tugas
                SET 
                    id_guru = ?, 
                    id_kelas = ?, 
                    id_mapel = ?, 
                    judul_tugas = ?, 
                    deskripsi = ?, 
                    tanggal_diberikan = ?, 
                    tanggal_deadline = ?, 
                    file_tugas = ?, 
                    status = ?
                WHERE id_tugas = ?;
            `;
    
            const values = [
                id_guru,
                id_kelas,
                id_mapel,
                judul_tugas,
                deskripsi,
                tanggal_diberikan,
                tanggal_deadline,
                file_tugas,
                status,
                id_tugas
            ];
    
            // Menjalankan query dengan parameter
            db.query(query, values, (updateError, updateResults) => {
                if (updateError) {
                    console.error("Error updating task:", updateError);
                    return reject(updateError); // Menolak promise dengan error
                }
                resolve(updateResults); // Menyelesaikan promise dengan hasil
            });
        });
    },
    // Misalnya menggunakan MySQL
     upsertTugas : (id_tugas, id_guru, id_kelas, id_mapel, judul_tugas, deskripsi, tanggal_diberikan, tanggal_deadline, waktu_deadline, file_tugas, status) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO tugas (id_tugas, id_guru, id_kelas, id_mapel, judul_tugas, deskripsi, tanggal_diberikan, tanggal_deadline, waktu_deadline, file_tugas, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
    id_guru = VALUES(id_guru),
    id_kelas = VALUES(id_kelas),
    id_mapel = VALUES(id_mapel),
    judul_tugas = VALUES(judul_tugas),
    deskripsi = VALUES(deskripsi),
    tanggal_diberikan = VALUES(tanggal_diberikan),
    tanggal_deadline = VALUES(tanggal_deadline),
    waktu_deadline = VALUES(waktu_deadline),
    file_tugas = VALUES(file_tugas),
    status = VALUES(status);
            `;
            
            const values = [id_tugas, id_guru, id_kelas, id_mapel, judul_tugas, deskripsi, tanggal_diberikan, tanggal_deadline, waktu_deadline, file_tugas, status];
    
            db.query(query, values, (err, result) => {
                if (err) {
                    return reject(err); // Menolak promise jika terjadi error
                }
                resolve(result); // Menyelesaikan promise dengan hasil
            });
        });
    },
    detailJawabanSiswa : async(id_tugas, id_siswa) =>{
        return new Promise((resolve, reject) => {
            db.query(`
                 SELECT 
    pengumpulan_tugas.id_pengumpulan,
    siswa.nama_siswa,
    siswa.foto,
    kelas.nama_kelas,
    tugas.judul_tugas,
    mata_pelajaran.nama_mp,
    pengumpulan_tugas.tanggal_pengumpulan,
    pengumpulan_tugas.file_jawaban,
    pengumpulan_tugas.status,
    pengumpulan_tugas.nilai,
    pengumpulan_tugas.text_jawaban
FROM 
    pengumpulan_tugas
JOIN 
    tugas ON pengumpulan_tugas.id_tugas = tugas.id_tugas
JOIN 
    siswa ON pengumpulan_tugas.id_siswa = siswa.id_siswa
JOIN
    kelas ON siswa.id_kelas = kelas.id_kelas
JOIN
    mata_pelajaran ON tugas.id_mapel = mata_pelajaran.idm
WHERE 
    pengumpulan_tugas.id_tugas = ? AND siswa.id_siswa = ?

`, [id_tugas, id_siswa], (error, result) => {
    if(error){
        return reject(error);
    }
    resolve(result[0])
})
        })
    },
    editJawaban : async (file_jawaban, text_jawaban, id_pengumpulan) => {
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE pengumpulan_tugas SET file_jawaban = ?, text_jawaban = ? WHERE id_pengumpulan = ?`,
                [file_jawaban, text_jawaban, id_pengumpulan], (error, result) => {
                    if(error){
                        return reject (error)
                    }
                    resolve(result)
                }
            )
        })
    },
    hapusTugas : async (id_tugas)  =>{
        return new Promise((resolve, reject) =>{
            db.query(`DELETE FROM tugas WHERE id_tugas = ?`, [id_tugas], (error, result) =>{
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
    hapusJawaban : async (id_tugas)  =>{
        return new Promise((resolve, reject) =>{
            db.query(`DELETE FROM pengumpulan_tugas WHERE id_tugas = ?`, [id_tugas], (error, result) =>{
                if(error){
                    return reject(error)
                }
                resolve(result)
            })
        })
    }

    
}
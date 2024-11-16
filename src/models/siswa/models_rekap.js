const db = require("../../configs/Databases");

module.exports={
    rekapMenu : async(id_kelas) =>{
        return new  Promise((resolve, reject) =>{
            db.query(`SELECT jadwal.*, hari.hari AS hari, guru.nama_guru AS nama_guru, guru.nip AS nip, 
                   kelas.nama_kelas AS nama_kelas, kelas.id_kelas AS id_kelas, 
                   mata_pelajaran.nama_mp AS nama_mp, mata_pelajaran.idm, jadwal.jam_mulai, jadwal.jam_selesai 
            FROM jadwal 
            JOIN hari ON jadwal.idh = hari.idh 
            JOIN guru ON jadwal.idg = guru.id_guru 
            JOIN kelas ON jadwal.idk = kelas.id_kelas 
            JOIN mata_pelajaran ON jadwal.idm = mata_pelajaran.idm 
            WHERE kelas.id_kelas = ?
            ORDER BY jadwal.jam_mulai;`, [id_kelas], (error, result) => {
                if(error){
                    console.log(error)
                    return reject(error)
                }
                resolve(result)
            })
        })
    },
    rekapBulanan: async (idm, bulan, tahun, nis, idth, id_kelas, semester) => {
        return new Promise((resolve, reject) => {
          const filterSemester = semester === '1' ? `MONTH(absen.tanggal) BETWEEN 7 AND 12` : `MONTH(absen.tanggal) BETWEEN 1 AND 6`;
          
          let query = `
            SELECT 
              siswa.id_siswa, 
              jadwal.idg, 
              jadwal.idm, 
              siswa.idth, 
              siswa.nama_siswa, 
              siswa.nis, 
              guru.nama_guru, 
              mata_pelajaran.nama_mp, 
              tahun_ajaran.nama_ajaran, 
              DATE_FORMAT(absen.tanggal, '%Y-%m-%d') AS tanggal, 
              absen.status, 
              COUNT(*) AS jumlah 
            FROM 
              absen 
            JOIN 
              siswa ON absen.id_siswa = siswa.id_siswa 
            JOIN 
              jadwal ON absen.id_jadwal = jadwal.idj 
            JOIN 
              mata_pelajaran ON jadwal.idm = mata_pelajaran.idm 
            JOIN 
              tahun_ajaran ON siswa.idth = tahun_ajaran.idth 
            JOIN 
              guru ON jadwal.idg = guru.id_guru 
            JOIN 
              kelas ON jadwal.idk = kelas.id_kelas
            WHERE 
              siswa.nis = ?  
              AND tahun_ajaran.idth = ? 
              AND mata_pelajaran.idm = ?
              AND kelas.id_kelas = ?
          `;
          
          const params = [nis, idth, idm, id_kelas];
          const condition = [];
          
          if (tahun) {
            condition.push(`YEAR(absen.tanggal) = ?`);
            params.push(tahun);
          }
          
          if (bulan) {
            condition.push(`MONTH(absen.tanggal) = ?`);
            params.push(bulan);
          }
          
          if (semester) {
            condition.push(filterSemester);
          }
          
          if (condition.length > 0) {
            query += " AND " + condition.join(" AND ");
          }
          
          query += `
            GROUP BY 
              siswa.nis, 
              tanggal, 
              absen.status;
          `;
          
          db.query(query, params, (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          });
        });
      }
      
}
 

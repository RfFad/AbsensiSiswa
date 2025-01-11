const db = require("../../configs/Databases");


module.exports = {
  rekapHarian: async (id_kelas, tanggal, nip) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT siswa.id_siswa, siswa.nama_siswa, siswa.nis, DATE(absen.tanggal) AS tanggal, absen.status, COUNT(*) AS jumlah, jadwal.idg, jadwal.idm, mata_pelajaran.nama_mp, guru.nip, kelas.nama_kelas
             FROM absen
             JOIN siswa ON absen.id_siswa = siswa.id_siswa
             JOIN jadwal ON absen.id_jadwal = jadwal.idj
             JOIN mata_pelajaran ON jadwal.idm = mata_pelajaran.idm 
             JOIN guru ON jadwal.idg = guru.id_guru
             JOIN kelas ON jadwal.idk = kelas.id_kelas
             WHERE siswa.id_kelas = ? AND DATE(absen.tanggal) = ? AND guru.nip = ?
             GROUP BY siswa.id_siswa, tanggal, absen.status`,
        [id_kelas, tanggal, nip],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  rekapBulanan: async (id_kelas, bulan, tahun, nip, idth = null, semester, tanggal) => {
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
        WHERE 
          siswa.id_kelas = ? 
          AND guru.nip = ? 
      `;
  
      const params = [id_kelas, nip];
      const condition = [];
  
      if (idth) {
        condition.push(`tahun_ajaran.idth = ?`);
        params.push(idth);
      }
      if (tanggal) {
        condition.push(`absen.tanggal = ?`);
        params.push(tanggal);
      }
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
       // params.push(semester)
      }
  
      if (condition.length > 0) {
        query += " AND " + condition.join(" AND ");
      }
  
      query += `
        GROUP BY 
          siswa.id_siswa, 
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
  },
  

  menu: async (nip) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT jadwal.*, kelas.nama_kelas, kelas.id_kelas, siswa.nama_siswa, tahun_ajaran.nama_ajaran, tahun_ajaran.idth, guru.nama_guru FROM jadwal INNER JOIN kelas ON jadwal.idk = kelas.id_kelas INNER JOIN siswa ON kelas.id_kelas = siswa.id_kelas INNER JOIN tahun_ajaran ON siswa.idth = tahun_ajaran.idth INNER JOIN guru ON jadwal.idg = guru.id_guru WHERE guru.nip = ?;`,
        [nip],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  },
};
//mingguan
//SELECT siswa.id_siswa, siswa.nama_siswa, MONTH(absen.tanggal) AS bulan, YEARWEEK(absen.tanggal, 1) AS minggu_ke, absen.status, jadwal.idg, guru.nama_guru, COUNT(*) AS jumlah FROM absen JOIN siswa ON absen.id_siswa = siswa.id_siswa JOIN jadwal ON absen.id_jadwal = jadwal.idj JOIN guru ON jadwal.idg = guru.id_guru WHERE siswa.id_kelas = 61 AND guru.nama_guru = "Agus Septian" GROUP BY siswa.id_siswa, bulan, minggu_ke, absen.status ORDER BY bulan, minggu_ke;

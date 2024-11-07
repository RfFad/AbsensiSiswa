const jadwalmodel = require('../../models/guru/jadwal_model');
const { GetSiswaKelas } = require('../../models/models_siswa');
const absenModel = require('../../models/guru/models_absen');
const hariIna = require('../../configs/hari');
const guru = require('../../models/guru/models_guru');

const absen = {
   showAbsensiPage : async(req, res) => {
    const {id_kelas} = req.params
    try {
        const rows = await guru.getguru(req, res);
        const messages = {
            success: req.flash("success"),
            error: req.flash("error"),
          };
        const { id_jadwal } = req.query;
        const students = await absenModel.dataSiswaByid_kelas(id_kelas)
        req.flash('success', 'berhasil absen!')
        res.render("guru/absen/index", {students, id_jadwal, messages, rows});
    } catch (error) {
        console.error(error);
            res.status(500).send('Server Error');
    }
   },
   submitAbsensi: async (req, res) => {
    try {
        const entries = [];
        const { id_jadwal } = req.body;
        const tanggal = new Date().toISOString().split('T')[0];
        
        // Gunakan Object.keys untuk mengakses key dalam req.body
        for (const key of Object.keys(req.body)) {
            if (key.startsWith('status_')) {
                const id_siswa = key.split('_')[1];
                const status = req.body[key];
                entries.push([id_siswa, id_jadwal, tanggal, status]); // Menambahkan data sebagai array per record
            }
        }

        await absenModel.saveAbsen(entries);
        req.flash('success', 'berhasil absen!')
        res.redirect('/guru/jadwal');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

    
    
};

// inputAbsen: async (req, res) => {
//     const {id_kelas} = req.params
//     const { ids, idj, tgl, ket } = req.body;

//     try {
//         // Fetch siswa list by class ID
//         const siswaList = await Attendance.getSiswaByKelas(id_kelas);
//         for (const siswa of siswaList){
//             const ids = siswa.id_siswa[0]
//             const absenRecord = await Attendance.getAttendanceByDateAndJadwal(ids, tgl, idj);

//             if (!absenRecord) {
//                 await Attendance.InsertAbsen( ids, idj, tgl, ket);
//             } else {
//                 await Attendance.updateAbsen(ket,  tgl, idj);
//             }
//         }
    

//         // Redirect after saving attendance
//         req.flash('success', 'Absen berhasil diinput')
//         console.log(`Data berhasil diinput idj = ${idj} idk = ${idk} tgl = ${tgl} ids = ${ids} `)
//         res.redirect('/guru/jadwal');
        
//     } catch (error) {
//         console.error('Error processing attendance:', error);
//         res.status(500).send('Server error');
//     }
// }
    


module.exports = absen;

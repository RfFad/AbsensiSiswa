const jadwalmodel = require('../../models/guru/jadwal_model');
const { GetSiswaKelas } = require('../../models/models_siswa');
const absenModel = require('../../models/guru/models_absen');
const hariIna = require('../../configs/hari');
const guru = require('../../models/guru/models_guru');

const absen = {
    showAbsensiPage: async (req, res) => {
        const { id_kelas } = req.params;
        const today = hariIna(new Date().toLocaleString('en-US', { weekday: 'long' }));
        const now = new Date().toLocaleTimeString('en-US', { hour12: false });
        
        try {
            // Mengambil data hari dan mengaktifkan jadwal berdasarkan waktu saat ini
            const hari = await jadwalmodel.getHariId(today);
            await jadwalmodel.activateJadwal(hari.idh, now);
    
            // Mengambil data guru dan pesan dari flash messages
            const rows = await guru.getguru(req, res);
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
            };
    
            // Memeriksa apakah `id_jadwal` ada di query
            const { id_jadwal } = req.query;
            if (!id_jadwal) {
                req.flash("error", "ID Jadwal tidak ditemukan.");
                return res.redirect("/guru/jadwal");
            }
    
            // Mengambil data siswa berdasarkan `id_kelas` dan `id_jadwal`
            const students = await absenModel.dataSiswaByid_kelas(id_kelas);
            const jadwal = await absenModel.getJadwalById(id_jadwal);
    
            // Memeriksa status `aktif` dari jadwal
            if (jadwal.aktif === 0) {
                // Jika `aktif` bernilai 0, absen tidak bisa dilakukan di luar jam pelajaran
                return res.send(`
                    <center>
                        <br>
                        <h3>Maaf, Anda tidak bisa mengabsen siswa diluar jam pelajaran.</h3>
                        <a href="/guru/jadwal"><b>Kembali</b></a>
                    </center>
                `);
            }
    
            // Jika `aktif` bernilai 1, absen dapat dilakukan
            req.flash("success", "Berhasil absen!");
            res.render("guru/absen/index", { students, id_jadwal, messages, rows });
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    },
    
   submitAbsensi: async (req, res) => {
    try {
        const entries = [];
        const { id_jadwal, id_guru } = req.body;
        const tanggal = new Date().toISOString().split('T')[0];
        
        // Gunakan Object.keys untuk mengakses key dalam req.body
        for (const key of Object.keys(req.body)) {
            if (key.startsWith('status_')) {
                const id_siswa = key.split('_')[1];
                const status = req.body[key];
                entries.push([id_siswa, id_jadwal, id_guru, tanggal, status]); // Menambahkan data sebagai array per record
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

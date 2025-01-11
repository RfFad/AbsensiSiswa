const jadwalmodel = require('../../models/guru/jadwal_model');
const { GetSiswaKelas } = require('../../models/models_siswa');
const absenModel = require('../../models/guru/models_absen');
const hariIna = require('../../configs/hari');
const guru = require('../../models/guru/models_guru');
const {getKelasById} = require('../../models/models_kelas')
const {InsertNotification} = require('../../models/models_riwayat');
const gurumodel = require('../../models/guru/models_guru');
const absen = {
    showAbsensiPage: async (req, res) => {
        const { id_kelas } = req.params;
        const today = hariIna(new Date().toLocaleString('en-US', { weekday: 'long' }));
        const now = new Date().toLocaleTimeString('en-US', { hour12: false });
        const tanggal = new Date().toISOString().split('T')[0];
    
        try {
            // Mengambil data hari dan mengaktifkan jadwal berdasarkan waktu saat ini
            const hari = await jadwalmodel.getHariId(today);
            await jadwalmodel.activateJadwal(hari.idh, now);
            const kelas = await getKelasById(id_kelas)
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
    
            // Mengambil data siswa berdasarkan `id_kelas`
            const students = await absenModel.dataSiswaByid_kelas(id_kelas);
    
            // Mengambil data jadwal
            const jadwal = await absenModel.getJadwalById(id_jadwal);
    
            // Memeriksa status `aktif` dari jadwal
            if (jadwal.aktif === 0) {
                // Jika `aktif` bernilai 0, absen tidak bisa dilakukan di luar jam pelajaran
                req.flash("error", "Maaf, anda tidak bisa mengabsen siswa di luar jam pelajaran")
                return res.redirect('/guru/jadwal')
            
            }
    
            // Mengambil data absensi yang sudah ada
            const absensi = await absenModel.absenDetail( tanggal, id_jadwal);
    
            // Buat mapping untuk status absensi
            const absensiMap = {};
            absensi.forEach(absen => {
                absensiMap[absen.id_siswa] = {
                    status: absen.status,
                    id_jadwal: absen.id_jadwal,
                    tanggal: absen.tanggal,
                };
            });
    
            // Tambahkan status dan metadata ke masing-masing siswa
            students.forEach(student => {
                const absenData = absensiMap[student.id_siswa] || {};
                student.status = absenData.status || "belum"; // Default "belum" jika tidak ada data
                student.id_jadwal = id_jadwal;
                student.tanggal = tanggal;
            });
    
            // Render halaman absensi
            res.render("guru/absen/index", { students, id_jadwal, tanggal, messages, rows, kelas });
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    }
    ,
    
    submitAbsensi: async (req, res) => {
        try {
            const entries = [];
            const { id_jadwal, id_guru, id_kelas } = req.body;
            const tanggal = new Date().toISOString().split('T')[0]; // Mengambil tanggal hari ini dalam format YYYY-MM-DD
    
            // Siapkan data absensi
            for (const key of Object.keys(req.body)) {
                if (key.startsWith('status_')) {
                    const id_siswa = key.split('_')[1];
                    const status = req.body[key]; // Status siswa
    
                    // Generate id_absen berdasarkan id_siswa, id_jadwal, dan tanggal
                    const id_absen = `${id_siswa}_${id_jadwal}_${tanggal}`; // id_absen berdasarkan id_siswa, id_jadwal, tanggal
                    entries.push([id_absen, id_siswa, id_kelas, id_jadwal, id_guru, tanggal, status]); // Format data sesuai SQL
                }
            }
    
            // Gunakan upsert untuk menyimpan data absensi
            await absenModel.saveAbsen(entries); // Menggunakan upsert untuk memasukkan atau memperbarui data absensi
            // Kirim notifikasi untuk siswa yang tidak hadir
            const guru = await gurumodel.getguru(req, res)
            for (const entry of entries) {
                if (entry[6] === 'alpa') { // Status siswa "Alpa"
                    // Simpan notifikasi ke database
                    await InsertNotification(
                        entry[1], // id_siswa
                        `Anda tidak hadir di jam pelajaran ${guru.nama_mp} pada tanggal ${tanggal}`, // Pesan
                        'warning' // Tipe notifikasi
                    );
    
                    // Kirim notifikasi real-time jika menggunakan socket.io
                    if (res.io) {
                        await res.io.to(`siswa_${entry[1]}`).emit('notification', {
                            type: 'warning',
                            message: `Anda tidak hadir di jam pelajaran ${guru.nama_mp} pada tanggal ${tanggal}`,
                        });
                    }
                }
            }
    
            req.flash('success', 'Berhasil absen!');
            res.redirect('/guru/jadwal');
        } catch (error) {
            console.error('Error saat menyimpan absensi:', error);
            res.status(500).send('Server Error');
        }
    },
    
    
    
    detailAbsen: async (req, res) => {
        try {
            const { id_siswa, tanggal, id_jadwal } = req.params;
    
            // Validasi input
            if (!id_siswa || !tanggal || !id_jadwal) {
                req.flash('error', 'Parameter tidak lengkap.');
                return res.redirect('/guru/jadwal');
            }
    
            // Ambil data detail absensi
            const detail = await absenModel.absenDetail(id_siswa, tanggal, id_jadwal);
    
            // Periksa jika data tidak ditemukan
            if (!detail) {
                req.flash('error', 'Detail absensi tidak ditemukan.');
                return res.redirect('/guru/jadwal');
            }
    
            // Render view untuk detail absensi
            res.render('guru/absen/index', { detail });
        } catch (error) {
            console.error('Error saat mengambil detail absensi:', error);
            res.status(500).send('Server Error');
        }
    },
    
    
    
    
    
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

const jadwalmodel = require('../../models/guru/jadwal_model');
const { GetSiswaKelas } = require('../../models/models_siswa');
const Attendance = require('../../models/guru/models_absen');
const hariIna = require('../../configs/hari');

const absen = {
    getabsenbyid: async (req, res) => {
        const { idj, id_kelas } = req.params;
        const today = hariIna(new Date().toLocaleString('en-US', { weekday: 'long' }));
        const now = new Date().toLocaleTimeString('en-US', { hour12: false });
        
        try {
            // Fetch jadwal by ID
            let jadwal = await jadwalmodel.jadwalById(idj);
            if (!jadwal) {
                return res.status(404).send("Jadwal tidak ditemukan.");
            }

            // Fetch hari ID by today
            const hari = await jadwalmodel.getHariId(today);
            if (!hari) {
                return res.status(404).send("Hari tidak ditemukan.");
            }

            // Activate jadwal
            await jadwalmodel.activateJadwal(hari.idh, now);

            // Re-fetch the jadwal to get the updated 'aktif' status
            jadwal = await jadwalmodel.getJadwalById(idj);

            // Check if the jadwal is active
            if (jadwal.aktif !== 1) {
                return res.send(`
                    <center>
                        <br>
                        <h3>Maaf, Anda tidak bisa mengabsen siswa diluar jam pelajaran.</h3>
                        <a href="/guru/jadwal"><b>Kembali</b></a>
                    </center>
                `);
            }

            // Fetch siswa list by class ID
            const siswaList = await GetSiswaKelas(id_kelas);
            if (!siswaList || siswaList.length === 0) {
                return res.status(404).send("Tidak ada siswa di kelas ini.");
            }

            const dateToday = new Date().toISOString().slice(0, 10);

            // Get siswa data with attendance status
            const siswaData = await Promise.all(siswaList.map(async (siswa) => {
                const absenRecord = await Attendance.getAttendanceByDateAndJadwal(siswa.id_siswa, dateToday, idj);
                let keterangan = 'N';  // Default if no record exists

                if (absenRecord) {
                    keterangan = absenRecord.ket;
                }

                return {
                    nis: siswa.nis,
                    nama: siswa.nama_siswa,
                    ids: siswa.id_siswa,
                    keterangan: keterangan
                };
            }));

            // Render the attendance page
            res.render('guru/absen/index', { jadwal, siswa: siswaData, dateToday });

        } catch (error) {
            console.error("Error rendering the page:", error);
            res.status(500).send("Terjadi kesalahan pada server.");
        }
    },
    inputAbsen: async (req, res) => {
        const { idj, idk, tgl } = req.body;

        try {
            // Fetch siswa list by class ID
            const siswaList = await Attendance.getSiswaByKelas(idk);

            for (const siswa of siswaList) {
                const { ids } = siswa;
                const ket = req.body[ids];

                const absenRecord = await Attendance.getAttendanceByDateAndJadwal(ids, tgl, idj);

                if (!absenRecord) {
                    await Attendance.InsertAbsen(ids, idj, tgl, ket);
                } else {
                    await Attendance.updateAbsen(ket, ids, tgl, idj);
                }
            }

            // Redirect after saving attendance
            res.redirect('/guru/jadwal');
            
        } catch (error) {
            console.error('Error processing attendance:', error);
            res.status(500).send('Server error');
        }
    }
};

    
    


module.exports = absen;

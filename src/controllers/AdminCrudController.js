const insertSiswa = require('../models/models_siswa');


const pageInsert = async (req, res) => {
    try {
        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        };
        res.render("admin/crud_siswa", { messages });
    } catch (error) {
        res.status(400).send("Internal server error");
    }
};

const getInsertSiswa = async (req, res) => {
    const { nis, nama_siswa, kelas, nama_wali, gender, username, password, nis_siswa } = req.body;

    // Validate that all required fields are filled
    if (!nis || !nama_siswa || !kelas || !nama_wali || !gender || !username || !password || !nis_siswa) {
        req.flash('error', 'Semua field wajib diisi.');
        return res.redirect('/admin/insert_siswa');
    }

    try {
        // Check if NIS already exists
        const nisExists = await insertSiswa.checkNisExists(nis);
        if (nisExists) {
            req.flash('error', 'NIS sudah terdaftar.');
            return res.redirect('/admin/insert_siswa');
        }

        // Check if username already exists
        const usernameExists = await insertSiswa.checkUsernameExists(username);
        if (usernameExists) {
            req.flash('error', 'Username sudah terdaftar.');
            return res.redirect('/admin/insert_siswa');
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Call the model function to insert into both tables
        const row = await insertSiswa.createSiswaAndUser(nis, nama_siswa, kelas, nama_wali, gender, username, hashedPassword, nis_siswa);

        // Set flash message for success
        req.flash('success', 'Berhasil menambahkan data');
        res.redirect('/admin/insert_siswa'); // Redirect to the form page to show success message
    } catch (error) {
        // Set flash message for error
        req.flash('error', 'Gagal menambahkan data');
        res.redirect('/admin/insert_siswa'); // Redirect to the form page to show error message
    }
};

module.exports = { getInsertSiswa, pageInsert };

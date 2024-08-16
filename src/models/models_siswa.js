const db = require('../configs/Databases');

const insertSiswa = {
    checkUsernameExists: async (username) => {
        const result = await db.query('SELECT COUNT(*) AS count FROM auth WHERE username = ?', [username]);
        // Check if result has the expected structure
        if (result && result.length > 0) {
            const rows = result[0];
            return rows.count > 0;
        }
        return false;
    },

    checkNisExists: async (nis) => {
        const result = await db.query('SELECT COUNT(*) AS count FROM siswa WHERE nis = ?', [nis]);
        if (result && result.length > 0) {
            const rows = result[0];
            return rows.count > 0;
        }
        return false;
    },

    createSiswaAndUser: async (nis, nama_siswa, kelas, nama_wali, gender, username, password, role, nis_siswa) => {
        try {
            // Check if username or nis already exists
            const usernameExists = await insertSiswa.checkUsernameExists(username);
            const nisExists = await insertSiswa.checkNisExists(nis);

            if (usernameExists) {
                throw new Error('Username already exists');
            }

            if (nisExists) {
                throw new Error('NIS already exists');
            }

            // Start a new transaction
            await db.query('START TRANSACTION');

            // Insert into the siswa table
            const siswaResult = await db.query(`
                INSERT INTO siswa (nis, nama_siswa, kelas, nama_wali, gender) VALUES (?, ?, ?, ?, ?)`,
                [nis, nama_siswa, kelas, nama_wali, gender]
            );

            // Insert into the auth table
            const userResult = await db.query(`
                INSERT INTO auth (username, password, role, nis_siswa) VALUES (?, ?, ?, ?)`,
                [username, password, role, nis_siswa]
            );

            // Commit the transaction
            await db.query('COMMIT');

            // Return both results
            return { siswaResult, userResult };

        } catch (error) {
            // If any error occurs, rollback the transaction
            await db.query('ROLLBACK');
            throw error;  // Rethrow the error to be handled by the calling function
        }
    }
};

module.exports = insertSiswa;

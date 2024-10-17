const multer = require('multer');
const path = require('path');

// Konfigurasi untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Menyimpan file di folder public/images
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: function (req, file, cb) {
    // Menggunakan timestamp agar nama file tidak bentrok
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Filter file yang hanya menerima gambar
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('File harus berupa gambar!'), false);
  }
};

// Inisialisasi multer dengan storage dan filter
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimal 5MB
  fileFilter: fileFilter
});

module.exports= upload
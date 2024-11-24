const user = require('../../models/models_user');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const ExcelJS=require('exceljs');
const md5 = require("md5");
// Membuat folder public/images jika belum ada
if (!fs.existsSync(path.join(__dirname,'..', '..', 'public', 'images'))) {
  fs.mkdirSync(path.join(__dirname, '..','..', 'public', 'images'), { recursive: true });
}

// Setup multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..','..', 'public', 'images')); // Tentukan folder penyimpanan
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp ke nama file
  }
});

const upload = multer({ storage: storage }).single('foto');
module.exports = {
    getUser : async(req, res)=>{
        
        try {
            const data= await user.dataUser();
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
              };
            res.render('admin/user/user', {data, currentPath : '/admin/data_user', messages})
        } catch (error) {
            console.log(error)
            res.status(404).json({message : 'error'})
        }
    }, 
    getInsertPage : async(req, res)=>{
        
        try {
            const messages = {
                success: req.flash("success"),
                error: req.flash("error"),
              };
            res.render('admin/user/create_user', {currentPath : '/admin/user', messages})
        } catch (error) {
            console.log(error)
            res.status(404).json({message : 'error'})
        }
    }, 
    getinsert : async(req, res) => {
        upload(req, res, async(err) => {
          
            if (err) {
                return res.status(500).json({ message: 'Error uploading file', error: err });
              }

        const {username, email, password, jk} = req.body
        let foto = req.file ? req.file.filename : null ;
        try {
            const hashed = md5(password)
            await user.insertUser(username, email, hashed, jk, foto)

            req.flash('success', 'Berhasil menambahkan data user!')
            return res.redirect("/admin/data_user")
        } catch (error) {
            console.log(error)
            return res.status(404).json({msg:'gagal menambahkan data'})
        }
    })
    },
    detailUser : async(req, res) => {
      const {id_user} = req.params
      try {
        const messages = {
          success: req.flash("success"),
          error: req.flash("error"),
        };
        const data = await user.userByid(id_user)
        res.render('admin/user/edit_user', {data, currentPath : '/admin/edit_user', messages})
      } catch (error) {
        console.log(error)
        return res.status(404).json({msg: 'page tidak terender'})
      }
    },
    getUserFp : async(req, res) => {
      const username = req.session.username
      try {
        const data = await user.adminFp(username);
        res.status(202).json({data})
      } catch (error) {
        console.log(error)
        res.status(404).json({msg: 'gagal mengambil data'})
      }
    },
     getUpdateUser : async (req, res) => {
      upload(req, res, async (err) => {
        if (err) {
          req.flash("error", "Error uploading file!");
          return res.redirect(`/admin/edit_user/${req.params.id_user}`);
        }
    
        const { id_user } = req.params;
        const { username, email, password, jk } = req.body;
        let foto = req.file ? req.file.filename : null;
    
        try {
          const dataUser = await user.userByid(id_user);
          if (!dataUser) {
            req.flash("error", "User tidak ditemukan!");
            return res.redirect(`/admin/edit_user/${id_user}`);
          }
    
          if (!foto) {
            foto = dataUser.foto;
          } else if (dataUser.foto && dataUser.foto !== 'default.jpg') {
            const oldFotoPath = path.join(__dirname, '..', '..', 'public', 'images', dataUser.foto);
            if (fs.existsSync(oldFotoPath)) {
              fs.unlinkSync(oldFotoPath);
            }
          }
    
          const hash = password ? md5(password) : dataUser.password;
          await user.updateUser(id_user, username, email, hash, jk, foto);
    
          req.flash("success", "Berhasil memperbarui data!");
          res.redirect("/admin/data_user");
        } catch (error) {
          req.flash("error", `Gagal memperbarui data! ${error.message}`);
          res.redirect(`/admin/edit_user/${id_user}`);
        }
      });
    },
    getDelete : async(req, res) => {
      const {id_user} = req.params
      try {
        await user.deleteUser(id_user)
        req.flash('success', 'Berhasil menghapus user!')
        res.redirect('/admin/data_user')
      } catch (error) {
        console.log(error)
        return res.status(404).json({msg : 'gagal menghapus'})
      }
    }
}
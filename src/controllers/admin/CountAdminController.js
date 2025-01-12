const getCount = require("../../models/models_count");

const getCountData = async (req, res) => {
  try {

    const countKelas = await getCount.CountKelas();
    const countGuru = await getCount.CountGuru();
    const countMapel = await getCount.CountMapel();
    const countSiswa = await getCount.CountSiswa();
    const countTahun = await getCount.CountTahun();
    const countJadwal = await getCount.CountJadwal();
    const countRiwayat = await getCount.CountRiwayat();
    const countUser = await getCount.CountUser();
    const messages = {
            
      success: req.flash('success'),
      error: req.flash('error')
  };
    res.render("admin/index", {
      countKelas,
      countGuru,
      countMapel,
      countSiswa,
      countTahun,
      countJadwal,
      countRiwayat,
      countUser,
      currentPath : '/admin',
      messages,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getCountData };

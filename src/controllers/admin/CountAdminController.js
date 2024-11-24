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
      messages:"hello"
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getCountData };

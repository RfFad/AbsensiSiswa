const getCount = require ('../models/models_count');

const getCountData = async(req, res) => {
    try {
        const countKelas = await getCount.CountKelas();
        const countGuru = await getCount.CountGuru();
        const countMapel = await getCount.CountMapel();
        res.render ('admin/index', {countKelas,countGuru,countMapel});
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {getCountData}
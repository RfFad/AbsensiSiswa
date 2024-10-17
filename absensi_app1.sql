-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2024 at 05:30 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `absensi_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `absen`
--

CREATE TABLE `absen` (
  `ida` int(10) NOT NULL,
  `ids` int(10) NOT NULL,
  `idj` int(11) NOT NULL,
  `tgl` varchar(100) NOT NULL,
  `ket` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `absen`
--

INSERT INTO `absen` (`ida`, `ids`, `idj`, `tgl`, `ket`) VALUES
(2, 12, 2, '2018-05-01', 'M'),
(3, 13, 2, '2018-05-01', 'M'),
(4, 23, 2, '2018-05-01', 'M'),
(5, 25, 2, '2018-05-01', 'S'),
(24, 10, 12, '09-29-2024', 'A');

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `id_guru` int(11) NOT NULL,
  `nip` int(11) NOT NULL,
  `nama_guru` varchar(255) NOT NULL,
  `idm` int(11) NOT NULL,
  `jk` enum('laki-laki','perempuan') NOT NULL,
  `jabatan` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `tlp` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`id_guru`, `nip`, `nama_guru`, `idm`, `jk`, `jabatan`, `alamat`, `tlp`, `password`, `foto`) VALUES
(9, 13334568, 'Supratman', 22, 'laki-laki', 'Sp.d', 'Kuningan', '85454525245', 'a3c9fdc6de4571be0cc3fffe4e30840c', ''),
(10, 12283199, 'Sinta', 23, 'perempuan', 'Sp.d', 'kuningan, kec. nusaherang', '8997988767465', '38e71496d583420e90eb7111fbb12a6a', ''),
(11, 12227825, 'SULTON ', 20, 'laki-laki', 'Sp.d', 'Jamblang', '8943749343', 'dcfcb74ae530990c327209cb62da23da', ''),
(13, 13334567, 'Agus Septian', 24, 'laki-laki', 'S.Or.', 'Cirebon, Saladara', '08677586576', '3a2321fef46634e6ff6a6d7d6e922e23', ''),
(14, 144456788, 'Aldan', 24, 'laki-laki', 'Sp.d', 'kuningan, kec. nusaherang', '895386490035', 'dc08f76369e307749b0e37734b63da78', ''),
(15, 122245669, 'Oscar', 21, 'laki-laki', 'Sp.d', 'Cirebon', '895386490035', '99800f3f47cc92dcdf506e86fde2111b', ''),
(18, 1222456670, 'Sayid Abdurahim', 20, 'laki-laki', 'Sp.d', 'Cirebon', '8943749343', '67647af5e797ffc4fb0c625492a11bdf', '1729135460076.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `hari`
--

CREATE TABLE `hari` (
  `idh` int(11) NOT NULL,
  `hari` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hari`
--

INSERT INTO `hari` (`idh`, `hari`) VALUES
(1, 'Senin'),
(2, 'Selasa'),
(3, 'Rabu'),
(4, 'Kamis'),
(5, 'Jumat'),
(7, 'Sabtu'),
(8, 'Minggu');

-- --------------------------------------------------------

--
-- Table structure for table `jadwal`
--

CREATE TABLE `jadwal` (
  `idj` int(11) NOT NULL,
  `idh` int(11) NOT NULL,
  `idg` int(11) NOT NULL,
  `idk` int(11) NOT NULL,
  `idm` int(11) NOT NULL,
  `jam_mulai` time NOT NULL,
  `jam_selesai` time NOT NULL,
  `aktif` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jadwal`
--

INSERT INTO `jadwal` (`idj`, `idh`, `idg`, `idk`, `idm`, `jam_mulai`, `jam_selesai`, `aktif`) VALUES
(20, 1, 9, 61, 22, '11:54:00', '13:54:00', 0),
(21, 2, 13, 61, 24, '11:00:00', '13:00:00', 0),
(22, 3, 15, 64, 21, '08:30:00', '10:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int(11) NOT NULL,
  `nama_kelas` varchar(100) NOT NULL,
  `id_sekolah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `nama_kelas`, `id_sekolah`) VALUES
(61, '7A', 1),
(62, '7B', 1),
(64, '7C', 1),
(65, '7D', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mata_pelajaran`
--

CREATE TABLE `mata_pelajaran` (
  `idm` int(11) NOT NULL,
  `nama_mp` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mata_pelajaran`
--

INSERT INTO `mata_pelajaran` (`idm`, `nama_mp`) VALUES
(20, 'Matematika'),
(21, 'B. Inggris'),
(22, 'Ppkn'),
(23, 'IPA'),
(24, 'Penjas');

-- --------------------------------------------------------

--
-- Table structure for table `riwayat`
--

CREATE TABLE `riwayat` (
  `id_riwayat` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `prestasi` text DEFAULT NULL,
  `pelanggaran` text DEFAULT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `riwayat`
--

INSERT INTO `riwayat` (`id_riwayat`, `id_siswa`, `id_kelas`, `prestasi`, `pelanggaran`, `tanggal`) VALUES
(5, 6, 61, 'mendapatkan juara satu di lomba membuat website', 'Panjat Pagar', '2024-09-04');

-- --------------------------------------------------------

--
-- Table structure for table `sekolah`
--

CREATE TABLE `sekolah` (
  `id_sekolah` int(11) NOT NULL,
  `kode` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sekolah`
--

INSERT INTO `sekolah` (`id_sekolah`, `kode`, `email`, `nama`, `alamat`) VALUES
(1, '21312389127389', 'smpn@gmail.com', 'SMPN ', 'KOTA. CIREBON');

-- --------------------------------------------------------

--
-- Table structure for table `siswa`
--

CREATE TABLE `siswa` (
  `id_siswa` int(11) NOT NULL,
  `nis` int(11) NOT NULL,
  `nama_siswa` varchar(255) NOT NULL,
  `tlp` varchar(50) DEFAULT NULL,
  `tgl_lahir` date NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `idth` int(11) DEFAULT NULL,
  `jk` enum('laki-laki','perempuan','','') NOT NULL,
  `nama_wali` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `pekerjaan_wali` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `foto` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `siswa`
--

INSERT INTO `siswa` (`id_siswa`, `nis`, `nama_siswa`, `tlp`, `tgl_lahir`, `id_kelas`, `idth`, `jk`, `nama_wali`, `alamat`, `pekerjaan_wali`, `password`, `foto`) VALUES
(6, 12228429, 'Saqila', '895386490035', '2009-06-26', 61, 7, 'laki-laki', 'Izul Zaenul', 'Cirebon', 'karyawan swasta', 'a7f420e2e58cf037e05fdbdf27575b49', ''),
(8, 12228428, 'refan fadillah', '895386490035', '2007-04-25', 64, 7, 'laki-laki', 'EVIE HANIFAH', 'kuningan, kec. nusaherang', 'Guru', 'd2a96cdaccc1a5f221eba85e60bb0365', ''),
(11, 12228412, 'Faisal', '895386490035', '0000-00-00', 62, NULL, 'laki-laki', 'Zaenal', 'kuningan, kec. nusaherang', 'karyawan swasta', '75858fa65d7f9d54bc2e7c0245b965bd', ''),
(12, 12228426, 'Zahra Purnama', '895386490035', '2009-04-27', 61, NULL, 'perempuan', 'Zaenudin', 'Cirebon', 'karyawan swasta', '5ed3f19679a473eaf51b982e4e1dfdcf', ''),
(13, 12228431, 'Syaiful akbar', '08677586576', '2009-10-12', 65, 7, 'laki-laki', 'Syahrukan', 'Cirebon', 'karyawan swasta', 'dc52d327d227e8db0e71a25527ea7678', ''),
(22, 1243453435, 'Naisya', '85454525245', '2009-04-21', 65, 2, 'perempuan', 'Faisal', 'Cirebon', 'karyawan swasta', '37646cd8756c216573c371356ba4e6d7', '1728793759832.jpg'),
(23, 12228430, 'Epul Saeful', '089675754', '2007-04-05', 61, 2, 'laki-laki', 'Udin solehudin', 'Cirebon', 'karyawan swasta', '5efcc6762c77595465023029e664ae8b', '1728791295473.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tahun_ajaran`
--

CREATE TABLE `tahun_ajaran` (
  `idth` int(11) NOT NULL,
  `nama_ajaran` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tahun_ajaran`
--

INSERT INTO `tahun_ajaran` (`idth`, `nama_ajaran`) VALUES
(2, '2025-2027'),
(7, '2022-2028');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','guru','siswa') NOT NULL,
  `id_sekolah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `role`, `id_sekolah`) VALUES
(3, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absen`
--
ALTER TABLE `absen`
  ADD PRIMARY KEY (`ida`);

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id_guru`);

--
-- Indexes for table `hari`
--
ALTER TABLE `hari`
  ADD PRIMARY KEY (`idh`);

--
-- Indexes for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD PRIMARY KEY (`idj`),
  ADD KEY `idg` (`idg`),
  ADD KEY `idk` (`idk`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id_kelas`),
  ADD UNIQUE KEY `nama_kelas` (`nama_kelas`),
  ADD KEY `id_sekolah` (`id_sekolah`);

--
-- Indexes for table `mata_pelajaran`
--
ALTER TABLE `mata_pelajaran`
  ADD PRIMARY KEY (`idm`);

--
-- Indexes for table `riwayat`
--
ALTER TABLE `riwayat`
  ADD PRIMARY KEY (`id_riwayat`),
  ADD KEY `id_siswa` (`id_siswa`,`id_kelas`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indexes for table `sekolah`
--
ALTER TABLE `sekolah`
  ADD PRIMARY KEY (`id_sekolah`);

--
-- Indexes for table `siswa`
--
ALTER TABLE `siswa`
  ADD PRIMARY KEY (`id_siswa`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indexes for table `tahun_ajaran`
--
ALTER TABLE `tahun_ajaran`
  ADD PRIMARY KEY (`idth`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_sekolah` (`id_sekolah`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absen`
--
ALTER TABLE `absen`
  MODIFY `ida` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `id_guru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `hari`
--
ALTER TABLE `hari`
  MODIFY `idh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `idj` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `mata_pelajaran`
--
ALTER TABLE `mata_pelajaran`
  MODIFY `idm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `riwayat`
--
ALTER TABLE `riwayat`
  MODIFY `id_riwayat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sekolah`
--
ALTER TABLE `sekolah`
  MODIFY `id_sekolah` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id_siswa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tahun_ajaran`
--
ALTER TABLE `tahun_ajaran`
  MODIFY `idth` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal`
--
ALTER TABLE `jadwal`
  ADD CONSTRAINT `jadwal_ibfk_1` FOREIGN KEY (`idg`) REFERENCES `guru` (`id_guru`),
  ADD CONSTRAINT `jadwal_ibfk_2` FOREIGN KEY (`idh`) REFERENCES `hari` (`idh`),
  ADD CONSTRAINT `jadwal_ibfk_3` FOREIGN KEY (`idk`) REFERENCES `kelas` (`id_kelas`),
  ADD CONSTRAINT `jadwal_ibfk_4` FOREIGN KEY (`idm`) REFERENCES `mata_pelajaran` (`idm`);

--
-- Constraints for table `kelas`
--
ALTER TABLE `kelas`
  ADD CONSTRAINT `kelas_ibfk_1` FOREIGN KEY (`id_sekolah`) REFERENCES `sekolah` (`id_sekolah`);

--
-- Constraints for table `riwayat`
--
ALTER TABLE `riwayat`
  ADD CONSTRAINT `riwayat_ibfk_1` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`),
  ADD CONSTRAINT `riwayat_ibfk_2` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`);

--
-- Constraints for table `siswa`
--
ALTER TABLE `siswa`
  ADD CONSTRAINT `siswa_ibfk_1` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_sekolah`) REFERENCES `sekolah` (`id_sekolah`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

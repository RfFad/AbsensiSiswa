-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 09:02 AM
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
  `id_absen` varchar(30) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `id_jadwal` int(11) NOT NULL,
  `id_guru` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `status` enum('hadir','izin','sakit','alpa') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `absen`
--

INSERT INTO `absen` (`id_absen`, `id_siswa`, `id_kelas`, `id_jadwal`, `id_guru`, `tanggal`, `status`) VALUES
('135_33_2024-11-25', 135, 61, 33, 9, '2024-11-25', 'hadir'),
('135_36_2024-11-26', 135, 61, 36, 9, '2024-11-26', 'hadir'),
('135_37_2024-11-26', 135, 61, 37, 10, '2024-11-26', 'hadir'),
('135_40_2024-11-26', 135, 61, 40, 15, '2024-11-26', 'hadir'),
('32_33_2024-11-25', 32, 61, 33, 9, '2024-11-25', 'hadir'),
('32_36_2024-11-26', 32, 61, 36, 9, '2024-11-26', 'alpa'),
('32_37_2024-11-26', 32, 61, 37, 10, '2024-11-26', 'alpa'),
('32_40_2024-11-26', 32, 61, 40, 15, '2024-11-26', 'alpa'),
('33_33_2024-11-25', 33, 61, 33, 9, '2024-11-25', 'alpa'),
('33_36_2024-11-26', 33, 61, 36, 9, '2024-11-26', 'alpa'),
('33_37_2024-11-26', 33, 61, 37, 10, '2024-11-26', 'hadir'),
('33_40_2024-11-26', 33, 61, 40, 15, '2024-11-26', 'alpa'),
('34_33_2024-11-25', 34, 61, 33, 9, '2024-11-25', 'hadir'),
('34_36_2024-11-26', 34, 61, 36, 9, '2024-11-26', 'hadir'),
('34_37_2024-11-26', 34, 61, 37, 10, '2024-11-26', 'hadir'),
('34_40_2024-11-26', 34, 61, 40, 15, '2024-11-26', 'alpa'),
('35_33_2024-11-25', 35, 61, 33, 9, '2024-11-25', 'hadir'),
('35_36_2024-11-26', 35, 61, 36, 9, '2024-11-26', 'hadir'),
('35_37_2024-11-26', 35, 61, 37, 10, '2024-11-26', 'hadir'),
('35_40_2024-11-26', 35, 61, 40, 15, '2024-11-26', 'hadir'),
('36_33_2024-11-25', 36, 61, 33, 9, '2024-11-25', 'hadir'),
('36_36_2024-11-26', 36, 61, 36, 9, '2024-11-26', 'hadir'),
('36_37_2024-11-26', 36, 61, 37, 10, '2024-11-26', 'hadir'),
('36_40_2024-11-26', 36, 61, 40, 15, '2024-11-26', 'hadir'),
('37_33_2024-11-25', 37, 61, 33, 9, '2024-11-25', 'hadir'),
('37_36_2024-11-26', 37, 61, 36, 9, '2024-11-26', 'hadir'),
('37_37_2024-11-26', 37, 61, 37, 10, '2024-11-26', 'hadir'),
('37_40_2024-11-26', 37, 61, 40, 15, '2024-11-26', 'hadir'),
('38_33_2024-11-25', 38, 61, 33, 9, '2024-11-25', 'hadir'),
('38_36_2024-11-26', 38, 61, 36, 9, '2024-11-26', 'hadir'),
('38_37_2024-11-26', 38, 61, 37, 10, '2024-11-26', 'hadir'),
('38_40_2024-11-26', 38, 61, 40, 15, '2024-11-26', 'hadir'),
('39_33_2024-11-25', 39, 61, 33, 9, '2024-11-25', 'hadir'),
('39_36_2024-11-26', 39, 61, 36, 9, '2024-11-26', 'hadir'),
('39_37_2024-11-26', 39, 61, 37, 10, '2024-11-26', 'hadir'),
('39_40_2024-11-26', 39, 61, 40, 15, '2024-11-26', 'hadir'),
('40_33_2024-11-25', 40, 61, 33, 9, '2024-11-25', 'hadir'),
('40_36_2024-11-26', 40, 61, 36, 9, '2024-11-26', 'hadir'),
('40_37_2024-11-26', 40, 61, 37, 10, '2024-11-26', 'hadir'),
('40_40_2024-11-26', 40, 61, 40, 15, '2024-11-26', 'hadir'),
('41_33_2024-11-25', 41, 61, 33, 9, '2024-11-25', 'hadir'),
('41_36_2024-11-26', 41, 61, 36, 9, '2024-11-26', 'hadir'),
('41_37_2024-11-26', 41, 61, 37, 10, '2024-11-26', 'hadir'),
('41_40_2024-11-26', 41, 61, 40, 15, '2024-11-26', 'hadir'),
('42_33_2024-11-25', 42, 61, 33, 9, '2024-11-25', 'hadir'),
('42_36_2024-11-26', 42, 61, 36, 9, '2024-11-26', 'hadir'),
('42_37_2024-11-26', 42, 61, 37, 10, '2024-11-26', 'hadir'),
('42_40_2024-11-26', 42, 61, 40, 15, '2024-11-26', 'hadir'),
('43_33_2024-11-25', 43, 61, 33, 9, '2024-11-25', 'hadir'),
('43_36_2024-11-26', 43, 61, 36, 9, '2024-11-26', 'hadir'),
('43_37_2024-11-26', 43, 61, 37, 10, '2024-11-26', 'hadir'),
('43_40_2024-11-26', 43, 61, 40, 15, '2024-11-26', 'hadir'),
('44_33_2024-11-25', 44, 61, 33, 9, '2024-11-25', 'hadir'),
('44_36_2024-11-26', 44, 61, 36, 9, '2024-11-26', 'hadir'),
('44_37_2024-11-26', 44, 61, 37, 10, '2024-11-26', 'hadir'),
('44_40_2024-11-26', 44, 61, 40, 15, '2024-11-26', 'hadir'),
('45_33_2024-11-25', 45, 61, 33, 9, '2024-11-25', 'hadir'),
('45_36_2024-11-26', 45, 61, 36, 9, '2024-11-26', 'hadir'),
('45_37_2024-11-26', 45, 61, 37, 10, '2024-11-26', 'hadir'),
('45_40_2024-11-26', 45, 61, 40, 15, '2024-11-26', 'hadir'),
('46_33_2024-11-25', 46, 61, 33, 9, '2024-11-25', 'hadir'),
('46_36_2024-11-26', 46, 61, 36, 9, '2024-11-26', 'hadir'),
('46_37_2024-11-26', 46, 61, 37, 10, '2024-11-26', 'hadir'),
('46_40_2024-11-26', 46, 61, 40, 15, '2024-11-26', 'hadir'),
('47_33_2024-11-25', 47, 61, 33, 9, '2024-11-25', 'hadir'),
('47_36_2024-11-26', 47, 61, 36, 9, '2024-11-26', 'hadir'),
('47_37_2024-11-26', 47, 61, 37, 10, '2024-11-26', 'hadir'),
('47_40_2024-11-26', 47, 61, 40, 15, '2024-11-26', 'hadir'),
('48_33_2024-11-25', 48, 61, 33, 9, '2024-11-25', 'hadir'),
('48_36_2024-11-26', 48, 61, 36, 9, '2024-11-26', 'hadir'),
('48_37_2024-11-26', 48, 61, 37, 10, '2024-11-26', 'hadir'),
('48_40_2024-11-26', 48, 61, 40, 15, '2024-11-26', 'hadir'),
('49_33_2024-11-25', 49, 61, 33, 9, '2024-11-25', 'hadir'),
('49_36_2024-11-26', 49, 61, 36, 9, '2024-11-26', 'hadir'),
('49_37_2024-11-26', 49, 61, 37, 10, '2024-11-26', 'hadir'),
('49_40_2024-11-26', 49, 61, 40, 15, '2024-11-26', 'hadir'),
('50_33_2024-11-25', 50, 61, 33, 9, '2024-11-25', 'hadir'),
('50_36_2024-11-26', 50, 61, 36, 9, '2024-11-26', 'hadir'),
('50_37_2024-11-26', 50, 61, 37, 10, '2024-11-26', 'hadir'),
('50_40_2024-11-26', 50, 61, 40, 15, '2024-11-26', 'hadir'),
('51_33_2024-11-25', 51, 61, 33, 9, '2024-11-25', 'hadir'),
('51_36_2024-11-26', 51, 61, 36, 9, '2024-11-26', 'hadir'),
('51_37_2024-11-26', 51, 61, 37, 10, '2024-11-26', 'hadir'),
('51_40_2024-11-26', 51, 61, 40, 15, '2024-11-26', 'hadir'),
('52_33_2024-11-25', 52, 61, 33, 9, '2024-11-25', 'hadir'),
('52_36_2024-11-26', 52, 61, 36, 9, '2024-11-26', 'hadir'),
('52_37_2024-11-26', 52, 61, 37, 10, '2024-11-26', 'hadir'),
('52_40_2024-11-26', 52, 61, 40, 15, '2024-11-26', 'hadir'),
('53_33_2024-11-25', 53, 61, 33, 9, '2024-11-25', 'hadir'),
('53_36_2024-11-26', 53, 61, 36, 9, '2024-11-26', 'hadir'),
('53_37_2024-11-26', 53, 61, 37, 10, '2024-11-26', 'hadir'),
('53_40_2024-11-26', 53, 61, 40, 15, '2024-11-26', 'hadir'),
('54_33_2024-11-25', 54, 61, 33, 9, '2024-11-25', 'hadir'),
('54_36_2024-11-26', 54, 61, 36, 9, '2024-11-26', 'hadir'),
('54_37_2024-11-26', 54, 61, 37, 10, '2024-11-26', 'hadir'),
('54_40_2024-11-26', 54, 61, 40, 15, '2024-11-26', 'hadir'),
('55_33_2024-11-25', 55, 61, 33, 9, '2024-11-25', 'hadir'),
('55_36_2024-11-26', 55, 61, 36, 9, '2024-11-26', 'hadir'),
('55_37_2024-11-26', 55, 61, 37, 10, '2024-11-26', 'hadir'),
('55_40_2024-11-26', 55, 61, 40, 15, '2024-11-26', 'hadir'),
('56_33_2024-11-25', 56, 61, 33, 9, '2024-11-25', 'hadir'),
('56_36_2024-11-26', 56, 61, 36, 9, '2024-11-26', 'hadir'),
('56_37_2024-11-26', 56, 61, 37, 10, '2024-11-26', 'hadir'),
('56_40_2024-11-26', 56, 61, 40, 15, '2024-11-26', 'hadir'),
('57_33_2024-11-25', 57, 61, 33, 9, '2024-11-25', 'hadir'),
('57_36_2024-11-26', 57, 61, 36, 9, '2024-11-26', 'hadir'),
('57_37_2024-11-26', 57, 61, 37, 10, '2024-11-26', 'hadir'),
('57_40_2024-11-26', 57, 61, 40, 15, '2024-11-26', 'hadir'),
('58_33_2024-11-25', 58, 61, 33, 9, '2024-11-25', 'hadir'),
('58_36_2024-11-26', 58, 61, 36, 9, '2024-11-26', 'hadir'),
('58_37_2024-11-26', 58, 61, 37, 10, '2024-11-26', 'hadir'),
('58_40_2024-11-26', 58, 61, 40, 15, '2024-11-26', 'hadir'),
('59_33_2024-11-25', 59, 61, 33, 9, '2024-11-25', 'hadir'),
('59_36_2024-11-26', 59, 61, 36, 9, '2024-11-26', 'hadir'),
('59_37_2024-11-26', 59, 61, 37, 10, '2024-11-26', 'hadir'),
('59_40_2024-11-26', 59, 61, 40, 15, '2024-11-26', 'hadir'),
('60_33_2024-11-25', 60, 61, 33, 9, '2024-11-25', 'hadir'),
('60_36_2024-11-26', 60, 61, 36, 9, '2024-11-26', 'hadir'),
('60_37_2024-11-26', 60, 61, 37, 10, '2024-11-26', 'hadir'),
('60_40_2024-11-26', 60, 61, 40, 15, '2024-11-26', 'hadir'),
('61_33_2024-11-25', 61, 61, 33, 9, '2024-11-25', 'hadir'),
('61_36_2024-11-26', 61, 61, 36, 9, '2024-11-26', 'hadir'),
('61_37_2024-11-26', 61, 61, 37, 10, '2024-11-26', 'hadir'),
('61_40_2024-11-26', 61, 61, 40, 15, '2024-11-26', 'hadir'),
('62_33_2024-11-25', 62, 61, 33, 9, '2024-11-25', 'hadir'),
('62_36_2024-11-26', 62, 61, 36, 9, '2024-11-26', 'hadir'),
('62_37_2024-11-26', 62, 61, 37, 10, '2024-11-26', 'hadir'),
('62_40_2024-11-26', 62, 61, 40, 15, '2024-11-26', 'hadir'),
('63_33_2024-11-25', 63, 61, 33, 9, '2024-11-25', 'hadir'),
('63_36_2024-11-26', 63, 61, 36, 9, '2024-11-26', 'hadir'),
('63_37_2024-11-26', 63, 61, 37, 10, '2024-11-26', 'hadir'),
('63_40_2024-11-26', 63, 61, 40, 15, '2024-11-26', 'hadir'),
('64_33_2024-11-25', 64, 61, 33, 9, '2024-11-25', 'hadir'),
('64_36_2024-11-26', 64, 61, 36, 9, '2024-11-26', 'hadir'),
('64_37_2024-11-26', 64, 61, 37, 10, '2024-11-26', 'hadir'),
('64_40_2024-11-26', 64, 61, 40, 15, '2024-11-26', 'hadir'),
('65_33_2024-11-25', 65, 61, 33, 9, '2024-11-25', 'hadir'),
('65_36_2024-11-26', 65, 61, 36, 9, '2024-11-26', 'hadir'),
('65_37_2024-11-26', 65, 61, 37, 10, '2024-11-26', 'hadir'),
('65_40_2024-11-26', 65, 61, 40, 15, '2024-11-26', 'alpa');

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
  `foto` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`id_guru`, `nip`, `nama_guru`, `idm`, `jk`, `jabatan`, `alamat`, `tlp`, `password`, `foto`) VALUES
(9, 19841212, 'Budi utomo', 22, 'laki-laki', 'S.Pd.', 'Kuningan', '081234567890', 'ff64b279180af9707c0e1582b1c882ec', '1732450500928.jfif'),
(10, 19941004, 'Chinatsu sakurasa', 23, 'perempuan', 'S.Pd.', 'kuningan, kec. nusaherang', '8997988767465', '1bd1fba2f1843d193e9c65db310ddc1e', '1732450763175.jfif'),
(11, 19890101, 'Sulton Aulia', 20, 'laki-laki', 'S.Pd.', 'Jamblang', '8943749343', 'de222eebb9da5e4b4fe2595d8f3bbc96', ''),
(13, 13334567, 'Agus Septian', 24, 'laki-laki', 'S.Or.', 'Cirebon, Saladara', '08677586576', '3a2321fef46634e6ff6a6d7d6e922e23', ''),
(14, 144456788, 'Aldan', 24, 'laki-laki', 'S.Pd.', 'kuningan, kec. nusaherang', '895386490035', 'dc08f76369e307749b0e37734b63da78', ''),
(15, 122245669, 'Oscar', 21, 'laki-laki', 'S.Pd.', 'Cirebon', '895386490035', '99800f3f47cc92dcdf506e86fde2111b', '1730603840714.jpg'),
(21, 123456, 'Budi Santoso', 22, 'laki-laki', 'Guru', 'Jl. Merdeka No. 10', '8888888', '6ac1e56bc78f031059be7be854522c4c', NULL),
(22, 234567, 'Siti Nurhaliza', 23, 'perempuan', 'Guru', 'Jl. Raya No. 5', '8888888', '343827be62a50347e470dbb77f3c2558', NULL);

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
-- Table structure for table `izin`
--

CREATE TABLE `izin` (
  `id_izin` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_guru` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `jenis` enum('izin','sakit') NOT NULL,
  `keterangan` text NOT NULL,
  `status` enum('pending','disetujui','ditolak') DEFAULT 'pending',
  `read` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `izin`
--

INSERT INTO `izin` (`id_izin`, `id_siswa`, `id_guru`, `tanggal`, `jenis`, `keterangan`, `status`, `read`, `created_at`, `updated_at`) VALUES
(30, 6, 9, '2024-11-21', 'izin', 'malas', 'disetujui', 1, '2024-11-21 10:17:55', '2024-11-21 10:18:38');

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
(33, 1, 9, 61, 22, '07:30:00', '08:30:00', 0),
(34, 1, 10, 61, 23, '08:35:00', '09:30:00', 0),
(35, 1, 15, 61, 21, '10:00:00', '11:00:00', 0),
(36, 2, 9, 61, 22, '09:30:00', '10:40:00', 0),
(37, 2, 10, 61, 23, '10:40:00', '11:30:00', 0),
(38, 2, 11, 61, 20, '07:30:00', '08:30:00', 0),
(39, 2, 13, 61, 24, '08:35:00', '09:30:00', 0),
(40, 2, 15, 61, 21, '13:01:00', '14:09:00', 1);

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
(66, '8A', 1),
(67, '9A', 1);

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
-- Table structure for table `notifications_riwayat`
--

CREATE TABLE `notifications_riwayat` (
  `id` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `message` text NOT NULL,
  `type` enum('success','warning','info','error') NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `id_sekolah` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications_riwayat`
--

INSERT INTO `notifications_riwayat` (`id`, `id_siswa`, `message`, `type`, `is_read`, `id_sekolah`, `created_at`) VALUES
(40, 12, 'Selamat! Anda telah mendapatkan prestasi.', 'success', 0, 1, '2024-11-21 10:56:49'),
(43, 32, 'Peringatan! Anda telah melakukan pelanggaran', 'warning', 1, 1, '2024-11-26 03:41:34'),
(44, 32, 'Peringatan! Anda telah melakukan pelanggaran', 'warning', 1, 1, '2024-11-26 04:32:46'),
(45, 32, 'Anda tidak hadir di jam pelajaran pada tanggal 2024-11-26', 'warning', 0, 1, '2024-11-26 06:15:34'),
(46, 33, 'Anda tidak hadir di jam pelajaran pada tanggal 2024-11-26', 'warning', 0, 1, '2024-11-26 06:15:34'),
(47, 34, 'Anda tidak hadir di jam pelajaran pada tanggal 2024-11-26', 'warning', 1, 1, '2024-11-26 06:15:34'),
(48, 32, 'Anda tidak hadir di jam pelajaran B. Inggris pada tanggal 2024-11-26', 'warning', 0, 1, '2024-11-26 06:19:14'),
(49, 33, 'Anda tidak hadir di jam pelajaran B. Inggris pada tanggal 2024-11-26', 'warning', 0, 1, '2024-11-26 06:19:14'),
(50, 34, 'Anda tidak hadir di jam pelajaran B. Inggris pada tanggal 2024-11-26', 'warning', 0, 1, '2024-11-26 06:19:15'),
(51, 65, 'Anda tidak hadir di jam pelajaran B. Inggris pada tanggal 2024-11-26', 'warning', 0, 1, '2024-11-26 06:19:15');

-- --------------------------------------------------------

--
-- Table structure for table `pengumpulan_tugas`
--

CREATE TABLE `pengumpulan_tugas` (
  `id_pengumpulan` int(11) NOT NULL,
  `id_tugas` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `tanggal_pengumpulan` date NOT NULL,
  `file_jawaban` varchar(255) DEFAULT NULL,
  `text_jawaban` text DEFAULT NULL,
  `status` enum('diterima','ditolak','menunggu') DEFAULT 'menunggu',
  `nilai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengumpulan_tugas`
--

INSERT INTO `pengumpulan_tugas` (`id_pengumpulan`, `id_tugas`, `id_siswa`, `tanggal_pengumpulan`, `file_jawaban`, `text_jawaban`, `status`, `nilai`) VALUES
(45, 35, 32, '2024-11-25', NULL, '<p>Inni hanya lah contoh</p>', 'menunggu', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `riwayat`
--

CREATE TABLE `riwayat` (
  `id_riwayat` int(11) NOT NULL,
  `id_siswa` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `jenis_riwayat` enum('Prestasi','Pelanggaran') NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `tanggal` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `riwayat`
--

INSERT INTO `riwayat` (`id_riwayat`, `id_siswa`, `id_kelas`, `jenis_riwayat`, `deskripsi`, `tanggal`, `created_at`, `updated_at`) VALUES
(25, 33, 61, 'Prestasi', 'Meraih juara 1 kejuaraan volly tingkat kabupaten ', '2024-11-14', '2024-11-24 12:41:33', '2024-11-24 12:41:33'),
(26, 33, 61, 'Pelanggaran', 'Manjat pagar', '2024-11-25', '2024-11-25 02:03:35', '2024-11-25 02:03:35'),
(27, 32, 61, 'Pelanggaran', 'Membawa rokok kesekolah', '2024-11-26', '2024-11-26 03:41:33', '2024-11-26 03:41:33'),
(28, 32, 61, 'Pelanggaran', 'Merokok di dalam kelas', '2024-11-28', '2024-11-26 04:32:45', '2024-11-26 04:32:45');

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
(1, '21312389127389', 'smpn@gmail.com', 'SMPN 1 NGAWI', 'KOTA. CIREBON');

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
(32, 240001, 'Ahmad Fadli', '08123000001', '2011-02-02', 61, 10, 'laki-laki', 'Wali 1', 'Kuningan', 'Petani', '76074f612628b0b8b7639f6e244b4aa9', '1732422296053.jpg'),
(33, 240002, 'Ahmad Zainuddin', '08123000002', '2011-03-03', 61, 10, 'laki-laki', 'Wali 2', 'Kuningan', 'Guru', '42d5032e0ff118cf8b2f2e8499822326', NULL),
(34, 240003, 'Aliyah Nuraini', '08123000003', '2011-04-04', 61, 10, 'perempuan', 'Wali 3', 'Kuningan', 'Dokter', 'ee7c8e9b161ad434a06e4bdb0be6570f', NULL),
(35, 240004, 'Aisyah Khairunnisa', '08123000004', '2011-05-05', 61, 10, 'perempuan', 'Wali 4', 'Kuningan', 'Pedagang', 'fa79be9131e64a6820fefd3cb222b522', NULL),
(36, 240005, 'Arif Rahman', '08123000005', '2011-06-06', 61, 10, 'laki-laki', 'Wali 5', 'Kuningan', 'Karyawan', 'ede0f018178de4d20a3ce98b121d87a8', NULL),
(37, 240006, 'Bella Ardiani', '08123000006', '2011-07-07', 61, 10, 'perempuan', 'Wali 6', 'Kuningan', 'Wiraswasta', '65f66916e31c4e25681c27a7da8b1fae', NULL),
(38, 240007, 'Bima Pratama', '08123000007', '2011-08-08', 61, 10, 'laki-laki', 'Wali 7', 'Kuningan', 'Peternak', '6ea848b9058010a7a11cd93cb1488d3a', NULL),
(39, 240008, 'Citra Anggraini', '08123000008', '2011-09-09', 61, 10, 'perempuan', 'Wali 8', 'Kuningan', 'Pegawai Negeri', '987ed2034c1fc864a68ed0642b879c07', NULL),
(40, 240009, 'Daffa Ananda', '08123000009', '2011-10-10', 61, 10, 'laki-laki', 'Wali 9', 'Kuningan', 'PNS', '80703a3747cea274f0012904cc5ddad5', NULL),
(41, 240010, 'Dian Maharani', '08123000010', '2011-11-11', 61, 10, 'perempuan', 'Wali 10', 'Kuningan', 'Guru', '8fa15e077586a067af3b0ea099604132', NULL),
(42, 240011, 'Eka Saputra', '08123000011', '2011-12-12', 61, 10, 'laki-laki', 'Wali 11', 'Kuningan', 'Petani', 'd8ecfedda51682d9ec9fd859d4c433b0', NULL),
(43, 240012, 'Eliya Rahmawati', '08123000012', '2011-01-13', 61, 10, 'perempuan', 'Wali 12', 'Kuningan', 'Pedagang', '7ab62df6c779a19705e61de5a8ac1654', NULL),
(44, 240013, 'Farhan Hidayat', '08123000013', '2011-02-14', 61, 10, 'laki-laki', 'Wali 13', 'Kuningan', 'Wiraswasta', 'bc304f65fb2069505d51e963c0673096', NULL),
(45, 240014, 'Fitriani Aulia', '08123000014', '2011-03-15', 61, 10, 'perempuan', 'Wali 14', 'Kuningan', 'Pegawai Negeri', 'c978bb05493c12e9a7c47840cf7245ab', NULL),
(46, 240015, 'Gilang Pratama', '08123000015', '2011-04-16', 61, 10, 'laki-laki', 'Wali 15', 'Kuningan', 'PNS', '46f79c182fae7be3d3b9ff66be8c5cd4', NULL),
(47, 240016, 'Hana Salsabila', '08123000016', '2011-05-17', 61, 10, 'perempuan', 'Wali 16', 'Kuningan', 'Guru', 'aec41dcb3dc5c864df943d2cc04c1c23', NULL),
(48, 240017, 'Ilham Prasetyo', '08123000017', '2011-06-18', 61, 10, 'laki-laki', 'Wali 17', 'Kuningan', 'Petani', '6b72ca1c415d91be2c032103dccc503d', NULL),
(49, 240018, 'Indah Permatasari', '08123000018', '2011-07-19', 61, 10, 'perempuan', 'Wali 18', 'Kuningan', 'Guru', 'c7b271cd228127394cf40fa74f7e954c', NULL),
(50, 240019, 'Joko Santoso', '08123000019', '2011-08-20', 61, 10, 'laki-laki', 'Wali 19', 'Kuningan', 'Dokter', '44e4a3510fd3e0704d5c36d95988a589', NULL),
(51, 240020, 'Karina Putri', '08123000020', '2011-09-21', 61, 10, 'perempuan', 'Wali 20', 'Kuningan', 'Pedagang', '2b6fa68c9670f9a8917eacac44b72ce8', NULL),
(52, 240021, 'Lutfi Rizky', '08123000021', '2011-10-22', 61, 10, 'laki-laki', 'Wali 21', 'Kuningan', 'Karyawan', '4c9ed1bcb47a1b7f2ee12a0e0104f6c0', NULL),
(53, 240022, 'Maya Kusuma', '08123000022', '2011-11-23', 61, 10, 'perempuan', 'Wali 22', 'Kuningan', 'Wiraswasta', 'b82e889334e968d6dc089d400ec01056', NULL),
(54, 240023, 'Naufal Ramadhan', '08123000023', '2011-12-24', 61, 10, 'laki-laki', 'Wali 23', 'Kuningan', 'Peternak', 'aeb0012d9f67ebb5421934033df4b342', NULL),
(55, 240024, 'Nurul Huda', '08123000024', '2011-01-25', 61, 10, 'perempuan', 'Wali 24', 'Kuningan', 'Pegawai Negeri', '68a66d8e95bf81df24ad7be44515cfa5', NULL),
(56, 240025, 'Olivia Sari', '08123000025', '2011-02-26', 61, 10, 'perempuan', 'Wali 25', 'Kuningan', 'PNS', '2bdd535097e3a292ce014d4038b3a432', NULL),
(57, 240026, 'Pratama Bagus', '08123000026', '2011-03-27', 61, 10, 'laki-laki', 'Wali 26', 'Kuningan', 'Guru', '1e3dbf2948e737eda59c4c3128846d31', NULL),
(58, 240027, 'Qory Rahma', '08123000027', '2011-04-28', 61, 10, 'perempuan', 'Wali 27', 'Kuningan', 'Petani', 'ab3cb1361085f0e45df897ef2ccc95fb', NULL),
(59, 240028, 'Rina Mulyani', '08123000028', '2011-05-01', 61, 10, 'perempuan', 'Wali 28', 'Kuningan', 'Guru', 'cd89a72a1c7bc6b2ef2fbad32d14bae9', NULL),
(60, 240029, 'Sandi Hakim', '08123000029', '2011-06-02', 61, 10, 'laki-laki', 'Wali 29', 'Kuningan', 'Dokter', 'dbcb741591fa807d459df7b6b81ae7ae', NULL),
(61, 240030, 'Tasya Amalia', '08123000030', '2011-07-03', 61, 10, 'perempuan', 'Wali 30', 'Kuningan', 'Pedagang', '38048d2c663affe252258e65379a90c6', NULL),
(62, 240031, 'Umar Zaki', '08123000031', '2011-08-04', 61, 10, 'laki-laki', 'Wali 31', 'Kuningan', 'Karyawan', 'a4d93844a30f733e5b1f0bc725f3fd15', NULL),
(63, 240032, 'Vina Lestari', '08123000032', '2011-09-05', 61, 10, 'perempuan', 'Wali 32', 'Kuningan', 'Wiraswasta', '0cfbefbf61dbf71000e0ce65245b86ec', NULL),
(64, 240033, 'Wahyu Pratama', '08123000033', '2011-10-06', 61, 10, 'laki-laki', 'Wali 33', 'Kuningan', 'Pegawai Negeri', '57a3db8303d79c1f9ac81ba7b7177efa', NULL),
(65, 240034, 'Zahra Amira', '08123000034', '2011-11-07', 61, 10, 'perempuan', 'Wali 34', 'Kuningan', 'PNS', '31e014597efad69c6df7b24470d73800', NULL),
(135, 12228425, 'fanzz', '8997988767465', '2024-11-24', 61, 10, 'laki-laki', '-', 'kuningan, kec. nusaherang', 'Guru', '202cb962ac59075b964b07152d234b70', NULL),
(237, 230001, 'Aditya Pramudya Setiawan', '08123000001', '2010-01-05', 66, 11, 'laki-laki', 'Agus Santoso', 'Kuningan', 'Petani', '8be4de9f646aac751380035936a79bdf', NULL),
(238, 230002, 'Aldi Muhammad Rahman', '08123000002', '2010-02-14', 66, 11, 'laki-laki', 'Siti Nurjanah', 'Kuningan', 'Guru', '602d9c541b1fdbc23d712f20f27abed9', NULL),
(239, 230003, 'Andrianto Sumarsono', '08123000003', '2010-03-21', 66, 11, 'laki-laki', 'Joko Widodo', 'Kuningan', 'Wiraswasta', '70f3a32351668d354ba034b01c34f481', NULL),
(240, 230004, 'Bimo Anggara Pranata', '08123000004', '2010-04-03', 66, 11, 'laki-laki', 'Mita Pramudita', 'Kuningan', 'Pedagang', '475f54c6c84b94db9deb2c7728e17755', NULL),
(241, 230005, 'Celia Viona Pramudita', '08123000005', '2010-05-15', 66, 11, 'perempuan', 'Andi Mulyadi', 'Kuningan', 'Karyawan', '0ad337e1fd1b5e082a95da857399f92c', NULL),
(242, 230006, 'Cynthia Dwi Saraswati', '08123000006', '2010-06-27', 66, 11, 'perempuan', 'Siti Aisyah', 'Kuningan', 'Wiraswasta', 'f15cf80c1a68fbfdce0b69cce952bce0', NULL),
(243, 230007, 'Darren Aditya Jatmiko', '08123000007', '2010-07-09', 66, 11, 'laki-laki', 'Budi Hartono', 'Kuningan', 'Peternak', '6e8fa366b599ebddce8edd3f0ad074f1', NULL),
(244, 230008, 'Dian Ayu Lestari', '08123000008', '2010-08-18', 66, 11, 'perempuan', 'Dewi Lestari', 'Kuningan', 'Petani', 'fa596afe2e2a37cb923cac67988031c1', NULL),
(245, 230009, 'Dewi Anggraini Suhartini', '08123000009', '2010-09-02', 66, 11, 'perempuan', 'Hendrik Siahaan', 'Kuningan', 'PNS', 'cdd7dcab8642d39f25b02555cf2ce488', NULL),
(246, 230010, 'Farhan Iqbal Maulana', '08123000010', '2010-10-24', 66, 11, 'laki-laki', 'Maria Magdalena', 'Kuningan', 'Guru', '449f11df5ba8d770718df06972afcb93', NULL),
(247, 230011, 'Fadil Akbar Prasetyo', '08123000011', '2010-11-07', 66, 11, 'laki-laki', 'Fajar Pratama', 'Kuningan', 'Petani', 'b4bc270a9ad3b2ccd4e0f99884eb976e', NULL),
(248, 230012, 'Fiona Rina Santoso', '08123000012', '2010-12-15', 66, 11, 'perempuan', 'Rina Pertiwi', 'Kuningan', 'Pedagang', 'bf723434f5080361d6f237ff36e9b1da', NULL),
(249, 230013, 'Galih Pratama Rachman', '08123000013', '2010-01-02', 66, 11, 'laki-laki', 'Taufik Hidayat', 'Kuningan', 'Wiraswasta', '846d38460fb9ce1a186a4331e9520053', NULL),
(250, 230014, 'Gilang Fauzan Iskandar', '08123000014', '2011-02-13', 66, 11, 'laki-laki', 'Dwi Yuliana', 'Kuningan', 'Pegawai Negeri', '56c17e9edda524fc7d5e736dcd8e94de', NULL),
(251, 230015, 'Hannah Kristina Sari', '08123000015', '2010-03-26', 66, 11, 'perempuan', 'Irwan Fadhil', 'Kuningan', 'PNS', '487cd3b48a572360dbf5a522c7b38aeb', NULL),
(252, 230016, 'Hendra Setiawan Nugroho', '08123000016', '2011-04-04', 66, 11, 'laki-laki', 'Nurul Hidayah', 'Kuningan', 'Guru', '49b57cb58b0c5632b3a61b0dc1f9491a', NULL),
(253, 230017, 'Iqbal Alif Fadli', '08123000017', '2010-05-19', 66, 11, 'laki-laki', 'Eko Prasetyo', 'Kuningan', 'Petani', 'f451891aa054547c7876d2e366e8a4da', NULL),
(254, 230018, 'Januarius Christianus Tobing', '08123000018', '2010-06-01', 66, 11, 'laki-laki', 'Ratna Wulansari', 'Kuningan', 'Guru', '3f66a65d88b8b73e0fa013ab2e2449c5', NULL),
(255, 230019, 'Melina Angeline Kristiani', '08123000019', '2010-07-20', 66, 11, 'perempuan', 'Zainal Abidin', 'Kuningan', 'Dokter', 'bf78852145ba17785297c86f0bbbd008', NULL),
(256, 230020, 'Maya Saraswati Wirawan', '08123000020', '2010-08-08', 66, 11, 'perempuan', 'Farida Kurnia', 'Kuningan', 'Pedagang', '0cc732b6bf5f1db9b7dc580d0109f9c5', NULL),
(257, 230021, 'Muhammad Rizki Alfarabi', '08123000021', '2010-01-11', 66, 11, 'laki-laki', 'Yusuf Abdullah', 'Kuningan', 'Karyawan', 'dd6f0bf6ff32bfbb645c98b10cdbb840', NULL),
(258, 230022, 'Naufal Fadillah Ramadhan', '08123000022', '2010-02-20', 66, 11, 'laki-laki', 'Laila Sari', 'Kuningan', 'Wiraswasta', '0729acacaa0daeccf96fea5a893d57c1', NULL),
(259, 230023, 'Nina Arista Rahmawati', '08123000023', '2010-03-15', 66, 11, 'perempuan', 'Rudi Setiawan', 'Kuningan', 'Peternak', 'f3188a860ccee6e707997a1d8cde5711', NULL),
(260, 230024, 'Reihaan Faizal Kurniawan', '08123000024', '2010-04-19', 66, 11, 'laki-laki', 'Fina Kusuma', 'Kuningan', 'Pegawai Negeri', '1c195f7eec02117d4305eabfeeab9fd7', NULL),
(261, 230025, 'Reza Arief Pratama', '08123000025', '2010-05-03', 66, 11, 'laki-laki', 'Arifin Anwar', 'Kuningan', 'PNS', '7e8fb6bd581a92191f38cba96b89bf49', NULL),
(262, 230026, 'Rika Melati Susanti', '08123000026', '2010-06-12', 66, 11, 'perempuan', 'Eliza Putri', 'Kuningan', 'Guru', '4a27f65dbad5c36e4b9c229758cfe271', NULL),
(263, 230027, 'Raisa Intan Permata', '08123000027', '2010-07-25', 66, 11, 'perempuan', 'Musa Ali', 'Kuningan', 'Petani', '0965eacc163deb79a12414cec4a2a7aa', NULL),
(264, 230028, 'Siti Nur Aisyah Zahra', '08123000028', '2010-08-30', 66, 11, 'perempuan', 'Zainab Mahmud', 'Kuningan', 'programmer', 'fc295b4e430da2f099b4ebc33985d320', NULL),
(265, 230029, 'Teguh Panca Wicaksono', '08123000029', '2010-09-18', 66, 11, 'laki-laki', 'Hendra Wijaya', 'Kuningan', 'Dokter', '9014282a4e8e3c8266b5a119ebaf2634', NULL),
(266, 230030, 'Vania Salsabila Rahayu', '08123000030', '2010-10-06', 66, 11, 'perempuan', 'Putri Lestari', 'Kuningan', 'Pedagang', '51b28e5c3996ac650958eed28d6362b1', NULL),
(267, 230031, 'Vera Novita Kumala', '08123000031', '2010-08-30', 66, 11, 'perempuan', 'Tomi Saputra', 'Kuningan', 'Karyawan', '7ee25f015bbc4b9e2c188a347279f644', NULL),
(268, 230032, 'Wahyu Purnama Dewanto', '08123000032', '2010-10-06', 66, 11, 'laki-laki', 'Endang Sulastri', 'Kuningan', 'Wiraswasta', '2984b24a105e56730cdb71b968a014bd', NULL),
(269, 230033, 'Yuliana Lydia Oktavia', '08123000033', '2010-05-03', 66, 11, 'perempuan', 'Rizki Hidayat', 'Kuningan', 'Pegawai Negeri', '20447dc7feff1ced6b5e4640332084e0', NULL),
(270, 230034, 'Zahrul Purnama', '08123000033', '2011-12-08', 66, 11, 'laki-laki', 'Lina Anggraini', 'Kuningan', 'Karyawan', 'd349caf5389ac557c2c1839b4ca5b380', NULL),
(398, 240035, 'Aditya Prabowo Santoso', '08123000001', '2011-02-02', 62, 10, 'laki-laki', 'Wali 35', 'Kuningan', 'Petani', '8b332ea5b52e14355151cfb6c0e68988', NULL),
(399, 240036, 'Andi Supriyadi', '08123000002', '2011-03-03', 62, 10, 'laki-laki', 'Wali 36', 'Kuningan', 'Guru', 'ffe5187acaeb64de03423b27839a60b7', NULL),
(400, 240037, 'Bagus Wahyu Prakoso', '08123000003', '2011-04-04', 62, 10, 'laki-laki', 'Wali 37', 'Kuningan', 'Dokter', '8d12b2132b1e8cab2868778faa1f25dc', NULL),
(401, 240038, 'Budi Santosa', '08123000004', '2011-05-05', 62, 10, 'laki-laki', 'Wali 38', 'Kuningan', 'Pedagang', 'becf9bbdd8d0119ea80d55ddfba3670a', NULL),
(402, 240039, 'Cahya Dewi Puspitasari', '08123000005', '2011-06-06', 62, 10, 'perempuan', 'Wali 39', 'Kuningan', 'Karyawan', '685324b66c3c845c8abd551e14e81ee0', NULL),
(403, 240040, 'Citra Sari Dewi', '08123000006', '2011-07-07', 62, 10, 'perempuan', 'Wali 40', 'Kuningan', 'Wiraswasta', 'c1998dc46c9fb37829b1aae0a3afafcf', NULL),
(404, 240041, 'Dewi Saraswati Putri', '08123000007', '2011-08-08', 62, 10, 'perempuan', 'Wali 41', 'Kuningan', 'Peternak', '4f5e186d1366f54ae59a1ef740e470cd', NULL),
(405, 240042, 'Diana Ratnasari', '08123000008', '2011-09-09', 62, 10, 'perempuan', 'Wali 42', 'Kuningan', 'Pegawai Negeri', '44eacfbf24b8bc78f0536185d82de294', NULL),
(406, 240043, 'Eka Kurniawan Suryadi', '08123000009', '2011-10-10', 62, 10, 'perempuan', 'Wali 43', 'Kuningan', 'PNS', 'ad3c42f0d2c5c28e40b7cf9148877b67', NULL),
(407, 240044, 'Erik Dwi Prasetya', '08123000010', '2011-11-11', 62, 10, 'laki-laki', 'Wali 44', 'Kuningan', 'Guru', '845d3ebd095e9f15b868f5c0dae5d29c', NULL),
(408, 240045, 'Fajar Nur Rahman', '08123000011', '2011-12-12', 62, 10, 'laki-laki', 'Wali 45', 'Kuningan', 'Petani', 'e3d567435f07a249e8e7309e66b9914f', NULL),
(409, 240046, 'Fahri Ardiansyah', '08123000012', '2011-01-13', 62, 10, 'perempuan', 'Wali 46', 'Kuningan', 'Pedagang', '8330a7b3c860c32aa81b262036eb130e', NULL),
(410, 240047, 'Galih Prasetyo Setiawan', '08123000013', '2011-02-14', 62, 10, 'laki-laki', 'Wali 47', 'Kuningan', 'Wiraswasta', '028961107456d335208f88767906b34d', NULL),
(411, 240048, 'Gita Rachmawati', '08123000014', '2011-03-15', 62, 10, 'perempuan', 'Wali 48', 'Kuningan', 'Pegawai Negeri', 'e5d4da8be6318563fa570c45d92bfd0c', NULL),
(412, 240049, 'Hadi Santoso Wijaya', '08123000015', '2011-04-16', 62, 10, 'laki-laki', 'Wali 49', 'Kuningan', 'PNS', 'df624a7815531e78f1335cc24f3cde49', NULL),
(413, 240050, 'Hendra Wijaya Kusuma', '08123000016', '2011-05-17', 62, 10, 'laki-laki', 'Wali 50', 'Kuningan', 'Guru', 'cbc5edac8f5845bc6872edd98c8c4a6e', NULL),
(414, 240051, 'Intan Permata Sari', '08123000017', '2011-06-18', 62, 10, 'perempuan', 'Wali 51', 'Kuningan', 'Petani', '3118be25ccaa56703ecf76082a5d88e1', NULL),
(415, 240052, 'Indra Kurniawan', '08123000018', '2011-07-19', 62, 10, 'perempuan', 'Wali 52', 'Kuningan', 'Guru', '94ce72369c0e1e769f5f9ca72e78e375', NULL),
(416, 240053, 'Joko Sutrisno Prabowo', '08123000019', '2011-08-20', 62, 10, 'laki-laki', 'Wali 53', 'Kuningan', 'Dokter', '978a8c1e43e66dd1dd56bdab4fc878c9', NULL),
(417, 240054, 'Kirana Dwi Cahya', '08123000020', '2011-09-21', 62, 10, 'perempuan', 'Wali 54', 'Kuningan', 'Pedagang', 'fb2c5b65d0d9e7775ed95c19f0f1ac87', NULL),
(418, 240055, 'Laksmi Wulandari', '08123000021', '2011-10-22', 62, 10, 'laki-laki', 'Wali 55', 'Kuningan', 'Karyawan', 'a59a3dcceeb283273dc8df051235bbc5', NULL),
(419, 240056, 'Maya Kurniasih', '08123000022', '2011-11-23', 62, 10, 'perempuan', 'Wali 56', 'Kuningan', 'Wiraswasta', '2fe578cdb88f35144f5cdbbec0c1cb26', NULL),
(420, 240057, 'Novi Indah Setiawati', '08123000023', '2011-12-24', 62, 10, 'perempuan', 'Wali 57', 'Kuningan', 'Peternak', '4acc950a65ac84bfbfb8b98862a41a64', NULL),
(421, 240058, 'Oktavianus Suryawan', '08123000024', '2011-01-25', 62, 10, 'perempuan', 'Wali 58', 'Kuningan', 'Pegawai Negeri', '1f5050098b12f1bb475509882b4b4b5e', NULL),
(422, 240059, 'Putri Ayu Pramesti', '08123000025', '2011-02-26', 62, 10, 'perempuan', 'Wali 59', 'Kuningan', 'PNS', 'dd322c8edd82d9b546681a4156b1897a', NULL),
(423, 240060, 'Rizki Alamsyah', '08123000026', '2011-03-27', 62, 10, 'laki-laki', 'Wali 60', 'Kuningan', 'Guru', 'a2fd988b0aa223c0fb3484afdf78c720', NULL),
(424, 240061, 'Siti Nurhayati', '08123000027', '2011-04-28', 62, 10, 'perempuan', 'Wali 61', 'Kuningan', 'Petani', 'ccf76886e25fd6fefcbe10310f98194f', NULL),
(425, 240062, 'Teguh Prasetyo', '08123000028', '2011-05-01', 62, 10, 'laki-laki', 'Wali 62', 'Kuningan', 'Guru', 'bd621675d18037c58950b2e9c29e91ea', NULL),
(426, 240063, 'Uli Wahyuni', '08123000029', '2011-06-02', 62, 10, 'laki-laki', 'Wali 63', 'Kuningan', 'Dokter', '5156edfad66aa28fe115a4b249a21dbf', NULL),
(427, 240064, 'Vina Kusuma Dewi', '08123000030', '2011-07-03', 62, 10, 'perempuan', 'Wali 64', 'Kuningan', 'Pedagang', '69c45d54859382a8d737539c2956ad9f', NULL),
(428, 240065, 'Wahyudi Taufik', '08123000031', '2011-08-04', 62, 10, 'laki-laki', 'Wali 65', 'Kuningan', 'Karyawan', '9e9ebd775e605d4f4b9be70837c0f5bb', NULL),
(429, 240066, 'Xander Pradipta', '08123000032', '2011-09-05', 62, 10, 'perempuan', 'Wali 66', 'Kuningan', 'Wiraswasta', 'c1976c67fc4a67977bc38901e482eb46', NULL),
(430, 240067, 'Yuniar Wulandari', '08123000033', '2011-10-06', 62, 10, 'laki-laki', 'Wali 67', 'Kuningan', 'Pegawai Negeri', '66de451bc552f321c2b749cb2a7a30bc', NULL),
(431, 240068, 'Zahra Cahyani', '08123000034', '2011-11-07', 62, 10, 'perempuan', 'Wali 68', 'Kuningan', 'PNS', 'ecbf0f59b0984fd97a6409424cdf70ea', NULL);

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
(10, '2024-2027'),
(11, '2023-2026');

-- --------------------------------------------------------

--
-- Table structure for table `tugas`
--

CREATE TABLE `tugas` (
  `id_tugas` int(11) NOT NULL,
  `id_guru` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `id_mapel` int(11) NOT NULL,
  `judul_tugas` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `tanggal_diberikan` date NOT NULL,
  `tanggal_deadline` date NOT NULL,
  `waktu_deadline` time NOT NULL,
  `file_tugas` varchar(255) DEFAULT NULL,
  `status` enum('aktif','selesai') DEFAULT 'aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tugas`
--

INSERT INTO `tugas` (`id_tugas`, `id_guru`, `id_kelas`, `id_mapel`, `judul_tugas`, `deskripsi`, `tanggal_diberikan`, `tanggal_deadline`, `waktu_deadline`, `file_tugas`, `status`) VALUES
(35, 9, 61, 22, 'Mencatat', 'Catatlah materi di buku catatan, pada halaman 50 hingga bab selesai', '2024-11-25', '2024-11-29', '08:10:00', NULL, 'aktif');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `jk` enum('laki-laki','perempuan') NOT NULL,
  `role` enum('admin','guru','siswa') NOT NULL,
  `foto` text DEFAULT NULL,
  `id_sekolah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `email`, `jk`, `role`, `foto`, `id_sekolah`) VALUES
(3, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'masamba20@gmail.com', 'laki-laki', 'admin', '1732412983673.jpg', 1),
(6, 'M. refan', 'ae3b8522ff25e24c8e10df2d249af803', 'refanfadillah2007@gmail.com', 'laki-laki', 'admin', '1732421971446.jfif', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absen`
--
ALTER TABLE `absen`
  ADD PRIMARY KEY (`id_absen`);

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
-- Indexes for table `izin`
--
ALTER TABLE `izin`
  ADD PRIMARY KEY (`id_izin`);

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
-- Indexes for table `notifications_riwayat`
--
ALTER TABLE `notifications_riwayat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pengumpulan_tugas`
--
ALTER TABLE `pengumpulan_tugas`
  ADD PRIMARY KEY (`id_pengumpulan`),
  ADD KEY `id_tugas` (`id_tugas`),
  ADD KEY `id_siswa` (`id_siswa`);

--
-- Indexes for table `riwayat`
--
ALTER TABLE `riwayat`
  ADD PRIMARY KEY (`id_riwayat`);

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
-- Indexes for table `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`id_tugas`);

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
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `id_guru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `hari`
--
ALTER TABLE `hari`
  MODIFY `idh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `izin`
--
ALTER TABLE `izin`
  MODIFY `id_izin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `jadwal`
--
ALTER TABLE `jadwal`
  MODIFY `idj` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `mata_pelajaran`
--
ALTER TABLE `mata_pelajaran`
  MODIFY `idm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `notifications_riwayat`
--
ALTER TABLE `notifications_riwayat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `pengumpulan_tugas`
--
ALTER TABLE `pengumpulan_tugas`
  MODIFY `id_pengumpulan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `riwayat`
--
ALTER TABLE `riwayat`
  MODIFY `id_riwayat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `sekolah`
--
ALTER TABLE `sekolah`
  MODIFY `id_sekolah` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `siswa`
--
ALTER TABLE `siswa`
  MODIFY `id_siswa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=432;

--
-- AUTO_INCREMENT for table `tahun_ajaran`
--
ALTER TABLE `tahun_ajaran`
  MODIFY `idth` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tugas`
--
ALTER TABLE `tugas`
  MODIFY `id_tugas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Constraints for table `pengumpulan_tugas`
--
ALTER TABLE `pengumpulan_tugas`
  ADD CONSTRAINT `pengumpulan_tugas_ibfk_1` FOREIGN KEY (`id_tugas`) REFERENCES `tugas` (`id_tugas`),
  ADD CONSTRAINT `pengumpulan_tugas_ibfk_2` FOREIGN KEY (`id_siswa`) REFERENCES `siswa` (`id_siswa`);

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

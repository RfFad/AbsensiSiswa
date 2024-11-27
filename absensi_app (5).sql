-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2024 at 09:37 AM
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
(21, 123456, 'Budi Santoso', 27, 'laki-laki', 'S.Pd.', 'Jl. Merdeka No. 10', '8888888', '6ac1e56bc78f031059be7be854522c4c', NULL),
(22, 234567, 'Siti Nurhaliza', 28, 'perempuan', 'S.Pd.', 'Jl. Raya No. 5', '8888888', '343827be62a50347e470dbb77f3c2558', NULL),
(24, 19990347, 'Suhanan Madi', 25, 'laki-laki', 'S.Pd.', 'Kuningan', '', 'e4af1a33d53cfd89ec5f763b2e870e0b', NULL),
(25, 200013452, 'Sarutobi Suhedi', 26, 'laki-laki', 'S.Pd.', 'Kuningan', '85454525245', '4112f4b2fb9a475d77f8ac02725aad4f', NULL);

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
(33, 1, 13, 61, 24, '07:45:00', '08:45:00', 0),
(34, 1, 10, 61, 23, '08:45:00', '09:30:00', 0),
(35, 1, 15, 61, 21, '10:00:00', '11:00:00', 0),
(36, 2, 9, 61, 22, '09:30:00', '10:40:00', 0),
(37, 2, 10, 61, 23, '10:40:00', '11:30:00', 0),
(38, 2, 11, 61, 20, '07:30:00', '08:30:00', 0),
(39, 2, 21, 61, 27, '08:35:00', '09:30:00', 0),
(41, 3, 24, 61, 25, '07:30:00', '08:30:00', 0),
(42, 1, 24, 62, 25, '07:45:00', '08:30:00', 0),
(43, 3, 25, 61, 26, '08:30:00', '10:30:00', 0),
(44, 3, 22, 61, 28, '10:00:00', '11:30:00', 0),
(45, 4, 21, 61, 27, '07:30:00', '08:30:00', 0),
(46, 4, 10, 61, 23, '08:30:00', '09:30:00', 0),
(47, 1, 10, 62, 23, '10:00:00', '11:30:00', 0),
(48, 1, 21, 62, 27, '08:30:00', '09:30:00', 0),
(49, 2, 13, 62, 24, '07:30:00', '08:30:00', 0),
(50, 2, 11, 62, 20, '08:30:00', '09:30:00', 0);

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
(67, '9A', 1),
(68, '8B', 1),
(69, 'alumni', 1),
(70, '9B', 1);

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
(24, 'Penjas'),
(25, 'IPS'),
(26, 'Seni Budaya'),
(27, 'B. Indonesia'),
(28, 'PAI');

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
(45, 32, 'Anda tidak hadir di jam pelajaran pada tanggal 2024-11-26', 'warning', 1, 1, '2024-11-26 06:15:34'),
(46, 33, 'Anda tidak hadir di jam pelajaran pada tanggal 2024-11-26', 'warning', 0, 1, '2024-11-26 06:15:34'),
(47, 34, 'Anda tidak hadir di jam pelajaran pada tanggal 2024-11-26', 'warning', 1, 1, '2024-11-26 06:15:34'),
(48, 32, 'Anda tidak hadir di jam pelajaran B. Inggris pada tanggal 2024-11-26', 'warning', 1, 1, '2024-11-26 06:19:14'),
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
(466, 240001, 'Ahmad Fadli', '08123000001', '2011-02-02', 61, 10, 'laki-laki', 'Wali 1', 'Kuningan', 'Petani', '7eef80c22c83846c3f3240439f1ac6fa', NULL),
(467, 240002, 'Ahmad Zainuddin', '08123000002', '2011-03-03', 61, 10, 'laki-laki', 'Wali 2', 'Kuningan', 'Guru', 'c61291c5cd10a4d22311f019ebf918c6', NULL),
(468, 240003, 'Aliyah Nuraini', '08123000003', '2011-04-04', 61, 10, 'perempuan', 'Wali 3', 'Kuningan', 'Dokter', '00e00208e2da3bec92e88e9d8c9940bc', NULL),
(469, 240004, 'Aisyah Khairunnisa', '08123000004', '2011-05-05', 61, 10, 'perempuan', 'Wali 4', 'Kuningan', 'Pedagang', '0325540a9670f267ef669e5e64c309c4', NULL),
(470, 240005, 'Arif Rahman', '08123000005', '2011-06-06', 61, 10, 'laki-laki', 'Wali 5', 'Kuningan', 'Karyawan', '259e618d043346a41dc0985cf0f00ac3', NULL),
(471, 240006, 'Bella Ardiani', '08123000006', '2011-07-07', 61, 10, 'perempuan', 'Wali 6', 'Kuningan', 'Wiraswasta', 'cf5271a46f9fc70d755261db0fe447cb', NULL),
(472, 240007, 'Bima Pratama', '08123000007', '2011-08-08', 61, 10, 'laki-laki', 'Wali 7', 'Kuningan', 'Peternak', '0d2520f8c0a6f9aa47ba68d15f40c87f', NULL),
(473, 240008, 'Citra Anggraini', '08123000008', '2011-09-09', 61, 10, 'perempuan', 'Wali 8', 'Kuningan', 'Pegawai Negeri', '0e773dc26782d8b787f58ac8c0e8d301', NULL),
(474, 240009, 'Daffa Ananda', '08123000009', '2011-10-10', 61, 10, 'laki-laki', 'Wali 9', 'Kuningan', 'PNS', 'b161f104e9121cb2b1c8c2dab745debe', NULL),
(475, 240010, 'Dian Maharani', '08123000010', '2011-11-11', 61, 10, 'perempuan', 'Wali 10', 'Kuningan', 'Guru', '416a16001a1c734a85fdfe4d61fcd2b0', NULL),
(476, 240011, 'Eka Saputra', '08123000011', '2011-12-12', 61, 10, 'laki-laki', 'Wali 11', 'Kuningan', 'Petani', 'ca12eba802a0f6e3bca7978d8e5b7758', NULL),
(477, 240012, 'Eliya Rahmawati', '08123000012', '2011-01-13', 61, 10, 'perempuan', 'Wali 12', 'Kuningan', 'Pedagang', '19f5e575def049febe00471decb05c5f', NULL),
(478, 240013, 'Farhan Hidayat', '08123000013', '2011-02-14', 61, 10, 'laki-laki', 'Wali 13', 'Kuningan', 'Wiraswasta', '762f74d5e00fa12a69af11af58e03ded', NULL),
(479, 240014, 'Fitriani Aulia', '08123000014', '2011-03-15', 61, 10, 'perempuan', 'Wali 14', 'Kuningan', 'Pegawai Negeri', 'f1ebbb4493c28da3768811dd343f0318', NULL),
(480, 240015, 'Gilang Pratama', '08123000015', '2011-04-16', 61, 10, 'laki-laki', 'Wali 15', 'Kuningan', 'PNS', '02fd1f998641824eb37e4db323626fda', NULL),
(481, 240016, 'Hana Salsabila', '08123000016', '2011-05-17', 61, 10, 'perempuan', 'Wali 16', 'Kuningan', 'Guru', '2f788526c923149e7b82ba883222aa01', NULL),
(482, 240017, 'Ilham Prasetyo', '08123000017', '2011-06-18', 61, 10, 'laki-laki', 'Wali 17', 'Kuningan', 'Petani', 'f99c7e2124dfbe14e877bbd0ff4ce8bf', NULL),
(483, 240018, 'Indah Permatasari', '08123000018', '2011-07-19', 61, 10, 'perempuan', 'Wali 18', 'Kuningan', 'Guru', '8965d58795a42f4aa48696f1d0ac2c7a', NULL),
(484, 240019, 'Joko Santoso', '08123000019', '2011-08-20', 61, 10, 'laki-laki', 'Wali 19', 'Kuningan', 'Dokter', '466b424a4810312aaf4d06317ad16056', NULL),
(485, 240020, 'Karina Putri', '08123000020', '2011-09-21', 61, 10, 'perempuan', 'Wali 20', 'Kuningan', 'Pedagang', '9076729ec0a4b79fdcc68fecc8a21758', NULL),
(486, 240021, 'Lutfi Rizky', '08123000021', '2011-10-22', 61, 10, 'laki-laki', 'Wali 21', 'Kuningan', 'Karyawan', '331221700f37cf153be80eace7038a72', NULL),
(487, 240022, 'Maya Kusuma', '08123000022', '2011-11-23', 61, 10, 'perempuan', 'Wali 22', 'Kuningan', 'Wiraswasta', '8a035bfda6c16c222a9edbcf7666a6ba', NULL),
(488, 240023, 'Naufal Ramadhan', '08123000023', '2011-12-24', 61, 10, 'laki-laki', 'Wali 23', 'Kuningan', 'Peternak', '8daa191e9f9e120f689a09a6c54d936f', NULL),
(489, 240024, 'Nurul Huda', '08123000024', '2011-01-25', 61, 10, 'perempuan', 'Wali 24', 'Kuningan', 'Pegawai Negeri', 'd598a8d4db0325be8ebf9e01446beb9b', NULL),
(490, 240025, 'Olivia Sari', '08123000025', '2011-02-26', 61, 10, 'perempuan', 'Wali 25', 'Kuningan', 'PNS', '77807e9c0e780230072e997209107c03', NULL),
(491, 240026, 'Pratama Bagus', '08123000026', '2011-03-27', 61, 10, 'laki-laki', 'Wali 26', 'Kuningan', 'Guru', 'de5519d71e312dd8548b6e192add1f1c', NULL),
(492, 240027, 'Qory Rahma', '08123000027', '2011-04-28', 61, 10, 'perempuan', 'Wali 27', 'Kuningan', 'Petani', '13657dd7bb63da71c0d034c0f9ee12ac', NULL),
(493, 240028, 'Rina Mulyani', '08123000028', '2011-05-01', 61, 10, 'perempuan', 'Wali 28', 'Kuningan', 'Guru', 'e68f805ff2dc003f69a5638c9b3bd1ad', NULL),
(494, 240029, 'Sandi Hakim', '08123000029', '2011-06-02', 61, 10, 'laki-laki', 'Wali 29', 'Kuningan', 'Dokter', '3f7e17af7e60c21d42d2c4e4616ad7d9', NULL),
(495, 240030, 'Tasya Amalia', '08123000030', '2011-07-03', 61, 10, 'perempuan', 'Wali 30', 'Kuningan', 'Pedagang', '485b89509a7fe4a93d904d134f8aa195', NULL),
(496, 240031, 'Umar Zaki', '08123000031', '2011-08-04', 61, 10, 'laki-laki', 'Wali 31', 'Kuningan', 'Karyawan', '7da7b751ec623124a96ba5430638c60e', NULL),
(497, 240032, 'Vina Lestari', '08123000032', '2011-09-05', 61, 10, 'perempuan', 'Wali 32', 'Kuningan', 'Wiraswasta', '2cf29c18f2e30e39bf395a2e668fa1bd', NULL),
(498, 240033, 'Wahyu Pratama', '08123000033', '2011-10-06', 61, 10, 'laki-laki', 'Wali 33', 'Kuningan', 'Pegawai Negeri', '8c5d0019ed07dd0a6105e68e69b43d7f', NULL),
(499, 240034, 'Zahra Amira', '08123000034', '2011-11-07', 61, 10, 'perempuan', 'Wali 34', 'Kuningan', 'PNS', '8639df321d11d198f3d3c5dced5a1780', NULL),
(500, 240035, 'Aditya Prabowo Santoso', '08123000001', '2011-02-02', 62, 10, 'laki-laki', 'Wali 35', 'Kuningan', 'Petani', '8b332ea5b52e14355151cfb6c0e68988', NULL),
(501, 240036, 'Andi Supriyadi', '08123000002', '2011-03-03', 62, 10, 'laki-laki', 'Wali 36', 'Kuningan', 'Guru', 'ffe5187acaeb64de03423b27839a60b7', NULL),
(502, 240037, 'Bagus Wahyu Prakoso', '08123000003', '2011-04-04', 62, 10, 'laki-laki', 'Wali 37', 'Kuningan', 'Dokter', '8d12b2132b1e8cab2868778faa1f25dc', NULL),
(503, 240038, 'Budi Santosa', '08123000004', '2011-05-05', 62, 10, 'laki-laki', 'Wali 38', 'Kuningan', 'Pedagang', 'becf9bbdd8d0119ea80d55ddfba3670a', NULL),
(504, 240039, 'Cahya Dewi Puspitasari', '08123000005', '2011-06-06', 62, 10, 'perempuan', 'Wali 39', 'Kuningan', 'Karyawan', '685324b66c3c845c8abd551e14e81ee0', NULL),
(505, 240040, 'Citra Sari Dewi', '08123000006', '2011-07-07', 62, 10, 'perempuan', 'Wali 40', 'Kuningan', 'Wiraswasta', 'b143b9e879b5a7687d7e5305168dad7b', NULL),
(506, 240041, 'Dewi Saraswati Putri', '08123000007', '2011-08-08', 62, 10, 'perempuan', 'Wali 41', 'Kuningan', 'Peternak', 'd6e806b62ffbdce916b48db05ed63d6e', NULL),
(507, 240042, 'Diana Ratnasari', '08123000008', '2011-09-09', 62, 10, 'perempuan', 'Wali 42', 'Kuningan', 'Pegawai Negeri', '8a425f6b5a75912e6157653521889594', NULL),
(508, 240043, 'Eka Kurniawan Suryadi', '08123000009', '2011-10-10', 62, 10, 'perempuan', 'Wali 43', 'Kuningan', 'PNS', 'bff325286e25b416ed5c0a7aab505a85', NULL),
(509, 240044, 'Erik Dwi Prasetya', '08123000010', '2011-11-11', 62, 10, 'laki-laki', 'Wali 44', 'Kuningan', 'Guru', 'f7c7a1498c7fd56da74895d6b2490800', NULL),
(510, 240045, 'Fajar Nur Rahman', '08123000011', '2011-12-12', 62, 10, 'laki-laki', 'Wali 45', 'Kuningan', 'Petani', 'bf1db79338c70ed410e07ba6acfce3e9', NULL),
(511, 240046, 'Fahri Ardiansyah', '08123000012', '2011-01-13', 62, 10, 'perempuan', 'Wali 46', 'Kuningan', 'Pedagang', '61571407356b9b66f0c7a9d65c5d9767', NULL),
(512, 240047, 'Galih Prasetyo Setiawan', '08123000013', '2011-02-14', 62, 10, 'laki-laki', 'Wali 47', 'Kuningan', 'Wiraswasta', 'c8dc7801c73c005190d825cba23f2a27', NULL),
(513, 240048, 'Gita Rachmawati', '08123000014', '2011-03-15', 62, 10, 'perempuan', 'Wali 48', 'Kuningan', 'Pegawai Negeri', 'cf3f73763cdc81a5a2c7058ff84361e9', NULL),
(514, 240049, 'Hadi Santoso Wijaya', '08123000015', '2011-04-16', 62, 10, 'laki-laki', 'Wali 49', 'Kuningan', 'PNS', 'fc597b468aadd20b2360cbf0cfba87ab', NULL),
(515, 240050, 'Hendra Wijaya Kusuma', '08123000016', '2011-05-17', 62, 10, 'laki-laki', 'Wali 50', 'Kuningan', 'Guru', 'cb5ea742df48638911f374cc267d1a79', NULL),
(516, 240051, 'Intan Permata Sari', '08123000017', '2011-06-18', 62, 10, 'perempuan', 'Wali 51', 'Kuningan', 'Petani', '6bcacf2290af4879f29c0d7bd15ea507', NULL),
(517, 240052, 'Indra Kurniawan', '08123000018', '2011-07-19', 62, 10, 'perempuan', 'Wali 52', 'Kuningan', 'Guru', '03b734fd287821565e514424683dba7b', NULL),
(518, 240053, 'Joko Sutrisno Prabowo', '08123000019', '2011-08-20', 62, 10, 'laki-laki', 'Wali 53', 'Kuningan', 'Dokter', '5930a484d32da3007a36479954198dc1', NULL),
(519, 240054, 'Kirana Dwi Cahya', '08123000020', '2011-09-21', 62, 10, 'perempuan', 'Wali 54', 'Kuningan', 'Pedagang', '76351e359ea2832d6ba3651f1fc05552', NULL),
(520, 240055, 'Laksmi Wulandari', '08123000021', '2011-10-22', 62, 10, 'laki-laki', 'Wali 55', 'Kuningan', 'Karyawan', '6d3608dd09d7ab4dab959fc7e72b3165', NULL),
(521, 240056, 'Maya Kurniasih', '08123000022', '2011-11-23', 62, 10, 'perempuan', 'Wali 56', 'Kuningan', 'Wiraswasta', 'c949d402efb7e55e036f7317495b6c07', NULL),
(522, 240057, 'Novi Indah Setiawati', '08123000023', '2011-12-24', 62, 10, 'perempuan', 'Wali 57', 'Kuningan', 'Peternak', 'c7f7b7ee1c97ae0c6fe52ffc5395142d', NULL),
(523, 240058, 'Oktavianus Suryawan', '08123000024', '2011-01-25', 62, 10, 'perempuan', 'Wali 58', 'Kuningan', 'Pegawai Negeri', '1728c6ea58beb665fd63483cafe7f092', NULL),
(524, 240059, 'Putri Ayu Pramesti', '08123000025', '2011-02-26', 62, 10, 'perempuan', 'Wali 59', 'Kuningan', 'PNS', '13810b21383bc845a702a5133bbdd044', NULL),
(525, 240060, 'Rizki Alamsyah', '08123000026', '2011-03-27', 62, 10, 'laki-laki', 'Wali 60', 'Kuningan', 'Guru', '87b9d247d6a02e7c0fa2636e0ecf22c1', NULL),
(526, 240061, 'Siti Nurhayati', '08123000027', '2011-04-28', 62, 10, 'perempuan', 'Wali 61', 'Kuningan', 'Petani', '8be66d7571a3a3e7c25e5ae9bfad3bcd', NULL),
(527, 240062, 'Teguh Prasetyo', '08123000028', '2011-05-01', 62, 10, 'laki-laki', 'Wali 62', 'Kuningan', 'Guru', '4a2fbf32d726d1f68496346322d14f04', NULL),
(528, 240063, 'Uli Wahyuni', '08123000029', '2011-06-02', 62, 10, 'laki-laki', 'Wali 63', 'Kuningan', 'Dokter', '399eeab54c942f6455e8f15b38d92fe3', NULL),
(529, 240064, 'Vina Kusuma Dewi', '08123000030', '2011-07-03', 62, 10, 'perempuan', 'Wali 64', 'Kuningan', 'Pedagang', '38b3c01d4ab72a964910792553276989', NULL),
(530, 240065, 'Wahyudi Taufik', '08123000031', '2011-08-04', 62, 10, 'laki-laki', 'Wali 65', 'Kuningan', 'Karyawan', 'c4aef3d60e08d269c946115ca827ccc6', NULL),
(531, 240066, 'Xander Pradipta', '08123000032', '2011-09-05', 62, 10, 'perempuan', 'Wali 66', 'Kuningan', 'Wiraswasta', 'f00310f0736abf37a1d540c761ff25d7', NULL),
(532, 240067, 'Yuniar Wulandari', '08123000033', '2011-10-06', 62, 10, 'laki-laki', 'Wali 67', 'Kuningan', 'Pegawai Negeri', 'd05c6c4fbc7c16e7cb9ae56cb8b936f2', NULL),
(533, 240068, 'Zahra Cahyani', '08123000034', '2011-11-07', 62, 10, 'perempuan', 'Wali 68', 'Kuningan', 'PNS', 'c0e74b4884dfedc27461d80d47527765', NULL),
(534, 240069, 'Alya Pramesti', '08123000001', '2011-06-02', 64, 10, 'perempuan', 'Wali 35', 'Kuningan', 'Petani', 'daf5eb97d097177798862226c4bd9119', NULL),
(535, 240070, 'Arif Prasetya', '08123000002', '2011-03-03', 64, 10, 'laki-laki', 'Wali 36', 'Kuningan', 'Guru', '0263bfc3fd7514fc0bb0474091434c22', NULL),
(536, 240071, 'Bagus Adi Putra', '08123000003', '2011-04-11', 64, 10, 'laki-laki', 'Wali 37', 'Kuningan', 'Dokter', '7deed0385cb8813efc3e4935b0e9c44b', NULL),
(537, 240072, 'Bunga Suciati', '08123000004', '2011-05-05', 64, 10, 'perempuan', 'Wali 38', 'Kuningan', 'Pedagang', 'd2959588b964416db42a844a84ff3560', NULL),
(538, 240073, 'Cahaya Larasati', '08123000005', '2011-06-06', 64, 10, 'perempuan', 'Wali 39', 'Kuningan', 'Karyawan', '7455e09ec6a0353419498dfa6732f6c8', NULL),
(539, 240074, 'Cahya Pramudya', '08123000006', '2011-07-20', 64, 10, 'laki-laki', 'Wali 40', 'Kuningan', 'Wiraswasta', 'c3e29d2621bc8968cc74554bacd0f2f0', NULL),
(540, 240075, 'Diana Sari Putri', '08123000007', '2011-09-08', 64, 10, 'perempuan', 'Wali 41', 'Kuningan', 'Peternak', '676cc8ebb18a60866b09f1f589f1aca7', NULL),
(541, 240076, 'Dewi Mariani', '08123000008', '2011-09-09', 64, 10, 'perempuan', 'Wali 42', 'Kuningan', 'Pegawai Negeri', '67ab3c4091017d68e001f359e4f3c65a', NULL),
(542, 240077, 'Eko Prasetyo', '08123000009', '2011-10-10', 64, 10, 'laki-laki', 'Wali 43', 'Kuningan', 'PNS', '1ddaecc940d0d25921326bf2ea14d8be', NULL),
(543, 240078, 'Erna Siti Salamah', '08123000010', '2011-11-11', 64, 10, 'perempuan', 'Wali 44', 'Kuningan', 'Guru', 'ad4f16b5cdfc73f869e21f41d807ff53', NULL),
(544, 240079, 'Fathia Nurhayati', '08123000011', '2011-12-12', 64, 10, 'perempuan', 'Wali 45', 'Kuningan', 'Petani', '3e4736f2da3ac0086c7dad8c08b3a4f3', NULL),
(545, 240080, 'Fira Anggraeni', '08123000012', '2011-01-13', 64, 10, 'perempuan', 'Wali 46', 'Kuningan', 'Pedagang', '78c79a31856ccddb6a674ef76d3afd91', NULL),
(546, 240081, 'Gilang Ramadhan', '08123000013', '2011-02-14', 64, 10, 'laki-laki', 'Wali 47', 'Kuningan', 'Wiraswasta', 'fb3949dd5d34b2b9eed7ab6e640dd4ef', NULL),
(547, 240082, 'Gita Cahyani', '08123000014', '2011-03-15', 64, 10, 'perempuan', 'Wali 48', 'Kuningan', 'Pegawai Negeri', '8555ab68088b7fb035772d1c6b30b0b1', NULL),
(548, 240083, 'Hani Setiawati', '08123000015', '2011-04-16', 64, 10, 'perempuan', 'Wali 49', 'Kuningan', 'PNS', '5c4e2a372a692f4ca9a107bb2d3984b4', NULL),
(549, 240084, 'Hendra Prabowo', '08123000016', '2011-05-17', 64, 10, 'laki-laki', 'Wali 50', 'Kuningan', 'Guru', '64c8851af8e8d925d7eb8b4a47e56367', NULL),
(550, 240085, 'Indah Lestari', '08123000017', '2011-06-18', 64, 10, 'perempuan', 'Wali 51', 'Kuningan', 'Petani', '47da2acd1102697742aa27d2137e8d11', NULL),
(551, 240086, 'Irfan Dwi Putra', '08123000018', '2011-07-19', 64, 10, 'laki-laki', 'Wali 52', 'Kuningan', 'Guru', 'caad3cc37cea9843707fcde965d79627', NULL),
(552, 240087, 'Jasmine Wulandari', '08123000019', '2011-08-20', 64, 10, 'perempuan', 'Wali 53', 'Kuningan', 'Dokter', 'c265bff0ceaaa289a733e56bbaa87376', NULL),
(553, 240088, 'Kiki Oktaviani', '08123000020', '2011-09-21', 64, 10, 'perempuan', 'Wali 54', 'Kuningan', 'Pedagang', 'afda6ba86ade1ace790e93e0ee88f759', NULL),
(554, 240089, 'Lina Dewi', '08123000021', '2011-10-22', 64, 10, 'perempuan', 'Wali 55', 'Kuningan', 'Karyawan', '12c599853accc8a9627f9014ca990482', NULL),
(555, 240090, 'Maya Arumsari', '08123000022', '2011-11-23', 64, 10, 'perempuan', 'Wali 56', 'Kuningan', 'Wiraswasta', 'c06e74f54a3c7144beb4954d803971aa', NULL),
(556, 240091, 'Nadia Kurniawati', '08123000023', '2011-12-24', 64, 10, 'perempuan', 'Wali 57', 'Kuningan', 'Peternak', 'a81e929bf5d287fd295bef4360ae42cc', NULL),
(557, 240092, 'Omar Saputra', '08123000024', '2011-01-25', 64, 10, 'laki-laki', 'Wali 58', 'Kuningan', 'Pegawai Negeri', '410774304f0c9ed5cf67fc9a8b897959', NULL),
(558, 240093, 'Putra Budi Santoso', '08123000025', '2011-02-26', 64, 10, 'laki-laki', 'Wali 59', 'Kuningan', 'PNS', '41ad84f7822f6f517952b8b30f30288f', NULL),
(559, 240094, 'Rika Adiwati', '08123000026', '2011-03-27', 64, 10, 'perempuan', 'Wali 60', 'Kuningan', 'Guru', 'dc18df207ba556cabb831e28512b68d4', NULL),
(560, 240095, 'Satria Wijaya', '08123000027', '2011-04-28', 64, 10, 'laki-laki', 'Wali 61', 'Kuningan', 'Petani', 'c510a72542cc8480dc67c0d4152dfa42', NULL),
(561, 240096, 'Tari Ayu Pratiwi', '08123000028', '2011-05-01', 64, 10, 'perempuan', 'Wali 62', 'Kuningan', 'Guru', 'fcfd6b635539a9e43a226acb5398114b', NULL),
(562, 240097, 'Ujang Mahendra', '08123000029', '2011-06-02', 64, 10, 'laki-laki', 'Wali 63', 'Kuningan', 'Dokter', '6364dec9ef9d28194284838b61282b20', NULL),
(563, 240098, 'Vera Sariwati', '08123000030', '2011-07-03', 64, 10, 'perempuan', 'Wali 64', 'Kuningan', 'Pedagang', '64c837e6061e47cffc4ac9a179202bd6', NULL),
(564, 240099, 'Widiya Prameswari', '08123000031', '2011-08-04', 64, 10, 'perempuan', 'Wali 65', 'Kuningan', 'Karyawan', 'b5bb28d7c80f2e657474c9c4f5051499', NULL),
(565, 240100, 'Xena Ramadhani', '08123000032', '2011-09-05', 64, 10, 'perempuan', 'Wali 66', 'Kuningan', 'Wiraswasta', '87b9cc69fb93426dde75b618c9614f5a', NULL),
(566, 240101, 'Yusuf Firmansyah', '08123000033', '2011-10-06', 64, 10, 'laki-laki', 'Wali 67', 'Kuningan', 'Pegawai Negeri', 'e50b3f892ae61174c5b52b9671a8a23a', NULL),
(567, 240102, 'Zuraida Amalia', '08123000034', '2011-11-07', 64, 10, 'perempuan', 'Wali 68', 'Kuningan', 'PNS', 'b9b6893dd4c8464b0f3cd277add353de', NULL),
(568, 230001, 'Aditya Pramudya Setiawan', '08123000001', '2010-01-05', 66, 11, 'laki-laki', 'Agus Santoso', 'Kuningan', 'Petani', 'f0a6e7c2a7f6594d44d7ac9ad5b69fb2', NULL),
(569, 230002, 'Aldi Muhammad Rahman', '08123000002', '2010-02-14', 66, 11, 'laki-laki', 'Siti Nurjanah', 'Kuningan', 'Guru', 'fd83951a80aa92661da3096c6e677501', NULL),
(570, 230003, 'Andrianto Sumarsono', '08123000003', '2010-03-21', 66, 11, 'laki-laki', 'Joko Widodo', 'Kuningan', 'Wiraswasta', 'a0a8351578ef6a02b47b759ae41b7586', NULL),
(571, 230004, 'Bimo Anggara Pranata', '08123000004', '2010-04-03', 66, 11, 'laki-laki', 'Mita Pramudita', 'Kuningan', 'Pedagang', '2e445c3612af9ba49505f0f4b385d26c', NULL),
(572, 230005, 'Celia Viona Pramudita', '08123000005', '2010-05-15', 66, 11, 'perempuan', 'Andi Mulyadi', 'Kuningan', 'Karyawan', 'ef446a42663cd1f6d12ed0bd874b9fce', NULL),
(573, 230006, 'Cynthia Dwi Saraswati', '08123000006', '2010-06-27', 66, 11, 'perempuan', 'Siti Aisyah', 'Kuningan', 'Wiraswasta', '3dfbdddaccefb14c834a164a51adf298', NULL),
(574, 230007, 'Darren Aditya Jatmiko', '08123000007', '2010-07-09', 66, 11, 'laki-laki', 'Budi Hartono', 'Kuningan', 'Peternak', 'fdc4d47ce9605a9ae8e4456c5d287d90', NULL),
(575, 230008, 'Dian Ayu Lestari', '08123000008', '2010-08-18', 66, 11, 'perempuan', 'Dewi Lestari', 'Kuningan', 'Petani', '1067b721f242a8ea8be160feb6a13b7c', NULL),
(576, 230009, 'Dewi Anggraini Suhartini', '08123000009', '2010-09-02', 66, 11, 'perempuan', 'Hendrik Siahaan', 'Kuningan', 'PNS', 'e8a6a9ed1ebf654179efe2b5c501eb25', NULL),
(577, 230010, 'Farhan Iqbal Maulana', '08123000010', '2010-10-24', 66, 11, 'laki-laki', 'Maria Magdalena', 'Kuningan', 'Guru', '2911a903772bd5289c9341315a60d210', NULL),
(578, 230011, 'Fadil Akbar Prasetyo', '08123000011', '2010-11-07', 66, 11, 'laki-laki', 'Fajar Pratama', 'Kuningan', 'Petani', 'd7e07e7846e9c0edba4b4f5fa3a7766e', NULL),
(579, 230012, 'Fiona Rina Santoso', '08123000012', '2010-12-15', 66, 11, 'perempuan', 'Rina Pertiwi', 'Kuningan', 'Pedagang', '3fe1bde50a4f5ae8f4b49e5eaa8b526a', NULL),
(580, 230013, 'Galih Pratama Rachman', '08123000013', '2010-01-02', 66, 11, 'laki-laki', 'Taufik Hidayat', 'Kuningan', 'Wiraswasta', 'be79a01ebed970ca86e9a638a12adbd4', NULL),
(581, 230014, 'Gilang Fauzan Iskandar', '08123000014', '2011-02-13', 66, 11, 'laki-laki', 'Dwi Yuliana', 'Kuningan', 'Pegawai Negeri', '1393561810abe097d71bd858c51bca21', NULL),
(582, 230015, 'Hannah Kristina Sari', '08123000015', '2010-03-26', 66, 11, 'perempuan', 'Irwan Fadhil', 'Kuningan', 'PNS', 'd281be6215b0245bbba15b77bda31724', NULL),
(583, 230016, 'Hendra Setiawan Nugroho', '08123000016', '2011-04-04', 66, 11, 'laki-laki', 'Nurul Hidayah', 'Kuningan', 'Guru', 'b90b24595f8edd5b0b263d7d335ebdbb', NULL),
(584, 230017, 'Iqbal Alif Fadli', '08123000017', '2010-05-19', 66, 11, 'laki-laki', 'Eko Prasetyo', 'Kuningan', 'Petani', 'e31a2183975870a137bc0289d55b4bf7', NULL),
(585, 230018, 'Januarius Christianus Tobing', '08123000018', '2010-06-01', 66, 11, 'laki-laki', 'Ratna Wulansari', 'Kuningan', 'Guru', '5b4aa18e2001c8ef625f683268b24f99', NULL),
(586, 230019, 'Melina Angeline Kristiani', '08123000019', '2010-07-20', 66, 11, 'perempuan', 'Zainal Abidin', 'Kuningan', 'Dokter', '6fcd296c4e687def644f8a15faf18e93', NULL),
(587, 230020, 'Maya Saraswati Wirawan', '08123000020', '2010-08-08', 66, 11, 'perempuan', 'Farida Kurnia', 'Kuningan', 'Pedagang', '44c40bde40b1157388b671213b4989c9', NULL),
(588, 230021, 'Muhammad Rizki Alfarabi', '08123000021', '2010-01-11', 66, 11, 'laki-laki', 'Yusuf Abdullah', 'Kuningan', 'Karyawan', '4d03cf65adbb053d6efbff7e399a3b4c', NULL),
(589, 230022, 'Naufal Fadillah Ramadhan', '08123000022', '2010-02-20', 66, 11, 'laki-laki', 'Laila Sari', 'Kuningan', 'Wiraswasta', 'a9405d6ce4cf01e2c99260b26cdac6ca', NULL),
(590, 230023, 'Nina Arista Rahmawati', '08123000023', '2010-03-15', 66, 11, 'perempuan', 'Rudi Setiawan', 'Kuningan', 'Peternak', '58aadf51fa98da78779cbe8edd9763d9', NULL),
(591, 230024, 'Reihaan Faizal Kurniawan', '08123000024', '2010-04-19', 66, 11, 'laki-laki', 'Fina Kusuma', 'Kuningan', 'Pegawai Negeri', 'ac4c4c666f7bde2b8824c229e02dfe09', NULL),
(592, 230025, 'Reza Arief Pratama', '08123000025', '2010-05-03', 66, 11, 'laki-laki', 'Arifin Anwar', 'Kuningan', 'PNS', '94782919e71f10268f16af79b4061d3e', NULL),
(593, 230026, 'Rika Melati Susanti', '08123000026', '2010-06-12', 66, 11, 'perempuan', 'Eliza Putri', 'Kuningan', 'Guru', '3ead931ccd6e89e3e65b4a48afcc77ea', NULL),
(594, 230027, 'Raisa Intan Permata', '08123000027', '2010-07-25', 66, 11, 'perempuan', 'Musa Ali', 'Kuningan', 'Petani', '15769f61e1a21dc5abca89d4d7305516', NULL),
(595, 230028, 'Siti Nur Aisyah Zahra', '08123000028', '2010-08-30', 66, 11, 'perempuan', 'Zainab Mahmud', 'Kuningan', 'programmer', 'be19808ff7e17ece440b63be5957f1e6', NULL),
(596, 230029, 'Teguh Panca Wicaksono', '08123000029', '2010-09-18', 66, 11, 'laki-laki', 'Hendra Wijaya', 'Kuningan', 'Dokter', '9255483eae311a9d43720a6b9e66ce12', NULL),
(597, 230030, 'Vania Salsabila Rahayu', '08123000030', '2010-10-06', 66, 11, 'perempuan', 'Putri Lestari', 'Kuningan', 'Pedagang', '06767aefc008d4392f926a6300088f5e', NULL),
(598, 230031, 'Vera Novita Kumala', '08123000031', '2010-08-30', 66, 11, 'perempuan', 'Tomi Saputra', 'Kuningan', 'Karyawan', 'c547d6a2d549d98d6fd4461f1ab17861', NULL),
(599, 230032, 'Wahyu Purnama Dewanto', '08123000032', '2010-10-06', 66, 11, 'laki-laki', 'Endang Sulastri', 'Kuningan', 'Wiraswasta', 'd86c5f55422c26385636ed5d249f92af', NULL),
(600, 230033, 'Yuliana Lydia Oktavia', '08123000033', '2010-05-03', 66, 11, 'perempuan', 'Rizki Hidayat', 'Kuningan', 'Pegawai Negeri', 'c4c0ec3bccfe70d7534a9a893d80dd38', NULL),
(601, 230034, 'Zahrul Purnama', '08123000033', '2011-12-08', 66, 11, 'laki-laki', 'Lina Anggraini', 'Kuningan', 'Karyawan', 'd1e9a2ccbf2b4ddc8a100aa3634690d6', NULL),
(602, 230035, 'Aditya Prasetyo', '08123000035', '2010-05-01', 68, 11, 'laki-laki', 'Wali A', 'Kuningan', 'Dokter', '25b00463b0109f025f3dfb6c88d8b5fb', NULL),
(603, 230036, 'Budi Santoso', '08123000036', '2010-06-01', 68, 11, 'perempuan', 'Wali B', 'Kuningan', 'Guru', '8bfd96ceee57873ab57dd00ed0eb8916', NULL),
(604, 230037, 'Citra Maharani', '08123000037', '2010-07-01', 68, 11, 'laki-laki', 'Wali C', 'Kuningan', 'Petani', 'c3b830495bd1b4ad8c3b7f92cf86598c', NULL),
(605, 230038, 'Dewi Kartika', '08123000038', '2010-08-01', 68, 11, 'perempuan', 'Wali D', 'Kuningan', 'Guru', '6099c9dc82f37651a5674d824741425b', NULL),
(606, 230039, 'Eko Saputra', '08123000039', '2010-09-01', 68, 11, 'laki-laki', 'Wali E', 'Kuningan', 'PNS', 'b235d6cead55c8879f57e9ec935547f5', NULL),
(607, 230040, 'Farah Aulia', '08123000040', '2010-05-01', 68, 11, 'perempuan', 'Wali F', 'Kuningan', 'Guru', '47e19a12b5b0670f952c21006eb82835', NULL),
(608, 230041, 'Gilang Permana', '08123000041', '2010-06-01', 68, 11, 'laki-laki', 'Wali G', 'Kuningan', 'Petani', '446f7697b551987641bb2ba97c5a7628', NULL),
(609, 230042, 'Hani Yuliawati', '08123000042', '2010-07-01', 68, 11, 'perempuan', 'Wali H', 'Kuningan', 'Guru', 'c840b12bef5eeb37fe7644fbe09dd3b7', NULL),
(610, 230043, 'Indra Pranata', '08123000043', '2010-08-01', 68, 11, 'laki-laki', 'Wali I', 'Kuningan', 'Petani', 'cd5accb503d7ac51c169cc93f33f92a5', NULL),
(611, 230044, 'Joko Priyono', '08123000044', '2010-09-01', 68, 11, 'perempuan', 'Wali J', 'Kuningan', 'Guru', 'd877e2f75f1b6ce41d2d26e6c31ff470', NULL),
(612, 230045, 'Kartika Sari', '08123000045', '2010-05-01', 68, 11, 'laki-laki', 'Wali K', 'Kuningan', 'Menteri', '604051de132aeaec7c1c78e38bb17d18', NULL),
(613, 230046, 'Lukman Hakim', '08123000046', '2010-06-01', 68, 11, 'perempuan', 'Wali L', 'Kuningan', 'Swasta', '5401118e39b40cdb266ec44a9038da04', NULL),
(614, 230047, 'Maya Rizky', '08123000047', '2010-07-01', 68, 11, 'laki-laki', 'Wali M', 'Kuningan', 'Petani', 'e202909c752edc8a90a1f2bfefa39c16', NULL),
(615, 230048, 'Nurul Hidayah', '08123000048', '2010-08-01', 68, 11, 'perempuan', 'Wali N', 'Kuningan', 'Guru', '205cb0bc3fc1b64d4da47b3d18dd8bf8', NULL),
(616, 230049, 'Oki Nugraha', '08123000049', '2010-09-01', 68, 11, 'laki-laki', 'Wali O', 'Kuningan', 'Petani', '9f13765bf04d2fa0de877232c20a691a', NULL),
(617, 230050, 'Putri Amelia', '08123000050', '2010-05-01', 68, 11, 'perempuan', 'Wali P', 'Kuningan', 'Polisi', '22e5426ac3a00c49b46e4183dcfe3e54', NULL),
(618, 230051, 'Qori Rahmawati', '08123000051', '2010-06-01', 68, 11, 'laki-laki', 'Wali Q', 'Kuningan', 'Arsitek', '8537f199f4a6bd5df62241dca574570d', NULL),
(619, 230052, 'Rama Wijaya', '08123000052', '2010-07-01', 68, 11, 'perempuan', 'Wali R', 'Kuningan', 'Wirausaha', '08b9b3346c7554983fd88a71371030c5', NULL),
(620, 230053, 'Siti Aisyah', '08123000053', '2010-08-01', 68, 11, 'laki-laki', 'Wali S', 'Kuningan', 'Petani', '2304a19f9d523decbb64cff62f5ece32', NULL),
(621, 230054, 'Teguh Santoso', '08123000054', '2010-09-01', 68, 11, 'perempuan', 'Wali T', 'Kuningan', 'Guru', 'e2dc27b305c205ddc02974ec4c28f1c5', NULL),
(622, 230055, 'Umi Salamah', '08123000055', '2010-05-01', 68, 11, 'laki-laki', 'Wali U', 'Kuningan', 'Pilot', 'b5f2f71de6f85356ab32ceccd64ee83f', NULL),
(623, 230056, 'Vina Maharani', '08123000056', '2010-06-01', 68, 11, 'perempuan', 'Wali V', 'Kuningan', 'Guru', '428823abb21c55484efb45a59f3fb518', NULL),
(624, 230057, 'Wahyu Susanto', '08123000057', '2010-07-01', 68, 11, 'laki-laki', 'Wali W', 'Kuningan', 'Petani', 'dfc6283dbe0050f4d0290c48f9a883df', NULL),
(625, 230058, 'Xenia Wijayanti', '08123000058', '2010-08-01', 68, 11, 'perempuan', 'Wali X', 'Kuningan', 'Guru', '5b1bc0a717af0781865f6adbcf722bb5', NULL),
(626, 230059, 'Yoga Pratama', '08123000059', '2010-09-01', 68, 11, 'laki-laki', 'Wali Y', 'Kuningan', 'Petani', 'd2a290dd9ef03b9eee887e2475591bb6', NULL),
(627, 230060, 'Zaki Ahmad', '08123000060', '2010-05-01', 68, 11, 'perempuan', 'Wali Z', 'Kuningan', 'Guru', 'd41491f19673a805634d2e0943d89f32', NULL),
(628, 230061, 'Aulia Rahmadani', '08123000061', '2010-06-01', 68, 11, 'laki-laki', 'Wali [', 'Kuningan', 'Petani', 'ad301d48f9644f5fd2e42559108b9bf0', NULL),
(629, 230062, 'Bayu Anggara', '08123000062', '2010-07-01', 68, 11, 'perempuan', 'Wali \\', 'Kuningan', 'Guru', '405c7d755d61d62da6af9f0feb3c52a4', NULL),
(630, 230063, 'Citra Lestari', '08123000063', '2010-08-01', 68, 11, 'laki-laki', 'Wali ]', 'Kuningan', 'Petani', '6be43e30291d3fdef4d2eaf294a7c416', NULL),
(631, 230064, 'Dian Pertiwi', '08123000064', '2010-09-01', 68, 11, 'perempuan', 'Wali ^', 'Kuningan', 'Guru', '2a11a5547cca4f8f4ab9ea027a857574', NULL),
(632, 230065, 'Evi Nurjanah', '08123000065', '2010-05-01', 68, 11, 'laki-laki', 'Wali _', 'Kuningan', 'Petani', '5aa3af0af4c62c658272938dfa97a481', NULL),
(633, 230066, 'Fajar Firmansyah', '08123000066', '2010-06-01', 68, 11, 'perempuan', 'Wali `', 'Kuningan', 'Polisi', '9e54db18d6fad93085254f6f1582f311', NULL),
(634, 230067, 'Galuh Ayu', '08123000067', '2010-07-01', 68, 11, 'laki-laki', 'Wali a', 'Kuningan', 'Petani', 'a46c479f2d29a29bcb87b0eac0ec6cb9', NULL),
(635, 230068, 'Hafiz Ramadhan', '08123000068', '2010-08-01', 68, 11, 'perempuan', 'Wali b', 'Kuningan', 'Peternak', '737a9c35024105dc10fd2a6a16e80b14', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tahun_ajaran`
--

CREATE TABLE `tahun_ajaran` (
  `idth` int(11) NOT NULL,
  `nama_ajaran` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tahun_ajaran`
--

INSERT INTO `tahun_ajaran` (`idth`, `nama_ajaran`, `status`) VALUES
(10, '2024-2027', 0),
(11, '2023-2026', 1);

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
  MODIFY `id_guru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
  MODIFY `idj` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `mata_pelajaran`
--
ALTER TABLE `mata_pelajaran`
  MODIFY `idm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

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
  MODIFY `id_siswa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=636;

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

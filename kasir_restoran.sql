-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20260409.dbb116703b
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 25, 2026 at 06:18 AM
-- Server version: 8.4.3
-- PHP Version: 8.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kasir_restoran`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id` int NOT NULL,
  `id_transaksi` int NOT NULL,
  `id_menu` int NOT NULL,
  `jumlah` int NOT NULL,
  `total` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id`, `id_transaksi`, `id_menu`, `jumlah`, `total`) VALUES
(4, 5, 104, 120, 3000000.00);

-- --------------------------------------------------------

--
-- Table structure for table `kasir`
--

CREATE TABLE `kasir` (
  `id` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `no_telepon` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kasir`
--

INSERT INTO `kasir` (`id`, `nama`, `no_telepon`) VALUES
(1, 'Jokowi', '08986434535'),
(2, 'Prabowo', '08978635647'),
(3, 'Agus Salim', '081234567891'),
(4, 'Budi Santoso', '081234567892'),
(5, 'Citra Dewi', '081234567893'),
(6, 'Dedi Mulyadi', '081234567894'),
(7, 'Eka Fitriani', '081234567895'),
(8, 'Farhan Hakim', '081234567896'),
(9, 'Gita Permatasari', '081234567897'),
(10, 'Hendra Wijaya', '081234567898'),
(11, 'Indah Sari', '081234567899'),
(12, 'Joko Supriyanto', '081234567900'),
(13, 'Kartika Sari', '081234567901'),
(14, 'Leo Pratama', '081234567902'),
(15, 'Maya Sari', '081234567903'),
(16, 'Nugroho Wicaksono', '081234567904'),
(17, 'Oka Setiawan', '081234567905'),
(18, 'Putri Amelia', '081234567906'),
(19, 'Qori Aulia', '081234567907'),
(20, 'Rina Febrianti', '081234567908'),
(21, 'Slamet Riyadi', '081234567909'),
(22, 'Tia Rahmawati', '081234567910'),
(23, 'Umar Syarif', '081234567911'),
(24, 'Vina Melinda', '081234567912'),
(25, 'Wahyu Hidayat', '081234567913'),
(26, 'Xena Olivia', '081234567914'),
(27, 'Yusuf Maulana', '081234567915'),
(28, 'Zahra Azzahra', '081234567916'),
(29, 'Aditya Pratama', '081234567917'),
(30, 'Bella Safira', '081234567918'),
(31, 'Cahya Nugraha', '081234567919'),
(32, 'Dinda Lestari', '081234567920'),
(33, 'Erik Setiawan', '081234567921'),
(34, 'Feni Febriyanti', '081234567922'),
(35, 'Gilang Ramadhan', '081234567923'),
(36, 'Hani Nuraeni', '081234567924'),
(37, 'Irfan Maulana', '081234567925'),
(38, 'Jihan Fadhilah', '081234567926'),
(39, 'Kevin Sanjaya', '081234567927'),
(40, 'Lia Anggraeni', '081234567928'),
(41, 'Miftahul Jannah', '081234567929'),
(42, 'Nanda Oktaviani', '081234567930'),
(43, 'Oscar Leonardo', '081234567931'),
(44, 'Puspita Sari', '081234567932'),
(45, 'Rizki Ananda', '081234567933'),
(46, 'Siska Amelia', '081234567934'),
(47, 'Teguh Wibowo', '081234567935'),
(48, 'Umi Kalsum', '081234567936'),
(49, 'Vega Adriani', '081234567937'),
(50, 'Winda Safitri', '081234567938'),
(51, 'Yoga Ardiansyah', '081234567939'),
(52, 'Zaki Zainuddin', '081234567940'),
(53, 'Aldo Pratama', '081234567941'),
(54, 'Berliana Putri', '081234567942'),
(55, 'Cindy Novita', '081234567943'),
(56, 'Doni Saputra', '081234567944'),
(57, 'Erna Sulistyowati', '081234567945'),
(58, 'Fajar Ramadhan', '081234567946'),
(59, 'Gina Larasati', '081234567947'),
(60, 'Heru Susanto', '081234567948'),
(61, 'Ika Wulandari', '081234567949'),
(62, 'Jefri Kurniawan', '081234567950'),
(63, 'Karina Maharani', '081234567951'),
(64, 'Luthfi Hakim', '081234567952'),
(65, 'Mila Rosmala', '081234567953'),
(66, 'Nasrul Ahsan', '081234567954'),
(67, 'Olivia Christy', '081234567955'),
(68, 'Pandu Winata', '081234567956'),
(69, 'Queen Azzahra', '081234567957'),
(70, 'Robby Chandra', '081234567958'),
(71, 'Sari Wulandari', '081234567959'),
(72, 'Taufik Hidayat', '081234567960'),
(73, 'Uswatun Hasanah', '081234567961'),
(74, 'Valentino Rossi', '081234567962'),
(75, 'Wulan Permatasari', '081234567963'),
(76, 'Yanto Sugiarto', '081234567964'),
(77, 'Zulfa Zainab', '081234567965'),
(78, 'Andre Taulany', '081234567966'),
(79, 'Bunga Citra', '081234567967'),
(80, 'Cakra Khan', '081234567968'),
(81, 'Dewi Persik', '081234567969'),
(82, 'Edo Borneo', '081234567970'),
(83, 'Fanny Fabriana', '081234567971'),
(84, 'Gading Marten', '081234567972'),
(85, 'Hesti Purwadinata', '081234567973'),
(86, 'Iqbaal Ramadhan', '081234567974'),
(87, 'Jasmine Putri', '081234567975'),
(88, 'Kiki Amalia', '081234567976'),
(89, 'Luna Maya', '081234567977'),
(90, 'Maia Estianty', '081234567978'),
(91, 'Nino RAN', '081234567979'),
(92, 'Olla Ramlan', '081234567980'),
(93, 'Pevita Pearce', '081234567981'),
(94, 'Raffi Ahmad', '081234567982'),
(95, 'Syahrini', '081234567983'),
(96, 'Titi Kamal', '081234567984'),
(97, 'Ussy Sulistiawaty', '081234567985'),
(98, 'Vicky Prasetyo', '081234567986'),
(99, 'Wulan Guritno', '081234567987'),
(100, 'Yuni Shara', '081234567988'),
(101, 'Zaskia Gotik', '081234567989'),
(102, 'Anya Geraldine', '081234567990'),
(103, 'Baim Wong', '081234567991'),
(104, 'Cinta Laura', '081234567992'),
(105, 'Denny Sumargo', '081234567993'),
(106, 'Eva Celia', '081234567994');

-- --------------------------------------------------------

--
-- Table structure for table `meja`
--

CREATE TABLE `meja` (
  `id` int NOT NULL,
  `lokasi` varchar(50) NOT NULL,
  `kapasitas` int NOT NULL,
  `status` enum('tersedia','terisi','dipesan') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'tersedia'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `meja`
--

INSERT INTO `meja` (`id`, `lokasi`, `kapasitas`, `status`) VALUES
(103, 'M_01', 4, 'tersedia'),
(104, 'M_02', 2, 'tersedia'),
(105, 'M_03', 6, 'tersedia'),
(106, 'M_04', 4, 'tersedia'),
(107, 'M_05', 8, 'tersedia'),
(108, 'M_06', 2, 'tersedia'),
(109, 'M_07', 4, 'tersedia'),
(110, 'M_08', 6, 'tersedia'),
(111, 'M_09', 4, 'tersedia'),
(112, 'M_10', 10, 'tersedia'),
(113, 'M_11', 2, 'tersedia'),
(114, 'M_12', 4, 'tersedia'),
(115, 'M_13', 2, 'tersedia'),
(116, 'M_14', 4, 'tersedia'),
(117, 'M_15', 6, 'tersedia'),
(118, 'M_16', 2, 'tersedia'),
(119, 'M_17', 4, 'tersedia'),
(120, 'M_18', 2, 'tersedia'),
(121, 'M_19', 4, 'tersedia'),
(122, 'M_20', 6, 'tersedia'),
(123, 'M_21', 4, 'tersedia'),
(124, 'M_22', 6, 'tersedia'),
(125, 'M_23', 4, 'tersedia'),
(126, 'M_24', 8, 'tersedia'),
(127, 'M_25', 4, 'tersedia'),
(128, 'M_26', 2, 'tersedia'),
(129, 'M_27', 4, 'tersedia'),
(130, 'M_28', 6, 'tersedia'),
(131, 'M_29', 4, 'tersedia'),
(132, 'M_30', 2, 'tersedia'),
(133, 'M_31', 8, 'tersedia'),
(134, 'M_32', 10, 'tersedia'),
(135, 'M_33', 6, 'tersedia'),
(136, 'M_34', 8, 'tersedia'),
(137, 'M_35', 12, 'tersedia'),
(138, 'M_36', 6, 'tersedia'),
(139, 'M_37', 8, 'tersedia'),
(140, 'M_38', 10, 'tersedia'),
(141, 'M_39', 4, 'tersedia'),
(142, 'M_40', 8, 'tersedia'),
(143, 'M_41', 2, 'tersedia'),
(144, 'M_42', 4, 'tersedia'),
(145, 'M_43', 2, 'tersedia'),
(146, 'M_44', 4, 'tersedia'),
(147, 'M_45', 6, 'tersedia'),
(148, 'M_46', 2, 'tersedia'),
(149, 'M_47', 4, 'tersedia'),
(150, 'M_48', 2, 'tersedia'),
(151, 'M_49', 4, 'tersedia'),
(152, 'M_50', 6, 'tersedia'),
(153, 'M_51', 4, 'tersedia'),
(154, 'M_52', 6, 'tersedia'),
(155, 'M_53', 4, 'tersedia'),
(156, 'M_54', 8, 'tersedia'),
(157, 'M_55', 4, 'tersedia'),
(158, 'M_56', 2, 'tersedia'),
(159, 'M_57', 4, 'tersedia'),
(160, 'M_58', 6, 'tersedia'),
(161, 'M_59', 4, 'tersedia'),
(162, 'M_60', 8, 'tersedia'),
(163, 'M_61', 4, 'tersedia'),
(164, 'M_62', 6, 'tersedia'),
(165, 'M_63', 2, 'tersedia'),
(166, 'M_64', 4, 'tersedia'),
(167, 'M_65', 8, 'tersedia'),
(168, 'M_66', 4, 'tersedia'),
(169, 'M_67', 6, 'tersedia'),
(170, 'M_68', 2, 'tersedia'),
(171, 'M_69', 4, 'tersedia'),
(172, 'M_70', 6, 'tersedia'),
(173, 'M_71', 2, 'tersedia'),
(174, 'M_72', 2, 'tersedia'),
(175, 'M_73', 2, 'tersedia'),
(176, 'M_74', 2, 'tersedia'),
(177, 'M_75', 4, 'tersedia'),
(178, 'M_76', 2, 'tersedia'),
(179, 'M_77', 2, 'tersedia'),
(180, 'M_78', 4, 'tersedia'),
(181, 'M_79', 2, 'tersedia'),
(182, 'M_80', 2, 'tersedia'),
(183, 'M_81', 6, 'tersedia'),
(184, 'M_82', 8, 'tersedia'),
(185, 'M_83', 6, 'tersedia'),
(186, 'M_84', 8, 'tersedia'),
(187, 'M_85', 6, 'tersedia'),
(188, 'M_86', 8, 'tersedia'),
(189, 'M_87', 6, 'tersedia'),
(190, 'M_88', 8, 'tersedia'),
(191, 'M_89', 10, 'tersedia'),
(192, 'M_90', 12, 'tersedia'),
(193, 'M_91', 10, 'tersedia'),
(194, 'M_92', 8, 'tersedia'),
(195, 'M_93', 14, 'tersedia'),
(196, 'M_94', 4, 'tersedia'),
(197, 'M_95', 6, 'tersedia'),
(198, 'M_96', 4, 'tersedia'),
(199, 'M_97', 2, 'tersedia'),
(200, 'M_98', 6, 'tersedia'),
(201, 'M_99', 4, 'tersedia'),
(202, 'M_100', 6, 'tersedia');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int NOT NULL,
  `nama_menu` varchar(100) NOT NULL,
  `harga` decimal(15,2) NOT NULL,
  `deskripsi` varchar(255) NOT NULL,
  `kategori` enum('makanan','minuman') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `nama_menu`, `harga`, `deskripsi`, `kategori`) VALUES
(104, 'Nasi Goreng Spesial', 25000.00, 'Nasi goreng dengan telur, ayam, dan bakso', 'makanan'),
(105, 'Mie Ayam Jamur', 20000.00, 'Mie ayam dengan topping jamur dan sawi', 'makanan'),
(106, 'Sate Ayam', 30000.00, '10 tusuk sate ayam dengan bumbu kacang', 'makanan'),
(107, 'Gado-Gado', 18000.00, 'Sayuran rebus dengan bumbu kacang dan kerupuk', 'makanan'),
(108, 'Soto Ayam', 22000.00, 'Soto ayam kampung dengan telur dan perkedel', 'makanan'),
(109, 'Rawon', 25000.00, 'Rawon daging sapi dengan telur asin', 'makanan'),
(110, 'Bakso Malang', 23000.00, 'Bakso besar plus tahu, pangsit, dan mie', 'makanan'),
(111, 'Nasi Uduk', 15000.00, 'Nasi uduk dengan lauk tempe orek dan sambal', 'makanan'),
(112, 'Nasi Goreng Seafood', 35000.00, 'Nasi goreng dengan udang, cumi, dan kerang', 'makanan'),
(113, 'Mie Goreng Spesial', 25000.00, 'Mie goreng dengan bakso dan sayuran', 'makanan'),
(114, 'Ayam Bakar Madu', 40000.00, 'Ayam bakar bumbu madu dengan sambal terasi', 'makanan'),
(115, 'Gurami Bakar', 50000.00, 'Ikan gurami bakar dengan bumbu rujak', 'makanan'),
(116, 'Nasi Liwet', 20000.00, 'Nasi liwet komplit dengan telur dan ayam suwir', 'makanan'),
(117, 'Seblak', 15000.00, 'Kerupuk basah dengan bumbu pedas', 'makanan'),
(118, 'Nasi Padang', 30000.00, 'Nasi dengan rendang, ayam pop, dan sambal', 'makanan'),
(119, 'Rendang', 35000.00, 'Rendang daging sapi asli Padang', 'makanan'),
(120, 'Sop Iga Sapi', 45000.00, 'Sop iga sapi dengan wortel dan kentang', 'makanan'),
(121, 'Sop Buntut', 55000.00, 'Sop buntut sapi dengan kuah bening', 'makanan'),
(122, 'Pempek Lenjer', 20000.00, 'Pempek lenjer dengan cuko khas Palembang', 'makanan'),
(123, 'Tekwan', 18000.00, 'Tekwan kuah udang dengan soun', 'makanan'),
(124, 'Model', 20000.00, 'Pempek model isi telur', 'makanan'),
(125, 'Nasi Timbel', 23000.00, 'Nasi timbel dengan ayam goreng dan sambal', 'makanan'),
(126, 'Pepes Ikan Mas', 35000.00, 'Pepes ikan mas dengan daun kemangi', 'makanan'),
(127, 'Sayur Asem', 12000.00, 'Sayur asem dengan kacang tanah dan jagung', 'makanan'),
(128, 'Tahu Telur', 18000.00, 'Tahu telur dengan saus petis', 'makanan'),
(129, 'Lontong Balap', 16000.00, 'Lontong dengan tahu goreng dan lentho', 'makanan'),
(130, 'Rujak Cingur', 20000.00, 'Rujak dengan cingur sapi dan bumbu petis', 'makanan'),
(131, 'Kerak Telor', 25000.00, 'Kerak telor khas Betawi', 'makanan'),
(132, 'Karedok', 12000.00, 'Karedok sayuran mentah dengan bumbu kacang', 'makanan'),
(133, 'Lotek', 12000.00, 'Lotek sayur rebus bumbu kacang', 'makanan'),
(134, 'Mie Kocok', 25000.00, 'Mie kocok Bandung dengan kikil', 'makanan'),
(135, 'Mie Aceh', 35000.00, 'Mie Aceh goreng pedas dengan kepiting', 'makanan'),
(136, 'Martabak Telur', 35000.00, 'Martabak telur dengan daging sapi', 'makanan'),
(137, 'Nasi Kuning', 20000.00, 'Nasi kuning dengan ayam goreng dan sambal', 'makanan'),
(138, 'Bubur Ayam', 15000.00, 'Bubur ayam komplit dengan cakwe', 'makanan'),
(139, 'Nasi Goreng Kampung', 20000.00, 'Nasi goreng kampung dengan teri dan pete', 'makanan'),
(140, 'Mie Rebus', 18000.00, 'Mie rebus dengan telur dan sayuran', 'makanan'),
(141, 'Capcay Goreng', 25000.00, 'Capcay goreng dengan udang dan ayam', 'makanan'),
(142, 'Capcay Kuah', 25000.00, 'Capcay kuah segar dengan bakso ikan', 'makanan'),
(143, 'Fu Yung Hai', 28000.00, 'Telur dadar dengan sayuran dan ayam', 'makanan'),
(144, 'Pecel Lele', 20000.00, 'Lele goreng dengan sambal dan lalapan', 'makanan'),
(145, 'Ayam Penyet', 22000.00, 'Ayam goreng penyet dengan sambal terasi', 'makanan'),
(146, 'Bebek Goreng', 45000.00, 'Bebek goreng krispi dengan sambal hijau', 'makanan'),
(147, 'Cumi Goreng Tepung', 35000.00, 'Cumi goreng tepung dengan saus sambal', 'makanan'),
(148, 'Udang Goreng Mentega', 40000.00, 'Udang goreng mentega dengan bawang bombay', 'makanan'),
(149, 'Kerang Hijau', 30000.00, 'Kerang hijau rebus dengan saus padang', 'makanan'),
(150, 'Oseng-Oseng Mercon', 28000.00, 'Oseng daging sapi super pedas', 'makanan'),
(151, 'Tempe Mendoan', 10000.00, 'Tempe mendoan gurih dengan sambal kecap', 'makanan'),
(152, 'Perkedel Kentang', 8000.00, 'Perkedel kentang goreng', 'makanan'),
(153, 'Bakwan Jagung', 8000.00, 'Bakwan jagung renyah', 'makanan'),
(154, 'Es Teh Manis', 5000.00, 'Teh dingin dengan gula asli', 'minuman'),
(155, 'Jus Alpukat', 15000.00, 'Jus alpukat segar dengan susu coklat', 'minuman'),
(156, 'Es Jeruk Peras', 8000.00, 'Jeruk peras segar tanpa pengawet', 'minuman'),
(157, 'Cappuccino', 20000.00, 'Kopi cappuccino dengan foam susu', 'minuman'),
(158, 'Matcha Latte', 22000.00, 'Matcha asli dengan susu segar', 'minuman'),
(159, 'Es Doger', 12000.00, 'Es serut dengan tape, ketan hitam, dan sirup', 'minuman'),
(160, 'Es Campur', 14000.00, 'Es campur dengan buah, cincau, dan kolang-kaling', 'minuman'),
(161, 'Red Velvet Latte', 25000.00, 'Minuman latte rasa red velvet', 'minuman'),
(162, 'Choco Banana Smoothie', 28000.00, 'Smoothie pisang coklat dengan es krim', 'minuman'),
(163, 'Es Kelapa Muda', 10000.00, 'Es kelapa muda dengan daging kelapa', 'minuman'),
(164, 'Lemon Tea', 10000.00, 'Teh lemon segar dingin', 'minuman'),
(165, 'Americano', 15000.00, 'Kopi hitam khas italia', 'minuman'),
(166, 'Es Cincau', 8000.00, 'Es cincau dengan gula aren', 'minuman'),
(167, 'Soda Gembira', 10000.00, 'Soda dengan sirup vanila dan susu', 'minuman'),
(168, 'Milkshake Stroberi', 22000.00, 'Milkshake stroberi dengan whipped cream', 'minuman'),
(169, 'Es Pisang Ijo', 15000.00, 'Pisang ijo dengan es serut dan sirup merah', 'minuman'),
(170, 'Es Teler', 18000.00, 'Es teler dengan alpukat, nangka, kelapa muda', 'minuman'),
(171, 'Es Kacang Merah', 12000.00, 'Es kacang merah dengan susu kental manis', 'minuman'),
(172, 'Wedang Jahe', 10000.00, 'Wedang jahe hangat dengan gula merah', 'minuman'),
(173, 'Bajigur', 10000.00, 'Minuman khas Sunda dari jahe dan gula aren', 'minuman'),
(174, 'Bandrek', 10000.00, 'Bandrek jahe dengan rempah', 'minuman'),
(175, 'Es Pallu Butung', 18000.00, 'Pisang ijo dengan es batu', 'minuman'),
(176, 'Jus Mangga', 14000.00, 'Jus mangga segar dengan susu', 'minuman'),
(177, 'Jus Jeruk', 10000.00, 'Jus jeruk peras asli', 'minuman'),
(178, 'Jus Semangka', 12000.00, 'Jus semangka merah segar', 'minuman'),
(179, 'Jus Tomat', 10000.00, 'Jus tomat segar dengan sedikit garam', 'minuman'),
(180, 'Jus Wortel', 12000.00, 'Jus wortel dengan madu', 'minuman'),
(181, 'Jus Melon', 13000.00, 'Jus melon segar', 'minuman'),
(182, 'Jus Sirsak', 15000.00, 'Jus sirsak tanpa biji', 'minuman'),
(183, 'Jus Nanas', 12000.00, 'Jus nanas segar', 'minuman'),
(184, 'Jus Pepaya', 11000.00, 'Jus pepaya dengan susu', 'minuman'),
(185, 'Kopi Hitam', 10000.00, 'Kopi hitam robusta', 'minuman'),
(186, 'Kopi Susu', 12000.00, 'Kopi hitam dengan gula dan susu', 'minuman'),
(187, 'Kopi Tubruk', 8000.00, 'Kopi tubruk khas Jawa', 'minuman'),
(188, 'Kopi Arabika', 18000.00, 'Kopi arabika single origin', 'minuman'),
(189, 'Mochacino', 23000.00, 'Campuran kopi, coklat, dan susu', 'minuman'),
(190, 'Caramel Macchiato', 25000.00, 'Kopi dengan sirup karamel', 'minuman'),
(191, 'Vanilla Latte', 22000.00, 'Kopi latte dengan sirup vanila', 'minuman'),
(192, 'Hazelnut Latte', 24000.00, 'Kopi latte dengan sirup hazelnut', 'minuman'),
(193, 'Thai Tea', 18000.00, 'Teh thailand dengan susu kental manis', 'minuman'),
(194, 'Milk Tea', 15000.00, 'Teh susu original', 'minuman'),
(195, 'Greentea', 12000.00, 'Teh hijau dingin', 'minuman'),
(196, 'Lychee Tea', 18000.00, 'Teh dengan rasa leci', 'minuman'),
(197, 'Lemonade', 12000.00, 'Lemonade segar dengan mint', 'minuman'),
(198, 'Cucumber Lime', 14000.00, 'Timun dan jeruk nipis segar', 'minuman'),
(199, 'Air Mineral', 4000.00, 'Air mineral kemasan', 'minuman'),
(200, 'Teh Tawar Hangat', 4000.00, 'Teh hangat tanpa gula', 'minuman'),
(201, 'Teh Manis Hangat', 5000.00, 'Teh hangat dengan gula', 'minuman'),
(202, 'Jahe Hangat', 6000.00, 'Jahe asli hangat', 'minuman'),
(203, 'Susu Hangat', 8000.00, 'Susu sapi hangat dengan madu', 'minuman');

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id`, `name`) VALUES
(3, 'Agus Salim'),
(4, 'Budi Santoso'),
(5, 'Citra Dewi'),
(6, 'Dedi Mulyadi'),
(7, 'Eka Fitriani'),
(8, 'Farhan Hakim'),
(9, 'Gita Permatasari'),
(10, 'Hendra Wijaya'),
(11, 'Indah Sari'),
(12, 'Joko Supriyanto'),
(13, 'Kartika Sari'),
(14, 'Leo Pratama'),
(15, 'Maya Sari'),
(16, 'Nugroho Wicaksono'),
(17, 'Oka Setiawan'),
(18, 'Putri Amelia'),
(19, 'Qori Aulia'),
(20, 'Rina Febrianti'),
(21, 'Slamet Riyadi'),
(22, 'Tia Rahmawati'),
(23, 'Umar Syarif'),
(24, 'Vina Melinda'),
(25, 'Wahyu Hidayat'),
(26, 'Xena Olivia'),
(27, 'Yusuf Maulana'),
(28, 'Zahra Azzahra'),
(29, 'Aditya Pratama'),
(30, 'Bella Safira'),
(31, 'Cahya Nugraha'),
(32, 'Dinda Lestari'),
(33, 'Erik Setiawan'),
(34, 'Feni Febriyanti'),
(35, 'Gilang Ramadhan'),
(36, 'Hani Nuraeni'),
(37, 'Irfan Maulana'),
(38, 'Jihan Fadhilah'),
(39, 'Kevin Sanjaya'),
(40, 'Lia Anggraeni'),
(41, 'Miftahul Jannah'),
(42, 'Nanda Oktaviani'),
(43, 'Oscar Leonardo'),
(44, 'Puspita Sari'),
(45, 'Rizki Ananda'),
(46, 'Siska Amelia'),
(47, 'Teguh Wibowo'),
(48, 'Umi Kalsum'),
(49, 'Vega Adriani'),
(50, 'Winda Safitri'),
(51, 'Yoga Ardiansyah'),
(52, 'Zaki Zainuddin'),
(53, 'Aldo Pratama'),
(54, 'Berliana Putri'),
(55, 'Cindy Novita'),
(56, 'Doni Saputra'),
(57, 'Erna Sulistyowati'),
(58, 'Fajar Ramadhan'),
(59, 'Gina Larasati'),
(60, 'Heru Susanto'),
(61, 'Ika Wulandari'),
(62, 'Jefri Kurniawan'),
(63, 'Karina Maharani'),
(64, 'Luthfi Hakim'),
(65, 'Mila Rosmala'),
(66, 'Nasrul Ahsan'),
(67, 'Olivia Christy'),
(68, 'Pandu Winata'),
(69, 'Queen Azzahra'),
(70, 'Robby Chandra'),
(71, 'Sari Wulandari'),
(72, 'Taufik Hidayat'),
(73, 'Uswatun Hasanah'),
(74, 'Valentino Rossi'),
(75, 'Wulan Permatasari'),
(76, 'Yanto Sugiarto'),
(77, 'Zulfa Zainab'),
(78, 'Andre Taulany'),
(79, 'Bunga Citra'),
(80, 'Cakra Khan'),
(81, 'Dewi Persik'),
(82, 'Edo Borneo'),
(83, 'Fanny Fabriana'),
(84, 'Gading Marten'),
(85, 'Hesti Purwadinata'),
(86, 'Iqbaal Ramadhan'),
(87, 'Jasmine Putri'),
(88, 'Kiki Amalia'),
(89, 'Luna Maya'),
(90, 'Maia Estianty'),
(91, 'Nino RAN'),
(92, 'Olla Ramlan'),
(93, 'Pevita Pearce'),
(94, 'Raffi Ahmad'),
(95, 'Syahrini'),
(96, 'Titi Kamal'),
(97, 'Ussy Sulistiawaty'),
(98, 'Vicky Prasetyo'),
(99, 'Wulan Guritno'),
(100, 'Yuni Shara'),
(101, 'Zaskia Gotik'),
(102, 'Anya Geraldine'),
(103, 'Baim Wong'),
(104, 'Cinta Laura'),
(105, 'Denny Sumargo'),
(106, 'Eva Celia');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int NOT NULL,
  `id_pelanggan` int NOT NULL,
  `id_kasir` int NOT NULL,
  `id_meja` int NOT NULL,
  `metode_pembayaran` enum('qris','dana','gopay','') NOT NULL,
  `status_pembayaran` enum('belum bayar','lunas') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `id_pelanggan`, `id_kasir`, `id_meja`, `metode_pembayaran`, `status_pembayaran`, `created_at`) VALUES
(5, 4, 8, 108, 'qris', 'belum bayar', '2026-05-25 02:43:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `id_transaksi` (`id_transaksi`);

--
-- Indexes for table `kasir`
--
ALTER TABLE `kasir`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meja`
--
ALTER TABLE `meja`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kasir` (`id_kasir`),
  ADD KEY `id_meja` (`id_meja`),
  ADD KEY `id_pelanggan` (`id_pelanggan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kasir`
--
ALTER TABLE `kasir`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `meja`
--
ALTER TABLE `meja`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=204;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_kasir`) REFERENCES `kasir` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_meja`) REFERENCES `meja` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

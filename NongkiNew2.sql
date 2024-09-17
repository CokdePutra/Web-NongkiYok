-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 17 Sep 2024 pada 02.27
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nongki`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `contact`
--

CREATE TABLE `contact` (
  `Id_Contact` int(11) NOT NULL,
  `tanggal` datetime NOT NULL DEFAULT current_timestamp(),
  `Name` varchar(35) NOT NULL,
  `Email` varchar(35) NOT NULL,
  `Massage` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `contact`
--

INSERT INTO `contact` (`Id_Contact`, `tanggal`, `Name`, `Email`, `Massage`) VALUES
(5, '2024-08-16 23:43:30', 'gung nanda', 'gungnands@gmail.com', 'test 2');

-- --------------------------------------------------------

--
-- Struktur dari tabel `favorite`
--

CREATE TABLE `favorite` (
  `Id_Favorite` int(11) NOT NULL,
  `Id_User` int(11) NOT NULL,
  `Id_Places` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `favorite`
--

INSERT INTO `favorite` (`Id_Favorite`, `Id_User`, `Id_Places`) VALUES
(34, 6, 26),
(38, 6, 7),
(45, 6, 4),
(48, 11, 15),
(49, 11, 4),
(50, 7, 4),
(51, 10, 4),
(52, 10, 26),
(53, 10, 7),
(54, 10, 3),
(55, 7, 27);

-- --------------------------------------------------------

--
-- Struktur dari tabel `places`
--

CREATE TABLE `places` (
  `Id_Places` int(11) NOT NULL,
  `Latitude` float NOT NULL,
  `Longtitude` float NOT NULL,
  `Link` varchar(100) NOT NULL,
  `Name` varchar(35) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `AVG_Price` double NOT NULL,
  `Category` varchar(20) NOT NULL,
  `Size` varchar(7) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Id_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `places`
--

INSERT INTO `places` (`Id_Places`, `Latitude`, `Longtitude`, `Link`, `Name`, `Description`, `AVG_Price`, `Category`, `Size`, `Image`, `Id_User`) VALUES
(2, -8.63318, 115.234, 'https://maps.app.goo.gl/iT4t21nrfpwV4zDf8', 'Noja\'s Warung', 'resto makan dengan hidanganan non halal dengan view tepi sungai dengan harga terjangkau', 28000, 'Resto', 'Small', '/uploads/1723651446816.jpg', 6),
(3, -8.66536, 115.233, 'https://maps.app.goo.gl/WW8Z2z3izG634mWQ9', 'Coffee Secret\'s', 'tempat ngopi yang tersembunyi di daerah perkotaan dengan harga menengah dan tempat yang cozy', 56000, 'Cafe', 'Medium', '/uploads/1723697828374.png', 6),
(4, -8.67079, 115.145, 'https://maps.app.goo.gl/VwckEkNE9J6jRWnc6', 'Café del Mar', 'Restoran tepi pantai kontemporer yang menyajikan hidangan khas Mediterania, koktail, dan wine global', 80000, 'Resto', 'Large', '/uploads/1723650846334.jpg', 6),
(5, -8.6809, 115.188, 'https://maps.app.goo.gl/Dg7b9GoJYideLHMr6', '9/11 Cafe & Concept Store', 'cafe yang berkonsepkan modern dan cocok untuk makan makan maupun sekedar ngopi dengan tempat dan par', 50000, 'Resto', 'Medium', '/uploads/1723697969666.png', 6),
(7, -8.65497, 115.142, 'https://maps.app.goo.gl/RKrNtLeNC13Whhgp9', 'Dough Darlings Canggu', 'ini resto bisa jadi tempat nongkrong di canggu', 57000, 'Cafe', 'Medium', '/uploads/1723651067288.jpg', 6),
(15, -8.6358, 115.185, 'https://maps.app.goo.gl/CLS9jn5eSHfGTU6c9', 'Ming Coffee Eatery and Music', 'Kafe sejuk dan luas dengan kursi taman yang menyajikan hidangan tradisional, kopi, jus, dan kreasi m', 47000, 'Resto', 'Medium', '/uploads/1723115301964.jpg', 6),
(24, -8.60713, 115.172, 'https://maps.app.goo.gl/U1hXxMTiMXQzt3S38', 'Bamboo Coffee', 'di dalung ni', 37000, 'Resto', 'Small', '/uploads/1723124180341.jpg', 6),
(26, -8.68297, 115.158, 'https://maps.app.goo.gl/SYDE5YRpDjZdCvTB9', 'Sisterfields Cafe', 'Kafe modern dengan kursi di dalam & luar ruangan yang menawarkan brunch khas Australia, serta koktai', 75000, 'Cafe', 'Medium', '/uploads/1723648964265.jpeg', 6),
(27, -8.61374, 115.193, 'https://maps.app.goo.gl/zaqtkV49xBjnm2QGA', 'NOIR Cafe', 'cafe yang menyajikan konsep doodle art dengan harga menu yang standart', 43000, 'Cafe', 'Medium', '/uploads/1723653704702.jpeg', 7);

-- --------------------------------------------------------

--
-- Struktur dari tabel `registerguide`
--

CREATE TABLE `registerguide` (
  `Id_Register` int(11) NOT NULL,
  `Id_User` int(11) NOT NULL,
  `Status` varchar(10) NOT NULL,
  `Alasan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `registerguide`
--

INSERT INTO `registerguide` (`Id_Register`, `Id_User`, `Status`, `Alasan`) VALUES
(3, 6, 'Approved', 'test request'),
(5, 6, 'Approved', 'ass'),
(6, 6, 'Approved', 'Saya ingin membantu untuk menemukan tempat tempat yang hiden gem'),
(7, 11, 'Pending', 'saya ingin berkontribusi dalam membatu umkm terutama untuk tempat tempat yang hiden gem');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `Name` varchar(35) NOT NULL,
  `Id_User` int(11) NOT NULL,
  `Email` varchar(35) NOT NULL,
  `Password` varchar(120) NOT NULL,
  `Role` varchar(7) NOT NULL,
  `Username` varchar(15) NOT NULL,
  `VerificationToken` varchar(6) DEFAULT NULL,
  `IsVerified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`Name`, `Id_User`, `Email`, `Password`, `Role`, `Username`, `VerificationToken`, `IsVerified`) VALUES
('Gung Nanda', 7, 'gn.nanda0@gmail.com', '$2a$10$t2dw6aol9DjpKvzgxh1Ql.25ySD/IAXLwAzGOOKsFR3o3vWOBGEVq', 'Admin', 'Zayuran', NULL, 1),
('Adi dharma', 10, 'adidharma@gmail.com', '$2a$10$diUtDpsnX1jkoWL6sAhppeKDbI4lrCvNcqHtO5QQ4KMxw/OeMYrly', 'User', 'Adidoy', NULL, 1),
('Kanha', 11, 'Kanhamahesyogi@gmail.com', '$2a$10$U9dNKQUbxvqoXA9CGQstP.n8r1Dhl0czmfquxhHljauOqPcUl48ci', 'User', 'Kanha', NULL, 1),
('Cokde', 12, 'cokde@gmail.com', '$2a$10$bQ8Wm3Si.DPifdf2UQir3ejZ0DBiwAM4h3f9f.7nbhpC8Z/s4oQ6G', 'Admin', 'Gmoons', NULL, 1),
('nanda', 15, 'gungnands@gmail.com', '$2a$10$C6u9MlbJojKe1hgREWeb.ej.o1lZnuvRMGFU4JWc51FmiESDepOYy', 'User', 'nanda1234', '599642', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`Id_Contact`);

--
-- Indeks untuk tabel `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`Id_Favorite`);

--
-- Indeks untuk tabel `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`Id_Places`),
  ADD KEY `Id_User` (`Id_User`);

--
-- Indeks untuk tabel `registerguide`
--
ALTER TABLE `registerguide`
  ADD PRIMARY KEY (`Id_Register`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id_User`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `contact`
--
ALTER TABLE `contact`
  MODIFY `Id_Contact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `favorite`
--
ALTER TABLE `favorite`
  MODIFY `Id_Favorite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT untuk tabel `places`
--
ALTER TABLE `places`
  MODIFY `Id_Places` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `registerguide`
--
ALTER TABLE `registerguide`
  MODIFY `Id_Register` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `Id_User` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

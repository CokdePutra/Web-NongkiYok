-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 09 Agu 2024 pada 10.12
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
  `Name` varchar(35) NOT NULL,
  `Email` varchar(35) NOT NULL,
  `Massage` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 6, 1),
(2, 2, 1),
(3, 1, 1),
(4, 6, 2),
(5, 5, 3),
(6, 4, 1),
(7, 4, 1),
(8, 3, 2);

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
  `Image` varchar(255) NOT NULL,
  `Id_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `places`
--

INSERT INTO `places` (`Id_Places`, `Latitude`, `Longtitude`, `Link`, `Name`, `Description`, `AVG_Price`, `Category`, `Image`, `Id_User`) VALUES
(2, -8.63318, 115.234, 'https://maps.app.goo.gl/iT4t21nrfpwV4zDf8', 'Noja\'s Warung', 'ini deskripsi', 28000, 'Resto', '', 6),
(3, -8.66536, 115.233, 'https://maps.app.goo.gl/WW8Z2z3izG634mWQ9', 'Coffee Secret\'s', 'ini deskripsi', 56000, 'Cafe', '', 1),
(4, -8.67079, 115.145, 'https://maps.app.goo.gl/VwckEkNE9J6jRWnc6', 'Café del Mar', 'cage highend', 80000, 'Cafe', '', 6),
(5, -8.6809, 115.188, 'https://maps.app.goo.gl/Dg7b9GoJYideLHMr6', '9/11 Cafe & Concept Store', '9/11 cafee', 50000, 'cafe', '', 3),
(7, -8.65497, 115.142, 'https://maps.app.goo.gl/RKrNtLeNC13Whhgp9', 'Dough Darlings Canggu', 'ini tempat nongkrong di canggu', 57000, 'Cafe', '/uploads/1723111615360.jpg', 6),
(15, -8.6358, 115.185, 'https://maps.app.goo.gl/CLS9jn5eSHfGTU6c9', 'Ming Coffee Eatery and Music', 'Ming Coffee Eatery kebo iwa', 47000, 'Resto', '/uploads/1723115301964.jpg', 6),
(24, -8.60713, 115.172, 'https://maps.app.goo.gl/U1hXxMTiMXQzt3S38', 'Bamboo Coffee', 'di dalung ni', 37000, 'Resto', '/uploads/1723124180341.jpg', 6),
(26, -8.68297, 115.158, 'https://maps.app.goo.gl/SYDE5YRpDjZdCvTB9', 'Sisterfields Cafe', 'Kafe modern dengan kursi di dalam & luar ruangan yang menawarkan brunch khas Australia, serta koktai', 75000, 'Cafe', '', 6);

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
  `Username` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`Name`, `Id_User`, `Email`, `Password`, `Role`, `Username`) VALUES
('Gung Nanda', 1, 'gn.nanda0@gmail.com', 'admin#1234', 'Admin', 'Zayuran'),
('Cokde', 2, 'lolocokde@gmail.com', 'admin#1234', 'Guide', 'GMOONS'),
('Kanha', 3, 'lolokkanha@gmail.com', 'admin#1234', 'Guide', 'lolok kanha'),
('Adi Dharma', 4, 'lolokadi@gmail.com', 'admin#1234', 'User', 'Adidoy'),
('kosu', 5, 'gemahortono338@gmail.com', '$2a$10$KPEzwZjtzfrLCrunzu6QgOpA.dIVa5XI7EWcF8OiEdUumP9ACXegy', 'Guide', 'sungrue'),
('gung', 6, 'gungnands@gmail.com', '$2a$10$VyRaQlFUxf40JEX7uYh1deazbYpf6BP9TNevBI06owMMo1hKH8DEO', 'Guide', 'zephyrus');

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
  MODIFY `Id_Contact` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `favorite`
--
ALTER TABLE `favorite`
  MODIFY `Id_Favorite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `places`
--
ALTER TABLE `places`
  MODIFY `Id_Places` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `Id_User` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

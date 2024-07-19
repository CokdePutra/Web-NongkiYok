-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 19 Jul 2024 pada 16.05
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
  `Id_User` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `places`
--

INSERT INTO `places` (`Id_Places`, `Latitude`, `Longtitude`, `Link`, `Name`, `Description`, `AVG_Price`, `Category`, `Id_User`) VALUES
(1, -8.68698, 115.227, 'https://maps.app.goo.gl/bugDzQAPDp3U7J4F6', 'Sendiri Coffee Bar', 'ini deskripsi', 30000, 'Cafe', 2),
(2, -8.63318, 115.234, 'https://maps.app.goo.gl/iT4t21nrfpwV4zDf8', 'Noja\'s Warung', 'ini deskripsi', 28000, 'Resto', 3),
(3, -8.66536, 115.233, 'https://maps.app.goo.gl/WW8Z2z3izG634mWQ9', 'Coffee Secret\'s', 'ini deskripsi', 56000, 'Cafe', 1);

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
('Adi Dharma', 4, 'lolokadi@gmail.com', 'admin#1234', 'User', 'Adidoy');

--
-- Indexes for dumped tables
--

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
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `places`
--
ALTER TABLE `places`
  ADD CONSTRAINT `places_ibfk_1` FOREIGN KEY (`Id_User`) REFERENCES `users` (`Id_User`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

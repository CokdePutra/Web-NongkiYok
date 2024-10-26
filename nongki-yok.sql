-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 26 Okt 2024 pada 12.32
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
(6, '2024-09-23 21:37:38', 'gung nanda', 'gungnanda14@gmail.com', 'test message');

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
(55, 7, 27),
(59, 10, 5),
(60, 30, 4),
(61, 30, 26),
(72, 7, 47);

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
  `Description` text NOT NULL,
  `AVG_Price` double NOT NULL,
  `Category` varchar(20) NOT NULL,
  `Size` varchar(7) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Id_User` int(11) NOT NULL,
  `Open` time NOT NULL,
  `Close` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `places`
--

INSERT INTO `places` (`Id_Places`, `Latitude`, `Longtitude`, `Link`, `Name`, `Description`, `AVG_Price`, `Category`, `Size`, `Image`, `Id_User`, `Open`, `Close`) VALUES
(2, -8.63318, 115.234, 'https://maps.app.goo.gl/iT4t21nrfpwV4zDf8', 'Noja\'s Warung', '<p>resto makan dengan hidanganan non halal dengan view tepi sungai dengan harga terjangkau</p>', 28000, 'Resto', 'Small', '/uploads/1723651446816.jpg', 6, '09:00:00', '21:30:00'),
(3, -8.66536, 115.233, 'https://maps.app.goo.gl/WW8Z2z3izG634mWQ9', 'Coffee Secret\'s', '<p>tempat ngopi yang tersembunyi di daerah perkotaan dengan harga menengah dan tempat yang cozy</p>', 56000, 'Cafe', 'Medium', '/uploads/1723697828374.png', 6, '07:00:00', '22:00:00'),
(5, -8.6809, 115.188, 'https://maps.app.goo.gl/Dg7b9GoJYideLHMr6', '9/11 Cafe & Concept Store', '<p>cafe yang berkonsepkan modern dan cocok untuk makan makan maupun sekedar ngopi dengan tempat dan par</p>', 50000, 'Resto', 'Medium', '/uploads/1723697969666.png', 6, '09:00:00', '23:00:00'),
(7, -8.65497, 115.142, 'https://maps.app.goo.gl/RKrNtLeNC13Whhgp9', 'Dough Darlings Canggu', '<p>Dough Darlings Canggu adalah destinasi populer di Bali bagi pecinta donat dan kopi, dengan suasana yang nyaman dan santai. Terletak di area yang mudah diakses dengan parkir gratis, kafe ini menyediakan tempat duduk di area terbuka bagi mereka yang ingin menikmati udara segar Canggu. Layanan yang beragam seperti makan di tempat, pesan antar, dan bawa pulang memudahkan pengunjung menikmati menu mereka di mana saja. Kafe ini juga cocok untuk anak-anak dengan pilihan menu khusus yang disukai semua usia, menjadikannya pilihan ideal untuk keluarga dan kelompok.</p><p><br></p><p>Menu di Dough Darlings Canggu mencakup beragam pilihan makanan dari sarapan, brunch, makan siang, makan malam, hingga hidangan penutup. Donat adalah daya tarik utama dengan berbagai rasa unik, sementara kopi yang ditawarkan melengkapi pengalaman menyantap donat yang istimewa. Dengan fasilitas toilet yang bersih dan layanan pelanggan yang ramah, tempat ini mengutamakan kenyamanan pengunjung sehingga mereka bisa bersantai menikmati suasana.</p><p><br></p><p>Pembayaran di Dough Darlings sangat fleksibel, mendukung berbagai metode seperti kartu debit, kartu kredit, dan pembayaran NFC melalui ponsel. Suasana kafe yang ramah dan santai menjadikan Dough Darlings tidak hanya tempat untuk menikmati makanan lezat, tapi juga tempat untuk bersosialisasi dan berkumpul dengan teman-teman dalam suasana yang menyenangkan.</p>', 57000, 'Cafe', 'Medium', '/uploads/1723651067288.jpg', 6, '07:00:00', '21:00:00'),
(15, -8.6358, 115.185, 'https://maps.app.goo.gl/CLS9jn5eSHfGTU6c9', 'Ming Coffee Eatery and Music', '<p>Kafe sejuk dan luas dengan kursi taman yang menyajikan hidangan tradisional, kopi, jus, dan kreasi m</p>', 47000, 'Resto', 'Medium', '/uploads/1723115301964.jpg', 6, '10:00:00', '23:00:00'),
(24, -8.60713, 115.172, 'https://maps.app.goo.gl/U1hXxMTiMXQzt3S38', 'Bamboo Coffee', '<p>Bamboo Coffee adalah kafe dengan konsep santai dan nyaman, ideal untuk menikmati kopi dan makanan bersama teman atau keluarga. Terletak di lokasi yang strategis dengan banyak area parkir gratis, Bamboo Coffee melayani pengunjung yang ingin makan di tempat maupun mengambil pesanan untuk dibawa pulang. Dengan suasana yang ramah dan relaks, kafe ini juga cocok untuk pengunjung berkelompok, sehingga menjadi pilihan tepat bagi yang ingin berkumpul sambil menikmati suasana kafe yang hangat.</p><p><br></p><p>Menu di Bamboo Coffee beragam, termasuk pilihan brunch, makan siang, makan malam, dan hidangan penutup yang memanjakan lidah. Selain kopi, pilihan makanan lengkap ini menjadikan Bamboo Coffee tempat yang pas untuk berbagai kesempatan, baik sekadar minum kopi di pagi hari atau makan malam santai. Kafe ini juga ramah bagi keluarga dengan anak-anak, sehingga orang tua dapat menikmati waktu mereka tanpa khawatir. Fasilitas seperti toilet yang bersih juga menambah kenyamanan pengunjung.</p><p><br></p><p>Selain itu, Bamboo Coffee menerima reservasi, memungkinkan pelanggan untuk memastikan tempat duduk terlebih dahulu, terutama di saat-saat ramai. Suasana yang santai dan layanan yang ramah membuat pengalaman bersantai di Bamboo Coffee semakin berkesan.</p>', 37000, 'Resto', 'Small', '/uploads/1723124180341.jpg', 6, '11:00:00', '21:00:00'),
(27, -8.61165, 115.191, 'https://maps.app.goo.gl/zaqtkV49xBjnm2QGA', 'NOIR Cafe', '<p>NOIR Cafe adalah tempat hangout yang menarik di Bali, dengan konsep elegan dan suasana yang nyaman serta santai. Kafe ini menawarkan berbagai opsi layanan seperti makan di tempat, bawa pulang, dan pesan antar, sehingga pengunjung dapat menikmati pengalaman kuliner yang fleksibel. Keunikan NOIR Cafe terletak pada area tempat duduk di atap, memberikan pengalaman bersantap dengan pemandangan yang menyegarkan bagi pengunjung yang ingin merasakan suasana berbeda.</p><p><br></p><p>Menu di NOIR Cafe sangat beragam, mulai dari brunch, makan siang, makan malam, hingga hidangan penutup. Selain kopi, mereka juga menawarkan berbagai minuman beralkohol seperti bir dan koktail yang bisa dinikmati di bar kafe. Pengunjung berkelompok maupun keluarga akan merasa nyaman di sini, terutama karena kafe ini juga menyediakan kursi tinggi dan menu anak-anak, menjadikannya tempat yang ramah untuk segala usia.</p><p><br></p><p class=\"ql-align-justify\">Dengan fasilitas yang lengkap termasuk bar dan toilet yang bersih, serta banyaknya tempat parkir yang tersedia, NOIR Cafe memudahkan pengunjung untuk datang dan bersantai. Metode pembayaran juga fleksibel, mendukung kartu debit, kartu kredit, dan pembayaran NFC dengan ponsel. Suasana yang santai dan ramah, serta opsi reservasi, menjadikan NOIR Cafe pilihan ideal untuk bersantap bersama keluarga atau teman-teman dalam suasana yang menyenangkan.</p>', 43000, 'Cafe', 'Medium', '/uploads/1723653704702.jpeg', 7, '10:00:00', '23:00:00'),
(30, -8.67124, 115.165, 'https://maps.app.goo.gl/J5dwsKx4JzuPNK6a6', 'KIOA Bali', '<p>KIOA, opening its doors on March 6th, 2024, invites you to experience a unique cafe and restaurant r</p>', 100000, 'Resto', 'Medium', '/uploads/1727254065671.webp', 6, '08:00:00', '22:00:00'),
(36, -7.31568, 112.764, 'https://maps.app.goo.gl/4M14dA74BarGHD6B7', 'Your Dream Coffee & Eatery', '<h1><strong>Your Dream Coffee &amp; Eatery </strong></h1><p><br></p><p>adalah destinasi sempurna untuk Anda yang mencari tempat nongkrong nyaman di daerah Tenggilis, Surabaya. Dengan ruang yang luas dan bersih, kafe ini dirancang untuk memberikan pengalaman bersantai yang menyenangkan bagi semua pengunjung. Anda dapat menemukan sudut-sudut cozy yang ideal untuk bekerja, berkumpul dengan teman, atau sekadar menikmati waktu sendiri dengan secangkir kopi. Setiap detail interior dipilih dengan hati-hati untuk menciptakan suasana yang hangat dan mengundang, sehingga membuat setiap kunjungan menjadi istimewa.</p><p><br></p><p>Selain atmosfer yang menyenangkan, Your Dream Coffee &amp; Eatery juga menawarkan menu makanan dan minuman yang menggugah selera. Dari berbagai pilihan kopi spesial yang disiapkan oleh barista berpengalaman hingga makanan ringan dan hidangan utama yang terinspirasi dari kuliner lokal dan internasional, setiap pilihan dijamin memuaskan.</p><p><br></p><p> Anda dapat menikmati latte art yang cantik atau mencicipi hidangan yang disiapkan dengan bahan-bahan segar dan berkualitas. Kafe ini berkomitmen untuk menghadirkan rasa yang lezat dan pengalaman kuliner yang memuaskan.</p><p><br></p><p>Tidak hanya itu, Your Dream Coffee &amp; Eatery juga sering mengadakan acara dan kegiatan menarik, seperti live music, workshop, dan acara komunitas lainnya. Dengan adanya berbagai aktivitas ini, kafe ini tidak hanya sekadar tempat untuk menikmati makanan dan minuman, tetapi juga sebagai ruang untuk bertemu orang baru dan menjalin hubungan sosial. Jadi, jika Anda mencari tempat untuk bersantai sambil menikmati hidangan lezat dan suasana yang menyenangkan, Your Dream Coffee &amp; Eatery adalah pilihan yang tepat!</p>', 40000, 'Cafe', 'Medium', '/uploads/1729707774427.webp', 7, '09:00:00', '23:00:00'),
(37, -8.67054, 115.145, 'https://maps.app.goo.gl/uP1MhFSneZ3Ud92F7', 'Café del Mar', '<p><strong>Café del Mar</strong> adalah restoran tepi pantai yang memadukan gaya kontemporer dengan pesona Mediterania. Terletak di lokasi yang strategis di pinggir laut, restoran ini menawarkan pemandangan indah yang sempurna untuk menikmati hidangan sambil bersantai. Setiap sudut Café del Mar dirancang dengan nuansa modern yang elegan, memberikan atmosfer yang nyaman dan menyenangkan bagi para pengunjung. Dengan angin sepoi-sepoi dari laut dan suara ombak yang menenangkan, tempat ini menjadi destinasi ideal untuk melepas penat atau menikmati waktu berkualitas bersama orang tersayang.</p><p><br></p><p>Menu di Café del Mar menonjolkan kelezatan kuliner khas Mediterania yang kaya akan cita rasa. Anda bisa menikmati berbagai pilihan hidangan, mulai dari seafood segar, pasta autentik, hingga salad dengan bahan-bahan berkualitas tinggi yang diolah dengan sentuhan profesional oleh chef berpengalaman. Setiap hidangan disajikan dengan presentasi yang menggugah selera, memastikan pengalaman bersantap yang memuaskan tidak hanya untuk lidah, tetapi juga untuk mata. Selain makanan, Café del Mar juga menawarkan beragam pilihan koktail segar dan koleksi wine global yang siap menemani setiap momen santap Anda.</p><p><br></p><p>Tak hanya soal makanan, Café del Mar juga dikenal sebagai tempat yang ideal untuk menikmati momen matahari terbenam dengan segelas koktail di tangan. Dengan suasana yang santai namun tetap elegan, restoran ini sering menjadi tempat pilihan untuk perayaan pribadi, acara spesial, hingga sekadar berkumpul bersama teman. Café del Mar memberikan pengalaman yang menggabungkan keindahan alam, hidangan berkualitas, dan suasana yang tak terlupakan, membuatnya menjadi destinasi kuliner yang wajib dikunjungi bagi para pecinta makanan dan pencari pengalaman unik di tepi pantai.</p>', 400000, 'Resto', 'Large', '/uploads/1729772068798.jpg', 6, '11:00:00', '03:00:00'),
(38, -8.68243, 115.158, 'https://maps.app.goo.gl/mwB8tcp91VCshpFbA', 'Sisterfields Cafe', '<p>Sisterfields Cafe adalah kafe modern yang berlokasi di Seminyak, Bali, dengan konsep yang menggabungkan suasana santai dan gaya hidup urban khas Australia. Kafe ini sangat terkenal dengan brunch khas Australia yang disajikan sepanjang hari, menawarkan berbagai hidangan seperti roti panggang alpukat, granola, dan berbagai pilihan sandwich. Tidak hanya itu, Sisterfields juga menyediakan berbagai minuman koktail yang segar, cocok untuk dinikmati bersama teman atau keluarga setelah beraktivitas di sekitar pantai Seminyak.</p><p><br></p><p>Interior Sisterfields memadukan konsep minimalis dengan sentuhan modern, menghadirkan area duduk baik di dalam ruangan yang nyaman maupun di luar ruangan yang asri. Tempat ini juga menjadi favorit para wisatawan maupun penduduk lokal yang ingin menikmati suasana kafe dengan nuansa bersih dan cerah. Selain brunch, mereka juga menyajikan berbagai hidangan Western yang menonjolkan bahan-bahan segar berkualitas tinggi.</p><p><br></p><p>Selain brunch dan makanan lezat, Sisterfields terkenal dengan minuman-minuman kreatif mereka. Koktail yang ditawarkan mencerminkan semangat kafe ini untuk memberikan pengalaman kuliner yang lengkap, mulai dari makanan hingga minuman. Hal ini menjadikan Sisterfields sebagai destinasi yang tepat untuk menikmati momen santai atau berkumpul bersama teman di Bali. Kafe ini buka setiap hari dari pagi hingga malam, memastikan para tamu bisa menikmati suasana kapan saja​.</p>', 65000, 'Cafe', 'Medium', '/uploads/1729772234346.jpeg', 6, '07:00:00', '21:00:00'),
(39, -8.65085, 115.162, 'https://maps.app.goo.gl/o5MTPtVRJxr7UKbr8', 'BACKYARD Reborn', '<p>BACKYARD Reborn di Jalan Raya Semer, Kerobokan, Bali, adalah destinasi unik yang menawarkan pengalaman bersantap dengan suasana yang nyaman dan ramah, cocok untuk keluarga maupun teman-teman yang ingin bersantai. Dengan sentuhan desain tropis modern, BACKYARD Reborn menciptakan nuansa yang menyenangkan untuk berkumpul dan menikmati hidangan. Tempat ini memiliki area duduk yang luas, mencakup pilihan tempat duduk indoor dan outdoor yang tertata apik di bawah pepohonan rindang dan dekorasi natural, memberikan suasana yang sejuk meskipun berada di area terbuka.</p><p><br></p><p>Menu di BACKYARD Reborn mencakup berbagai pilihan kuliner dari makanan lokal hingga hidangan internasional, yang dikemas dengan rasa yang autentik dan bahan-bahan segar. Anda bisa menikmati berbagai hidangan khas Bali, seperti ayam betutu, hingga hidangan barat modern seperti burger dan salad segar. Mereka juga menawarkan pilihan minuman yang menyegarkan, mulai dari jus buah segar hingga aneka koktail yang pas dinikmati saat matahari mulai terbenam di Bali.</p><p><br></p><p>Selain makanan dan minuman yang lezat, BACKYARD Reborn juga kerap mengadakan acara live music atau pertunjukan lainnya yang menambah kenyamanan pengunjung. Dengan pelayanan yang ramah dan suasana yang hangat, BACKYARD Reborn menjadi tempat ideal untuk melarikan diri sejenak dari hiruk-pikuk dan menikmati momen berharga bersama orang-orang terdekat di tengah suasana yang asri dan bersahabat di Kerobokan, Bali.</p>', 30000, 'Cafe', 'Small', '/uploads/1729907327360.jpg', 6, '08:00:00', '17:00:00'),
(40, -8.66381, 115.23, 'https://maps.app.goo.gl/i2jVsYo9DH66Bnud9', 'Moto Cafee 69', '<p>Moto Cafee 69 adalah kafe dengan konsep otomotif yang kental, dirancang untuk para pecinta motor custom dan gaya hidup bikers. Mengusung desain interior yang rustic dan industrial, kafe ini dihiasi dengan berbagai elemen otomotif yang unik, mulai dari mesin motor, helm, hingga dekorasi berbahan logam. Para pengunjung yang datang tidak hanya disuguhi dengan suasana khas garasi, tetapi juga bisa merasakan pengalaman nongkrong yang autentik sambil menikmati hidangan dan minuman di lingkungan yang nyaman dan santai.</p><p><br></p><p>Menu di Moto Cafee 69 beragam, dengan pilihan makanan berat dan minuman, serta beberapa snack ringan yang pas untuk teman ngobrol. Menu utama mencakup berbagai pilihan makanan yang cocok untuk brunch, makan siang, dan makan malam, sementara kopi dan minuman beralkohol seperti bir juga tersedia. Berbagai jenis kopi yang disajikan di kafe ini menjadi pilihan yang tepat untuk mengawali hari atau sekadar menemani obrolan panjang dengan teman. Selain itu, pengunjung juga dapat memilih aneka makanan penutup yang manis untuk melengkapi pengalaman bersantap mereka.</p><p><br></p><p>Moto Cafee 69 juga memiliki fasilitas tempat duduk di area terbuka, memberikan opsi bagi pengunjung yang ingin menikmati udara segar. Kafe ini dilengkapi dengan bar yang menyajikan berbagai minuman, serta fasilitas toilet yang memadai. Suasana yang nyaman dan santai membuat kafe ini ideal untuk dikunjungi dalam kelompok, baik bersama teman-teman bikers atau keluarga. Dengan konsep yang unik dan atmosfer yang ramah, Moto Cafee 69 menjadi tempat yang pas untuk berkumpul, menikmati makanan, dan membahas dunia otomotif.</p><p><br></p><p>Selain itu, Moto Cafee 69 menyediakan berbagai kemudahan bagi pengunjung, termasuk opsi bawa pulang, layanan makan di tempat, dan pembayaran dengan kartu debit atau kredit. Pengunjung yang membawa kendaraan pribadi juga tidak perlu khawatir, karena kafe ini menyediakan tempat parkir gratis yang luas. Moto Cafee 69 memang lebih dari sekadar kafe; ini adalah tempat berkumpulnya komunitas pecinta motor dan semua yang menggemari budaya otomotif, menciptakan pengalaman nongkrong yang berkesan dan menyenangkan.</p>', 35000, 'Resto', 'Medium', '/uploads/1729907846373.png', 6, '09:00:00', '21:00:00'),
(41, -8.6845, 115.231, 'https://maps.app.goo.gl/yCF9c6JEKMxQ9HSo9', 'IBUKOTA Coffee & Eatery', '<p><strong>IBUKOTA Coffee &amp; Eatery</strong> adalah tempat yang sempurna bagi siapa saja yang ingin menikmati kopi berkualitas di suasana yang nyaman dan santai. Terletak di daerah Panjer, Bali, kafe ini menawarkan konsep modern dengan tempat duduk di area terbuka, cocok untuk bersantai atau bekerja dengan tenang. Interior yang didesain apik memberikan kesan hangat, sehingga pengunjung bisa merasa seperti di rumah sendiri. Selain kopi sebagai menu andalan, IBUKOTA juga menyajikan hidangan yang lezat dan variasi makanan yang cocok untuk brunch, makan siang, atau makan malam.</p><p><br></p><p>Menu yang disajikan di IBUKOTA Coffee &amp; Eatery mencakup pilihan hidangan penutup dan makanan utama, dari camilan ringan hingga hidangan yang mengenyangkan. Para pengunjung dapat menikmati aneka kopi spesial yang diracik dengan baik, menjadikannya tempat yang tepat untuk pencinta kopi. Selain itu, IBUKOTA juga menyediakan menu khusus untuk anak-anak, sehingga cocok untuk kunjungan keluarga. Fasilitas yang tersedia seperti toilet dan area parkir yang luas menambah kenyamanan bagi semua pengunjung.</p><p><br></p><p>IBUKOTA Coffee &amp; Eatery juga menawarkan fleksibilitas dalam pembayaran, mulai dari kartu debit, kartu kredit, hingga pembayaran NFC dengan ponsel, memudahkan pelanggan dalam bertransaksi. Dengan suasana yang ramah dan menyenangkan, tempat ini sangat ideal untuk berkumpul bersama teman atau keluarga dalam suasana yang santai. Baik untuk sekadar nongkrong, bekerja, atau menikmati waktu makan bersama, IBUKOTA adalah pilihan tepat di Panjer, Bali.</p>', 35000, 'Cafe', 'Medium', '/uploads/1729908188287.png', 6, '10:00:00', '01:00:00'),
(42, -8.65092, 115.16, 'https://maps.app.goo.gl/KKbe6NxqH8V17vFq6', 'Kopikota Bali', '<p>Kopikota Bali adalah kafe yang menarik dan nyaman, cocok untuk menikmati berbagai pilihan kopi dan hidangan dengan suasana santai di area Bali. Dengan fasilitas tempat duduk di area terbuka, Kopikota menawarkan pengalaman menikmati kopi dengan nuansa alami. Pengunjung dapat menikmati berbagai pilihan makanan untuk sarapan, brunch, makan siang, hingga makan malam, termasuk hidangan penutup yang menyegarkan. Tempat ini juga menerima pesanan untuk dibawa pulang, pesan antar, hingga antar tanpa bertemu, sehingga memberikan fleksibilitas bagi pelanggan yang memiliki berbagai preferensi.</p><p><br></p><p>Selain menu kopinya yang populer, Kopikota Bali menyediakan fasilitas yang membuat pengunjung merasa nyaman, seperti toilet, area parkir luas, dan opsi parkir gratis di jalan. Pengunjung dapat menikmati waktu bersantai bersama teman atau keluarga, bahkan membawa hewan peliharaan seperti anjing, karena tempat ini ramah terhadap hewan. Kopikota juga menyediakan menu khusus untuk anak-anak, menjadikannya pilihan yang cocok untuk kunjungan keluarga. Dengan suasana yang santai, kafe ini juga menerima reservasi bagi pengunjung yang ingin merencanakan kunjungan sebelumnya.</p><p><br></p><p>Pilihan pembayaran yang ditawarkan juga cukup fleksibel, termasuk kartu kredit, sehingga memudahkan pengunjung dalam bertransaksi. Kopikota Bali benar-benar menjadi tempat yang sempurna untuk semua kalangan, mulai dari mereka yang ingin bersantai sendiri, hingga pengunjung berkelompok yang mencari tempat untuk berkumpul dan bersosialisasi di tengah hiruk-pikuk Bali.</p>', 60000, 'Cafe', 'Small', '/uploads/1729909427415.png', 6, '07:59:00', '22:00:00'),
(43, -8.6362, 115.222, 'https://maps.app.goo.gl/atqpbVN6L54mvnDb9', 'Depot Rama', '<p>Depot Rama adalah tempat makan populer di Denpasar yang beralamat di Jl. Jala Suci No.1, Dangin Puri Kaja, Kec. Denpasar Utara, Kota Denpasar, Bali. Tempat ini dikenal dengan hidangan khas Indonesia yang lezat dan autentik, dengan menu utama seperti nasi campur Bali yang disajikan dengan berbagai lauk-pauk khas Bali. Cita rasa yang khas dan bumbu yang autentik menjadikan Depot Rama sebagai tempat yang digemari oleh masyarakat lokal dan wisatawan yang ingin menikmati kuliner Bali dengan harga terjangkau.</p><p><br></p><p>Dengan suasana yang sederhana dan nyaman, Depot Rama cocok untuk makan bersama keluarga maupun berkumpul dengan teman. Tempat ini menawarkan opsi makan di tempat serta bawa pulang, sehingga sangat fleksibel bagi para pengunjung. Banyak ulasan yang menyebutkan bahwa Depot Rama menyediakan porsi makanan yang cukup besar dan harga yang bersahabat, menjadikannya pilihan yang tepat untuk pecinta kuliner lokal dan wisatawan yang ingin mencoba makanan khas Bali dengan harga yang masuk akal.</p><p><br></p><p>Depot Rama juga dilengkapi dengan fasilitas umum seperti parkir dan toilet, yang menambah kenyamanan pengunjung saat bersantap. Lokasinya yang strategis di pusat Denpasar membuatnya mudah diakses. Untuk merasakan pengalaman kuliner lokal yang autentik dan terjangkau, Depot Rama adalah pilihan yang layak dipertimbangkan bagi siapa saja yang berkunjung ke Denpasar.</p>', 30000, 'Resto', 'Medium', '', 7, '10:00:00', '22:00:00'),
(44, -8.66373, 115.234, 'https://maps.app.goo.gl/WXv2P8ZdaMP11bsX7', 'Kopi nako bali', '<p>Kopi Nako Bali adalah kedai kopi populer di Bali yang menghadirkan suasana nyaman dan desain unik untuk para pengunjungnya. Terletak di area Denpasar, tempat ini menawarkan pengalaman nongkrong yang santai dengan opsi tempat duduk di dalam dan luar ruangan, serta spot-spot foto yang Instagramable. Berbagai fasilitas, seperti Wi-Fi, stop kontak, dan area parkir, disediakan untuk menambah kenyamanan pengunjung, sehingga cocok bagi mereka yang ingin bekerja atau sekadar bersantai sambil menikmati kopi.</p><p><br></p><p>Kopi Nako Bali menyajikan beragam menu, mulai dari kopi hingga makanan berat. Beberapa varian kopi andalannya termasuk Es Kopi Nako, Kopi Durian, dan Nakopresso, yang dibuat dari biji kopi berkualitas. Selain itu, mereka juga menawarkan menu makanan seperti Nasi Merem Melek dengan berbagai pilihan lauk, dari ayam hingga daging sapi, serta camilan ringan seperti tahu cabe garam dan tempe mendoan. Harganya yang terjangkau membuat kedai ini semakin diminati oleh berbagai kalangan.</p><p><br></p><p>Untuk pengunjung yang mencari suasana berbeda, Kopi Nako Bali juga menyediakan pilihan cocktail seperti \"Love Rosie\" dan \"Ginger Blossom.\" Tempat ini ideal untuk berkumpul bersama teman atau keluarga, dan menjadi pilihan yang pas bagi mereka yang ingin menikmati suasana khas Bali dengan hidangan dan minuman yang menggugah selera.</p>', 40000, 'Cafe', 'Medium', '/uploads/1729936998753.png', 7, '10:00:00', '01:00:00'),
(45, -8.65681, 115.22, 'https://maps.app.goo.gl/Uu94Km2hsSK7FkUD7', 'Jojo\'s Pizza Slice Shop', '<p>Jojo\'s Pizza Slice Shop di Bali menawarkan konsep khas Amerika dengan fokus pada potongan pizza besar yang menggugah selera. Tempat ini populer di kalangan wisatawan dan penduduk lokal yang mencari suasana santai serta sajian cepat dan lezat. Dengan suasana kasual dan interior bergaya retro, Jojo\'s menciptakan pengalaman yang cocok untuk bersantai bersama teman sambil menikmati berbagai pilihan pizza.</p><p><br></p><p>Selain pizza dengan berbagai topping yang lezat, Jojo\'s juga menawarkan beberapa menu minuman yang melengkapi santapan pizza. Layanan di tempat ini meliputi makan di tempat dan bawa pulang, cocok untuk mereka yang ingin menikmati pizza di lokasi atau membawanya pulang. Tempat ini juga seringkali menjadi destinasi pilihan bagi para foodies yang menyukai konsep slice shop.</p><p><br></p><p>Dengan reputasinya yang baik dan ulasan positif dari pengunjung, Jojo\'s Pizza Slice Shop menjadi salah satu tempat pizza favorit di Bali. Bagi penggemar pizza yang ingin mencicipi rasa klasik dalam potongan besar, Jojo\'s adalah destinasi yang tidak boleh dilewatkan.</p>', 50000, 'Resto', 'Small', '/uploads/1729937181569.png', 7, '08:00:00', '23:00:00'),
(46, -8.68106, 115.195, 'https://maps.app.goo.gl/HbfNxX1m85Zp1xhGA', 'Mandalawangi Oseng Daging', '<p>Mandalawangi Oseng Daging menawarkan pengalaman kuliner khas Indonesia yang autentik di warung pinggir jalan dengan konsep tendaan. Menu andalannya adalah oseng daging dengan bumbu rempah yang khas, memberikan cita rasa pedas dan gurih yang memanjakan lidah. Selain oseng daging, tempat ini juga menyajikan ayam atau bebek dengan bumbu hitam, yang diolah dengan bumbu khas Nusantara, menghasilkan rasa yang kaya dan berani.</p><p><br></p><p>Tempat makan ini menyediakan suasana santai dan sederhana, cocok bagi pengunjung yang ingin menikmati masakan lokal yang lezat dengan harga terjangkau. Konsep tendaan di pinggir jalan membuat suasana di Mandalawangi terasa hangat dan kasual, di mana para pelanggan dapat bersantap sambil menikmati suasana jalanan yang hidup. Hidangan ini sangat cocok bagi pecinta kuliner yang ingin merasakan makanan khas dengan sensasi yang lebih tradisional.</p><p><br></p><p>Dengan variasi menu yang menggugah selera, Mandalawangi Oseng Daging menjadi tempat favorit untuk menikmati makanan Indonesia dalam suasana yang sederhana namun penuh cita rasa.</p>', 30000, 'Resto', 'Small', '', 7, '01:00:00', '23:59:00'),
(47, -8.39932, 115.179, 'https://maps.app.goo.gl/mqrVix2aQe11KcaH7', 'Desa Kopi Bali', '<p>Desa Kopi Bali di Tabanan menawarkan pengalaman unik menikmati kopi di tengah hutan alami. Terletak jauh dari keramaian, suasana di sini sangat tenang dan asri, membuat pengunjung merasa benar-benar dekat dengan alam. Kafe ini memiliki konsep kuno dengan desain tradisional yang memadukan elemen kayu dan bambu, menambah kesan alami dan klasik.&nbsp;</p><p><br></p><p>Selain kopi khas Bali yang menjadi andalan, Desa Kopi Bali juga menyediakan berbagai menu makanan seperti kafe pada umumnya. Pengunjung bisa menikmati hidangan ringan atau berat yang mendukung pengalaman ngopi dengan pemandangan hijau di sekitar. Tempat ini sangat cocok untuk mereka yang mencari ketenangan atau ingin melarikan diri sejenak dari hiruk-pikuk perkotaan.</p><p><br></p><p>Dengan konsep yang menggabungkan keindahan alam dan budaya tradisional, Desa Kopi Bali menjadi destinasi favorit untuk wisatawan dan penduduk lokal yang ingin menikmati suasana pedesaan sambil menyeruput kopi berkualitas.</p>', 40000, 'Cafe', 'Medium', '/uploads/1729937690078.png', 7, '09:00:00', '18:00:00'),
(48, -8.66478, 115.215, 'https://maps.app.goo.gl/s6k9QXf47FgZsPvf8', 'Inlaws Coffee Denpasar', '<p>Inlaws Coffee di Denpasar merupakan kafe yang menawarkan suasana cozy dan modern, dengan interior yang hangat dan estetik. Kafe ini memiliki berbagai pilihan tempat duduk, baik di dalam ruangan maupun di area outdoor yang memberikan suasana santai. Desainnya mengusung gaya minimalis dengan dominasi warna-warna netral, cocok bagi pengunjung yang ingin bersantai sambil bekerja atau bercengkerama dengan teman.</p><p><br></p><p>Kafe ini dikenal dengan berbagai pilihan kopi khasnya, mulai dari espresso hingga berbagai varian kopi susu yang populer. Selain kopi, Inlaws Coffee juga menyediakan aneka menu makanan, mulai dari hidangan brunch hingga makanan berat yang menggugah selera. Setiap menu dibuat dengan bahan berkualitas, sehingga cita rasanya terjaga dan memuaskan para pelanggan.</p><p><br></p><p>Berlokasi di area yang strategis di Denpasar, Inlaws Coffee menjadi pilihan menarik bagi mereka yang ingin merasakan pengalaman ngopi dengan suasana yang kekinian dan nyaman. Ditambah dengan fasilitas Wi-Fi dan suasana yang tenang, tempat ini sangat ideal untuk bekerja ataupun sekadar menikmati waktu luang.</p>', 35000, 'Cafe', 'Small', '/uploads/1729937880656.png', 7, '08:00:00', '23:00:00');

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
(8, 16, 'Approved', '...'),
(11, 11, 'Pending', 'saya ingin berkontribusi dalam membatu umkm terutama untuk tempat tempat yang hiden gem');

-- --------------------------------------------------------

--
-- Struktur dari tabel `report_reviews`
--

CREATE TABLE `report_reviews` (
  `Id_Report` int(11) NOT NULL,
  `Id_Review` int(11) NOT NULL,
  `Id_User` int(11) NOT NULL,
  `reported_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `report_reviews`
--

INSERT INTO `report_reviews` (`Id_Report`, `Id_Review`, `Id_User`, `reported_at`) VALUES
(23, 98, 7, '2024-10-19 12:09:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `review`
--

CREATE TABLE `review` (
  `Id_Review` int(11) NOT NULL,
  `Id_User` int(11) NOT NULL,
  `Id_Places` int(11) NOT NULL,
  `Review` varchar(255) NOT NULL,
  `Rating` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `review`
--

INSERT INTO `review` (`Id_Review`, `Id_User`, `Id_Places`, `Review`, `Rating`, `created_at`) VALUES
(52, 12, 2, 'Tempat yang nyaman, tapi parkirnya terbatas.', 3, '2024-10-13 10:20:00'),
(53, 15, 2, 'Pelayanan cepat, tapi kualitas makanan biasa saja.', 2, '2024-10-13 10:30:00'),
(54, 6, 2, 'Kopinya terlalu pahit untuk seleraku.', 1, '2024-10-13 10:40:00'),
(56, 10, 2, 'Tempat oke, tapi sering penuh.', 4, '2024-10-13 11:00:00'),
(59, 15, 3, 'Pelayanannya sangat ramah dan sopan.', 5, '2024-10-13 11:40:00'),
(61, 6, 3, 'Lokasi strategis, mudah dijangkau.', 4, '2024-10-13 12:00:00'),
(65, 12, 4, 'Tempat bagus untuk nongkrong bareng teman.', 4, '2024-10-13 12:50:00'),
(67, 30, 37, 'Tempat bersih, tapi kursinya kurang nyaman.', 3, '2024-10-13 13:20:00'),
(68, 6, 37, 'Wi-Fi cepat, cocok buat kerja.', 5, '2024-10-13 13:30:00'),
(69, 7, 37, 'Parkirannya susah, sering penuh.', 2, '2024-10-13 13:40:00'),
(70, 10, 37, 'Harga makanan mahal, tidak sebanding dengan kualitas.', 1, '2024-10-13 13:50:00'),
(75, 6, 7, 'Interior menarik, banyak spot foto.', 5, '2024-10-13 14:50:00'),
(77, 10, 15, 'Tempat luas, tapi suara bising.', 3, '2024-10-13 15:20:00'),
(78, 11, 15, 'Suasananya enak, cocok untuk meeting.', 4, '2024-10-13 15:30:00'),
(79, 12, 15, 'Kurang bersih, terutama di kamar mandi.', 2, '2024-10-13 15:40:00'),
(83, 7, 24, 'Harganya sedikit mahal untuk ukuran kopi.', 3, '2024-10-13 16:30:00'),
(85, 11, 24, 'Sering penuh, harus booking dulu.', 2, '2024-10-13 16:50:00'),
(86, 12, 24, 'Kopi terlalu pahit, tidak sesuai selera.', 1, '2024-10-13 17:00:00'),
(92, 11, 27, 'Tempat luas, cocok untuk acara kecil.', 4, '2024-10-13 18:20:00'),
(93, 12, 27, 'Musiknya terlalu keras, kurang nyaman.', 2, '2024-10-13 18:30:00'),
(96, 6, 27, 'Tempat bagus, tapi Wi-Fi sering lemot.', 4, '2024-10-13 19:00:00'),
(97, 7, 30, 'Harga terlalu mahal untuk kualitas.', 1, '2024-10-13 19:20:00'),
(98, 10, 30, 'Suasananya cozy, tapi kurang bersih.', 3, '2024-10-13 19:30:00'),
(99, 11, 30, 'Pelayanannya ramah, suasana enak.', 4, '2024-10-13 19:40:00'),
(100, 12, 30, 'Tempatnya agak sempit, sering penuh.', 2, '2024-10-13 19:50:00'),
(101, 15, 30, 'Wi-Fi cepat, cocok untuk kerja.', 5, '2024-10-13 20:00:00'),
(102, 6, 2, 'Tempatnya nyaman, tapi sedikit ramai.', 4, '2023-09-15 14:30:00'),
(103, 7, 3, 'Minuman enak, tapi kursi kurang nyaman.', 3, '2023-09-20 16:45:00'),
(104, 10, 4, 'Sangat cozy untuk bekerja, wifi cepat.', 5, '2023-09-25 11:20:00'),
(105, 11, 37, 'Harga terjangkau, cocok untuk nongkrong.', 4, '2023-10-01 09:00:00'),
(106, 12, 7, 'Kafe bagus, tapi parkirnya susah.', 3, '2023-10-05 18:10:00'),
(107, 15, 15, 'Tempat strategis, tapi pelayanannya lambat.', 2, '2023-10-10 20:35:00'),
(108, 30, 24, 'Dekorasi unik, makanan biasa saja.', 3, '2023-09-30 13:55:00'),
(109, 6, 38, 'Pelayanan ramah, makanan cepat saji.', 4, '2023-10-03 17:40:00'),
(110, 7, 27, 'Kafenya bagus untuk kumpul keluarga. Pilihan menunya sangat beragam, dari makanan ringan hingga makanan berat. Pelayanan juga cepat dan stafnya ramah.', 5, '2023-10-07 12:00:00'),
(111, 10, 30, 'Tempat tenang, tapi agak jauh dari pusat kota.', 4, '2023-09-27 15:15:00'),
(112, 12, 2, 'Tempat asik, tapi harga makanan terlalu mahal.', 3, '2023-09-18 13:50:00'),
(113, 15, 3, 'Musik terlalu keras, tapi makanannya enak.', 4, '2023-09-22 19:00:00'),
(114, 30, 4, 'Kafe bagus, cocok untuk bekerja atau belajar.', 5, '2023-09-26 09:30:00'),
(115, 6, 37, 'Sangat recommended, tempatnya luas.', 5, '2023-10-02 14:15:00'),
(116, 7, 7, 'Kebersihan kurang terjaga, tapi suasananya enak.', 2, '2023-10-06 11:00:00'),
(117, 10, 15, 'Tempat nyaman, harga oke.', 4, '2023-10-08 12:30:00'),
(118, 11, 24, 'Kafe kecil tapi cozy. Pelayanannya ramah.', 4, '2023-10-12 08:45:00'),
(120, 15, 27, 'Tempat cukup strategis, pilihan makanan beragam. Namun, parkirannya kurang luas sehingga sedikit merepotkan jika datang saat ramai.', 4, '2023-10-04 17:50:00'),
(121, 30, 30, 'Makanannya enak, tempat duduk nyaman.', 5, '2023-09-29 14:20:00'),
(122, 6, 2, 'Pelayanannya cepat, tempat bersih.', 4, '2023-09-21 10:10:00'),
(123, 7, 3, 'Minuman kopi enak, tapi kue terlalu manis.', 3, '2023-09-25 17:00:00'),
(124, 10, 4, 'Kafe dengan pemandangan bagus, sangat direkomendasikan.', 5, '2023-09-23 18:30:00'),
(125, 11, 37, 'Harga mahal untuk makanan yang standar.', 2, '2023-10-09 09:20:00'),
(126, 12, 7, 'Tempat nongkrong asik, tapi terlalu ramai saat weekend.', 3, '2023-10-07 13:00:00'),
(127, 15, 15, 'Dekorasi kafe unik, tapi makanan kurang enak.', 2, '2023-10-03 20:10:00'),
(128, 30, 24, 'Kafe kekinian, cocok untuk foto-foto.', 4, '2023-09-30 10:45:00'),
(129, 6, 38, 'Tempat duduk kurang nyaman untuk waktu lama.', 3, '2023-10-05 15:30:00'),
(130, 7, 27, 'Kafe dengan suasana nyaman, pilihan menunya sangat beragam dan enak. Parkirnya cukup luas sehingga nyaman untuk datang bersama keluarga.', 5, '2023-10-08 18:20:00'),
(131, 10, 30, 'Kafe kecil, tapi cozy. Harganya terjangkau.', 4, '2023-09-24 11:15:00'),
(132, 7, 5, 'test', 5, '2024-10-13 22:23:33'),
(133, 7, 5, 'test 2', 5, '2024-10-14 11:53:57'),
(134, 7, 24, 'test 3', 5, '2024-10-15 12:28:27'),
(135, 7, 36, 'test', 5, '2024-10-24 02:54:18');

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
('Gung Nanda', 6, 'gungbisma2345@gmail.com', '$2a$10$4ck0zcmAAOj9JHh2DXySkeO7oLPuEgPVDzsQQE1oPNS46c8iOo3xK', 'Guide', 'zephyrus', '376749', 1),
('Gung Nanda', 7, 'gn.nanda0@gmail.com', '$2a$10$nxNDzgZn7AXTqSpN.riZze1ZEmZ.DGOH0ziEj6VvVQsE7zo6CUZFu', 'Admin', 'Zayuran', '839597', 1),
('Adi dharma', 10, 'adidharma@gmail.com', '$2a$10$diUtDpsnX1jkoWL6sAhppeKDbI4lrCvNcqHtO5QQ4KMxw/OeMYrly', 'User', 'Adidoy', NULL, 1),
('Kanha', 11, 'Kanhamahesyogi@gmail.com', '$2a$10$U9dNKQUbxvqoXA9CGQstP.n8r1Dhl0czmfquxhHljauOqPcUl48ci', 'User', 'Kanha', NULL, 1),
('Cokde', 12, 'cokde@gmail.com', '$2a$10$bQ8Wm3Si.DPifdf2UQir3ejZ0DBiwAM4h3f9f.7nbhpC8Z/s4oQ6G', 'Admin', 'Gmoons', NULL, 1),
('nanda', 15, 'gungnands@gmail.com', '$2a$10$C6u9MlbJojKe1hgREWeb.ej.o1lZnuvRMGFU4JWc51FmiESDepOYy', 'User', 'nanda1234', '599642', 1),
('minusa', 30, 'minusa626@gmail.com', '$2a$10$yZBwumIhaTROIn9u7dJw6.ODhVpA7BfHMuRizcrCgFG3DDYdWkr.2', 'User', 'minusa', '166259', 1);

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
-- Indeks untuk tabel `report_reviews`
--
ALTER TABLE `report_reviews`
  ADD PRIMARY KEY (`Id_Report`);

--
-- Indeks untuk tabel `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`Id_Review`);

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
  MODIFY `Id_Contact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `favorite`
--
ALTER TABLE `favorite`
  MODIFY `Id_Favorite` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT untuk tabel `places`
--
ALTER TABLE `places`
  MODIFY `Id_Places` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT untuk tabel `registerguide`
--
ALTER TABLE `registerguide`
  MODIFY `Id_Register` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `report_reviews`
--
ALTER TABLE `report_reviews`
  MODIFY `Id_Report` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `review`
--
ALTER TABLE `review`
  MODIFY `Id_Review` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `Id_User` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

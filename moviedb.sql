-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 11. 18:27
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `moviedb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `movies`
--

CREATE TABLE `movies` (
  `Id` int(11) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Director` varchar(100) DEFAULT NULL,
  `Genre` varchar(50) DEFAULT NULL,
  `ReleaseYear` int(11) DEFAULT NULL,
  `Rating` decimal(3,1) DEFAULT NULL CHECK (`Rating` >= 1 and `Rating` <= 10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `movies`
--

INSERT INTO `movies` (`Id`, `Title`, `Director`, `Genre`, `ReleaseYear`, `Rating`) VALUES
(1, 'Inception', 'Christopher Nolan', 'Sci-Fi', 2000, 9.8),
(2, 'The Shawshank Redemption', 'Frank Darabont', 'Dráma', 1994, 9.3),
(3, 'The Godfather', 'Francis Ford Coppola', 'Krimi', 1972, 9.2),
(10, 'A remény rabjai', 'Frank Darabont', 'Dráma', 1994, 9.3),
(11, 'Forrest Gump', 'Robert Zemeckis', 'Dráma', 1994, 8.8),
(12, 'A keresztapa', 'Francis Ford Coppola', 'Bűnügyi', 1972, 9.2),
(13, 'A sötét lovag', 'Christopher Nolan', 'Akció', 2008, 9.0),
(14, '12 dühös ember', 'Sidney Lumet', 'Dráma', 1957, 9.0),
(15, 'Schindler listája', 'Steven Spielberg', 'Történelmi', 1993, 8.9),
(16, 'Pulp Fiction', 'Quentin Tarantino', 'Bűnügyi', 1994, 8.9),
(17, 'A Gyűrűk Ura: A király visszatér', 'Peter Jackson', 'Fantasy', 2003, 8.9),
(18, 'Star Wars: Birodalom visszavág', 'Irvin Kershner', 'Sci-fi', 1980, 8.7),
(19, 'Harcosok klubja', 'David Fincher', 'Dráma', 1999, 8.8),
(20, 'Eredet', 'Christopher Nolan', 'Sci-fi', 2010, 8.8),
(21, 'Goodfellas', 'Martin Scorsese', 'Bűnügyi', 1990, 8.7),
(22, 'Mátrix', 'Lana Wachowski, Lilly Wachowski', 'Sci-fi', 1999, 8.7),
(23, 'Gladiátor', 'Ridley Scott', 'Történelmi', 2000, 8.5),
(24, 'Titanic', 'James Cameron', 'Romantikus', 1997, 7.8),
(25, 'Száll a kakukk fészkére', 'Miloš Forman', 'Dráma', 1975, 8.7),
(26, 'A hetedik pecsét', 'Ingmar Bergman', 'Dráma', 1957, 8.2),
(27, 'A szoba', 'Tommy Wiseau', 'Dráma', 2003, 3.7),
(28, 'Szárnyas fejvadász', 'Ridley Scott', 'Sci-fi', 1982, 8.1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`Id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `movies`
--
ALTER TABLE `movies`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

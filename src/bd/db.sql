/******************** Final v0.1 ***************************/

-- base de datos
CREATE DATABASE IF NOT EXISTS `database_crm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `database_crm`;


-- USUARIO

create user 'administradorInformatica'@'localhost' identified by '#21$epImH3r3';

GRANT ALL PRIVILEGES ON  database_crm.* to 'adminInf'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES; 

show grants for adminInf@LOCALHOST;

-- tablas 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


DROP TABLE IF EXISTS `empleados`;
CREATE TABLE `empleados` (
  `usuario` varchar(15) NOT NULL,
  `id` int(6) NOT NULL,
  `foto` varchar(200) DEFAULT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellidos` varchar(40) DEFAULT NULL,
  `edad` int(2) DEFAULT NULL,
  `correo` varchar(40) NOT NULL,
  `sede` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `prospectos`;
CREATE TABLE `prospectos` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `apellidos` varchar(30) DEFAULT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `correo` varchar(20) DEFAULT NULL,
  `fase` varchar(20) DEFAULT NULL,
  `origen` varchar(20) DEFAULT NULL,
  `motivo` varchar(100) DEFAULT NULL,
  `comentarios` text DEFAULT NULL,
  `fechaAsignacion` datetime DEFAULT NULL,
  `vendedorAsignado` varchar(15) NOT NULL,
  `asignadoPor` varchar(15) DEFAULT NULL,
  `fechaReasignacion` datetime DEFAULT NULL,
  `reasigno` varchar(15) DEFAULT NULL,
  PRIMARY KEY(id, vendedorAsignado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


ALTER TABLE `empleados`
  ADD PRIMARY KEY (`usuario`,`id`);

ALTER TABLE `prospectos`
  ADD PRIMARY KEY (`nombreUsuario`,`id`);


ALTER TABLE `prospectos`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`vendedorAsignado`) REFERENCES `empleados` (`usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
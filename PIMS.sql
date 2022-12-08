CREATE DATABASE  IF NOT EXISTS `PIMS` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `PIMS`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Database: PIMS
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.36-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Patients`
--

DROP TABLE IF EXISTS `Patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patients` (
  `lastName` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `homePhone` varchar(255) DEFAULT NULL,
  `workPhone` varchar(255) DEFAULT NULL,
  `emergencyContactPhone_1` varchar(255) DEFAULT NULL,
  `emergencyContactPhone_2` varchar(255) DEFAULT NULL,
  `dateOfAdmittance` varchar(255) DEFAULT NULL,
  `timeOfAdmittance` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `familyDoctor` varchar(255) DEFAULT NULL,
  `facility` varchar(255) DEFAULT NULL,
  `floor` varchar(255) DEFAULT NULL,
  `roomNumber` varchar(255) DEFAULT NULL,
  `bedNumber` varchar(255) DEFAULT NULL,
  `dateOfDischarge` varchar(255) DEFAULT NULL,
  `timeOfDischarge` varchar(255) DEFAULT NULL,
  `doctorTreatmentNotes` varchar(255) DEFAULT NULL,
  `nurseTreatmentNotes` varchar(255) DEFAULT NULL,
  `prescriptionName` varchar(255) DEFAULT NULL,
  `prescriptionAmount` varchar(255) DEFAULT NULL,
  `prescriptionSchedule` varchar(255) DEFAULT NULL,
  `scheduledProcedures` varchar(255) DEFAULT NULL,
  `insuranceCarrier` varchar(255) DEFAULT NULL,
  `insuranceAccountNumber` varchar(255) DEFAULT NULL,
  `insuranceGroupNumber` varchar(255) DEFAULT NULL,
  `charges` varchar(255) DEFAULT NULL,
  `amounts` varchar(255) DEFAULT NULL,
  `amountPaid` varchar(255) DEFAULT NULL,
  `amountOwed` varchar(255) DEFAULT NULL,
  `amountPaidByInsurance` varchar(255) DEFAULT NULL,
  `drNotes` varchar(255) DEFAULT NULL,
  `personID` int(11) DEFAULT NULL,
  `dateOfBirth` varchar(255) DEFAULT NULL,
  `cellPhone` varchar(255) DEFAULT NULL,
  `emergencyContact1_name` varchar(255) DEFAULT NULL,
  `emergencyContact2_name` varchar(255) DEFAULT NULL,
  `listOfBillingInfo` varchar(255) DEFAULT NULL,
  `nursesNotes` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `additionalProcedures` varchar(255) DEFAULT NULL,
  `additionalNotesOnTreatment` varchar(255) DEFAULT NULL,
  `additionalPrescriptions` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patients`
--

LOCK TABLES `Patients` WRITE;
/*!40000 ALTER TABLE `Patients` DISABLE KEYS */;
INSERT INTO `Patients` VALUES ('Smith','John','M','Hartley Valley','Huntsville','AL','55806','1234567890','1234567890','2025556728','2025559568','2022-12-02','02:17','Flu','Dr. Hagler','Huntsville Hospital','9','9327','134','2022-12-15','13:18','Patient is feeling better, take prescriptions as directed','Patient temperature is down to normal levels','Oseltamivir ','30mg','Once every twelve hours','N/A','Blue Cross Blue Shield','01993939322','7385737','1232.67','1232.67','1232.67','0.00','1232.67','Patient is doing better',1,'2022-12-15','1234567889','Ethel Bush','Sally Smith','Hospital Stay - 1000.00, Medicine - 132.67','Patient will follow up two weeks after surgery',14,'Thomas','Shoulder Surgery',NULL,NULL),('Myers','Matthew','M','Cathedral View','Daphne','AL','36526','202-555-4234','202-555-6543','2025559585','2025551975','10/30/2022','20:31','Alcohol Poisoning','Dr. Smith','Thomas Hospital','3','3428','222','11/3/2022','08:51','Patient is hydrated, needs to abstain from alcohol for 72 hours','Patient blood alcohol level has normalized','N/A ','N/A','N/A','N/A','Blue Cross Blue Shield','0928377485','8377484837','4321.68','4321.68','4321.68','3956.68','365.00','Keep watch on patient blood pressure',2,'2000-12-25','256-555-2842','Joshua Schmitt','Alma Fodor','Ambulance - 3000.00, Hospital Stay - 1000.00, Medicine - 321.68','Patient is still dehydrated, needs to drink 64oz of water daily',22,'Stephen',NULL,NULL,NULL),('Wood','Melody','F','Randolph Drove','Mobile','AL','36608','2025552323','2025551222','2025559857','2025551983','9/28/2022','7:34:23 PM','Blunt Force Trauma','Dr. Bryant','Huntsville Hospital','4','4685','344','10/15/2022','11:30:00 AM','Patient is now in a cast, needs to use a wheelchair for 12 weeks','Patient bone density needs to be monitored','N/A ','N/A','N/A','Cast Removal in 16 weeks','Blue Cross Blue Shield','848484822','234929566','20000.00','20000.00','12800.00','7200.00','0.00','Patient needs to rest limbs for 12 weeks before graduating to crutches',3,'1972-12-05','2565553204','Sally Smith','Logan Parsons','Cast - 3000.00, Ambulance - 6000.00, Hospital Stay - 11000.00','Keep cast dry and cool',50,'Sally',NULL,NULL,NULL),('Smith','John','M','Redhill Court','Fairhope','AL','36526','2025558374','2025557263','9675559472','2315552937','10/26/2022','19:36','Car Wreck','Dr. Stratton','Huntsville Hospital','7','7120','114','11/1/2022','22:36','Patient is well enough to leave, needs to rest for 3 months','Patient blood levels are almost low, need to keep check on blood levels','N/A ','N/A','N/A','No Scheduled Procedures','Blue Cross Blue Shield','723485933','168473884','30154.67','30154.67','30154.67','0.00','30154.67','Patient bones are better, still weak. Need wheelchair',4,'1940-04-23','2516218830','Robert M. Sheats','Theodore C. Hughes','10000.00 - Ambulance, 20154.67','Stay in wheelchair for the next 5 months at least',82,'Gerald',NULL,NULL,NULL),('Springs','Seth','M',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,'2022-09-15',NULL,NULL,NULL,NULL,NULL,NULL,'Gary',NULL,NULL,NULL),('Strelzoff','Laurel','F',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,9,'2001-06-19',NULL,NULL,NULL,NULL,NULL,NULL,'Claire',NULL,NULL,NULL),('Keller','Sydney','F',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,10,'1998-04-04',NULL,NULL,NULL,NULL,NULL,NULL,'Morgan',NULL,NULL,NULL),('Hagler','Timothy','M',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',11,'2001-03-14',NULL,NULL,NULL,NULL,NULL,NULL,'Ray',NULL,NULL,NULL),('Stone','Benjamin','M','7106 Arch Street Place','Madison','AL','35758',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Dr. Hagler','Hagler Hospital','7','134','2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Fired',21,'2001-01-05',NULL,'Timmy Hagler',NULL,NULL,NULL,NULL,'Adam',NULL,NULL,NULL);
/*!40000 ALTER TABLE `Patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Persons`
--

DROP TABLE IF EXISTS `Persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Persons` (
  `PersonID` int(11) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Persons`
--

LOCK TABLES `Persons` WRITE;
/*!40000 ALTER TABLE `Persons` DISABLE KEYS */;
/*!40000 ALTER TABLE `Persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(32) NOT NULL,
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-07 20:33:45
CREATE DATABASE  IF NOT EXISTS `Accounts` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `Accounts`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Database: Accounts
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.36-MariaDB-0+deb10u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Accounts`
--

DROP TABLE IF EXISTS `Accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Accounts` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Accounts`
--

LOCK TABLES `Accounts` WRITE;
/*!40000 ALTER TABLE `Accounts` DISABLE KEYS */;
INSERT INTO `Accounts` VALUES ('admin','adminpassword','admin'),('drhagler','haglerpassword','doctor'),('nursestone','stonepassword','nurse'),('staffkeller','kellerpassword','staff'),('volunteerstrelzoff','strelzoffpassword','volunteer');
/*!40000 ALTER TABLE `Accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Persons`
--

DROP TABLE IF EXISTS `Persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Persons` (
  `PersonID` int(11) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Persons`
--

LOCK TABLES `Persons` WRITE;
/*!40000 ALTER TABLE `Persons` DISABLE KEYS */;
/*!40000 ALTER TABLE `Persons` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-07 20:33:45

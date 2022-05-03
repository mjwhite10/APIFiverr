-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: fiverr
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `title` varchar(100) NOT NULL,
  `info` varchar(500) NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `idStatus` int NOT NULL,
  `idCategory` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idStatus` (`idStatus`),
  KEY `idCategory` (`idCategory`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `services_ibfk_2` FOREIGN KEY (`idStatus`) REFERENCES `services_status` (`id`),
  CONSTRAINT `services_ibfk_3` FOREIGN KEY (`idCategory`) REFERENCES `services_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (2,3,'Hola 2','Hola 2','fc48bc00-a6d0-468b-90ab-c0d06f09f174.pdf',1,8,'2022-05-03 08:27:48','2022-05-03 09:11:17'),(3,6,'labore','Dignissimos nobis maxime vitae optio voluptate.','134a4b5a-0d31-4e4b-bbed-c0811ef131ad.txt',3,4,'2022-05-03 08:27:48',NULL),(4,11,'natus','Ipsa non sequi ad aliquam qui vero quia odio.','4337cf69-637c-46cd-b78f-410a414fec22.txt',1,9,'2022-05-03 08:27:48',NULL),(5,6,'sequi','Ea itaque eum corporis et.','d4229101-09ff-4ffc-9150-f4b424c95de0.txt',1,1,'2022-05-03 08:27:48',NULL),(6,2,'Hola 2','Hola 2','2288cb87-8f38-4432-b47c-403e302f8e1e.pdf',1,8,'2022-05-03 08:57:27','2022-05-03 08:59:00');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_categories`
--

DROP TABLE IF EXISTS `services_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_categories`
--

LOCK TABLES `services_categories` WRITE;
/*!40000 ALTER TABLE `services_categories` DISABLE KEYS */;
INSERT INTO `services_categories` VALUES (1,'Graphic arts and design'),(2,'Digital marketing'),(3,'Writing and translation'),(4,'Video and animation'),(5,'Music and sound'),(6,'Programming and technology'),(7,'Business'),(8,'Lifestyle'),(9,'Trends');
/*!40000 ALTER TABLE `services_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_comments`
--

DROP TABLE IF EXISTS `services_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(280) NOT NULL,
  `idUser` int NOT NULL,
  `idService` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idService` (`idService`),
  CONSTRAINT `services_comments_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`),
  CONSTRAINT `services_comments_ibfk_2` FOREIGN KEY (`idService`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_comments`
--

LOCK TABLES `services_comments` WRITE;
/*!40000 ALTER TABLE `services_comments` DISABLE KEYS */;
INSERT INTO `services_comments` VALUES (16,'Ratione velit error veniam numquam in.',11,2,'2022-05-03 08:27:48',NULL),(17,'Tenetur consequuntur sint.',11,2,'2022-05-03 08:27:48',NULL),(18,'Labore est aut illum laborum est.',3,2,'2022-05-03 08:27:48',NULL),(19,'Ipsum ut asperiores harum exercitationem magni similique facere ex.',5,2,'2022-05-03 08:27:48',NULL),(20,'Fugiat qui animi quas laudantium.',6,2,'2022-05-03 08:27:48',NULL),(21,'Earum qui nobis pariatur adipisci.',4,2,'2022-05-03 08:27:48',NULL),(22,'Non id exercitationem a consequatur illum dolores.',1,2,'2022-05-03 08:27:48',NULL),(23,'Possimus pariatur rerum cumque sint sunt.',5,2,'2022-05-03 08:27:48',NULL),(24,'Quasi eos quis voluptate libero temporibus sed nobis deserunt blanditiis.',9,2,'2022-05-03 08:27:48',NULL),(25,'Laborum voluptate voluptas.',6,2,'2022-05-03 08:27:48',NULL),(26,'Id odio tempora ducimus itaque.',4,2,'2022-05-03 08:27:48',NULL),(27,'Nam dolores rerum occaecati ea.',8,2,'2022-05-03 08:27:48',NULL),(28,'Sunt id iste.',12,2,'2022-05-03 08:27:48',NULL),(29,'Deserunt fuga enim officiis eaque inventore totam quos.',9,2,'2022-05-03 08:27:48',NULL),(30,'Distinctio esse sit amet quae repellendus eum aut eum ea.',9,2,'2022-05-03 08:27:48',NULL),(32,'Occaecati provident doloribus.',10,3,'2022-05-03 08:27:48',NULL),(33,'Perferendis at ut dolorem molestiae blanditiis distinctio consequatur quam dolorem.',10,3,'2022-05-03 08:27:48',NULL),(34,'Earum voluptates maiores eum.',2,3,'2022-05-03 08:27:48',NULL),(35,'Cum vero distinctio et amet.',3,3,'2022-05-03 08:27:48',NULL),(36,'Qui maiores aliquid modi suscipit.',4,3,'2022-05-03 08:27:48',NULL),(37,'Molestiae adipisci eos amet consequuntur sed non magni consequuntur.',8,3,'2022-05-03 08:27:48',NULL),(38,'Et ex et.',9,3,'2022-05-03 08:27:48',NULL),(39,'Tempore sint sint sed dicta et non sint possimus.',12,3,'2022-05-03 08:27:48',NULL),(40,'Aut rerum ea eos porro est aliquam sunt sit.',10,3,'2022-05-03 08:27:48',NULL),(41,'Aut quia voluptatum eum doloribus fugiat facere doloribus quia.',5,3,'2022-05-03 08:27:48',NULL),(42,'Quia voluptatem eos aliquid voluptatem eius debitis voluptas.',3,3,'2022-05-03 08:27:48',NULL),(43,'Dolorum eveniet eos quia ea blanditiis quo iusto eos deserunt.',12,3,'2022-05-03 08:27:48',NULL),(44,'Ducimus et repellat sunt exercitationem mollitia dicta aut.',11,3,'2022-05-03 08:27:48',NULL),(45,'Qui alias assumenda.',8,3,'2022-05-03 08:27:48',NULL),(46,'Ea labore quam.',10,4,'2022-05-03 08:27:48',NULL),(47,'Mollitia aut similique ut nemo quis earum ea quidem nam.',8,4,'2022-05-03 08:27:48',NULL),(48,'Et vel dolores suscipit eum qui aliquid voluptatem molestiae esse.',11,4,'2022-05-03 08:27:48',NULL),(49,'Temporibus est incidunt esse omnis aut.',8,4,'2022-05-03 08:27:48',NULL),(50,'Vel cumque commodi eos.',5,4,'2022-05-03 08:27:48',NULL),(51,'Dolorem blanditiis quam non cumque odit eius aliquid nihil et.',7,4,'2022-05-03 08:27:48',NULL),(52,'Est qui culpa.',5,4,'2022-05-03 08:27:48',NULL),(53,'Velit excepturi in accusantium occaecati rerum ipsum consequatur enim.',8,4,'2022-05-03 08:27:48',NULL),(54,'Veniam qui aut fuga veniam enim.',7,4,'2022-05-03 08:27:48',NULL),(55,'Fugiat repudiandae non.',9,4,'2022-05-03 08:27:48',NULL),(56,'Facere aut accusantium est fugiat ad rerum qui accusantium.',9,4,'2022-05-03 08:27:48',NULL),(57,'Quo voluptas laboriosam numquam velit cum aspernatur.',1,4,'2022-05-03 08:27:48',NULL),(58,'Atque velit laborum aut veritatis cum.',6,4,'2022-05-03 08:27:48',NULL),(59,'Qui sunt est.',8,4,'2022-05-03 08:27:48',NULL),(60,'Illo dolor tempora est quas eaque ab et.',4,4,'2022-05-03 08:27:48',NULL),(61,'Sapiente blanditiis assumenda aspernatur magni incidunt dolores.',10,5,'2022-05-03 08:27:48',NULL),(62,'Distinctio aperiam sit ipsum.',8,5,'2022-05-03 08:27:48',NULL),(63,'Et perspiciatis aut magnam.',9,5,'2022-05-03 08:27:48',NULL),(64,'Eligendi sed architecto voluptatem hic.',9,5,'2022-05-03 08:27:48',NULL),(65,'Et blanditiis eligendi accusantium aut unde eaque.',2,5,'2022-05-03 08:27:48',NULL),(66,'Asperiores repudiandae unde.',11,5,'2022-05-03 08:27:48',NULL),(67,'Occaecati quis occaecati velit mollitia beatae tempore vel.',6,5,'2022-05-03 08:27:48',NULL),(68,'Quia aliquid aut aut quaerat.',2,5,'2022-05-03 08:27:48',NULL),(69,'Alias illum iusto.',8,5,'2022-05-03 08:27:48',NULL),(70,'Voluptas totam dolor eius porro est sint repellendus facere.',9,5,'2022-05-03 08:27:48',NULL),(71,'Autem deserunt blanditiis.',9,5,'2022-05-03 08:27:48',NULL),(72,'Quis dolor molestias qui tenetur distinctio reiciendis.',10,5,'2022-05-03 08:27:48',NULL),(73,'Eveniet soluta et autem fugit eos quisquam ducimus perferendis est.',1,5,'2022-05-03 08:27:48',NULL),(74,'Voluptas enim nostrum quisquam nulla necessitatibus dignissimos quis itaque qui.',1,5,'2022-05-03 08:27:48',NULL),(75,'Illum ducimus occaecati suscipit dolores nisi.',2,5,'2022-05-03 08:27:48',NULL),(76,'Hola mundo mundo MUNDO',2,2,'2022-05-03 09:07:18','2022-05-03 09:11:01');
/*!40000 ALTER TABLE `services_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_solution`
--

DROP TABLE IF EXISTS `services_solution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_solution` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idService` int NOT NULL,
  `idUser` int NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `startedAt` datetime NOT NULL,
  `finishedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idService` (`idService`),
  KEY `idUser` (`idUser`),
  CONSTRAINT `services_solution_ibfk_1` FOREIGN KEY (`idService`) REFERENCES `services` (`id`),
  CONSTRAINT `services_solution_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_solution`
--

LOCK TABLES `services_solution` WRITE;
/*!40000 ALTER TABLE `services_solution` DISABLE KEYS */;
INSERT INTO `services_solution` VALUES (1,3,14,'35eb7e22-ba33-4e5f-b92c-8690fd87afcb.pdf','2022-05-03 09:01:24','2022-05-03 09:05:48');
/*!40000 ALTER TABLE `services_solution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_status`
--

DROP TABLE IF EXISTS `services_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_status`
--

LOCK TABLES `services_status` WRITE;
/*!40000 ALTER TABLE `services_status` DISABLE KEYS */;
INSERT INTO `services_status` VALUES (1,'Unassigned'),(2,'Assigned'),(3,'Completed');
/*!40000 ALTER TABLE `services_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` tinytext NOT NULL,
  `role` enum('normal','admin') NOT NULL DEFAULT 'normal',
  `name` tinytext NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `avatar` tinytext,
  `createdAt` datetime NOT NULL,
  `modifiedAt` datetime DEFAULT NULL,
  `lastAuthUpdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'luna@hackaboss.com','$2b$08$p3tQvsqUD0DkfJ5Xjj53ceQkzc/yS0SnmyDC.xanCVnt4wyF35Uha','admin','Luna','Lorem ipsum','60003463-e2e6-4a6d-86c6-8ee0eb1ebccd.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(2,'manu@hackaboss.com','$2b$08$p3tQvsqUD0DkfJ5Xjj53ceQkzc/yS0SnmyDC.xanCVnt4wyF35Uha','admin','Manu','Lorem ipsum','a8a3a0f1-e301-4bf1-b0e0-338b65772cf5.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(3,'Octavio.Alanis73@hotmail.com','$2b$08$5KJHK00NiS/V4c7vXVNVPO691JTq7gN1exjifhmjAJj9Ihni.0L.i','normal','Salvador Gutiérrez','Quis illum dicta doloremque aspernatur quam ipsum ut nisi. Ut et consequatur iusto. Sequi quos est dolorum maiores eligendi sint. Nostrum voluptas aspernatur. Odit non quos.','660e420b-e56c-4e3c-b9e1-11ec91719ca2.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(4,'Norma_Ros@yahoo.com','$2b$08$D.q8q8pMEdtqSDumtrU95e/PDLBOvPJGb5zswM73XVderFgfqDysm','normal','Manuel Rosario MD','Sed est quisquam ducimus. Modi perspiciatis repellat nam fuga ut error eaque sed quos. Tempora voluptatum sed eveniet aut consequatur.','603331b7-edfc-4f79-a70e-99f3661bc077.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(5,'Javier.Palomino@hotmail.com','$2b$08$aqAG9BfHNC0pksP3aV0sEemkcPVUlSIQXU9wrNn9pLteOtptaFKaC','normal','Laura Cornejo','Pariatur recusandae et suscipit harum. Facilis ut voluptas iusto optio eligendi non. Est ad quis voluptatem. Vero corporis perspiciatis cumque. Suscipit aspernatur animi aut odit iure laudantium. Qui odit voluptas fugit rerum libero ut nesciunt et officiis.','dea7d81f-6692-4572-982b-824347d0f351.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(6,'JulioCsar29@gmail.com','$2b$08$pbHVlJIbm2bLUemyWigTDefjA/qIClBLb8nU1iq4lakXQCsAXWPtm','normal','Laura Moya','Non explicabo corporis ea minima dolores. Porro maxime itaque hic aut qui iure hic ullam.','e67d7f8a-893f-4ec2-96fd-57489187832d.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(7,'Miguelngel65@hotmail.com','$2b$08$V6Z1vDjmW.c/vJ5W0t0xc.4J/xKk12qF8ypZPEpuv/TXZRCKKdg3W','normal','Rubén Ávila','Exercitationem sit dicta. Est ut aut doloremque temporibus dolores.','4b8221dd-27ae-4c95-a962-162f1b2badc0.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(8,'Eloisa.Quesada@yahoo.com','$2b$08$xBt9kRr.QmvLrVDgTJhuleB3AdD6KzK.IZpnsKEwJyGjgD4chWJFG','normal','Sergi Carvajal','Ex tempora laboriosam aliquid esse corrupti et. Doloribus iusto quo ut earum magnam aspernatur. Nihil nobis iste dicta autem sed. Error nesciunt aliquid tempore.','ecf8a5de-2835-4b35-992c-0e8eac191895.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(9,'AnaLuisa62@gmail.com','$2b$08$0CeNxGKkKZD9pqBnxW.2SeafBHO6Kl2MKGs066Zv0rE8.gkuaXvI2','normal','Matilde Valverde','Nam vitae magni aut inventore. Sint reiciendis facilis rem eos vel laudantium itaque. Aliquam alias aliquid sunt inventore hic neque qui aliquid. Inventore id enim. Sunt alias amet voluptate et nostrum minima sit. Saepe quaerat possimus.','aa0fae5c-3b84-481a-8c0b-649a4e98a584.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(10,'Ral78@gmail.com','$2b$08$GxY8rW2LBjCnz6EkIDncUuKZFiQOFuwBXgtQF5MRQzMgUETp68.Wm','normal','Sta. Jorge Fonseca','Et eum aut debitis aut architecto veritatis distinctio deleniti. Qui cupiditate omnis aut distinctio dolor in ex temporibus omnis. At harum non dolorum molestiae et id et. Non voluptatem debitis aut et voluptas numquam eos earum. Ad voluptatibus voluptates mollitia facere ipsa. Ut odio consequatur non in.','998b2dc1-b75c-4e27-b427-31cdb7617366.jpg','2022-05-03 08:27:47','2022-05-03 08:27:47','2022-05-03 08:27:47'),(11,'Rodrigo.Abeyta@hotmail.com','$2b$08$UDXuCct/D3AwFcIDb7VnHO9c3V8ew082MA.658Gl9RYw.IMkpKXNm','normal','Sergi Otero','Ut commodi aut velit minima. Incidunt vel vitae qui quia ullam consequatur nihil animi aliquam. Nihil est quod ipsum reprehenderit eius quia nihil. Dolorem molestiae necessitatibus distinctio eius sunt ipsam quia suscipit dolorum.','4a6deaf7-0045-4b3f-be68-cb7b93768667.jpg','2022-05-03 08:27:48','2022-05-03 08:27:48','2022-05-03 08:27:48'),(12,'Rodrigo84@gmail.com','$2b$08$tVESFRyiu1Fofs4L1GOHi.dK49SDvl6dFaTuuqKk4iQtc1Kc94sri','normal','Lorena Argüello','Et velit voluptate consectetur iure amet et. Doloribus maxime ut.','06f9f169-41a8-4af0-b112-3c2373bf5814.jpg','2022-05-03 08:27:48','2022-05-03 08:27:48','2022-05-03 08:27:48'),(14,'manublanco@hackaboss.com','$2b$08$ZB3uUfjAjAx73WaYb2Gm3.8nB8KuYO9GZNBdUuDjWw6Aylf2JuiL2','normal','Manu',NULL,NULL,'2022-05-03 09:00:23',NULL,'2022-05-03 09:00:23');
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

-- Dump completed on 2022-05-03 11:52:27

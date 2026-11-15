
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `sport_shoes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `sport_shoes`;
DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `description` varchar(150) NOT NULL,
  `glyph` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'دویدن','برای ریتم‌های تازه','↗'),(2,'تمرین','پایداری در هر تکرار','⌁'),(3,'روزمره','راحتی از صبح تا شب','◌'),(4,'طبیعت‌گردی','آماده راه‌های نرفته','⌖');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `features` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `icon` varchar(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `features` WRITE;
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
INSERT INTO `features` VALUES (1,'↗','ارسال سریع','ارسال به سراسر ایران'),(2,'↺','بازگشت آسان','۷ روز برای تصمیم بهتر'),(3,'✓','اصالت کالا','انتخاب‌شده با دقت');
/*!40000 ALTER TABLE `features` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(120) NOT NULL,
  `name` varchar(150) NOT NULL,
  `brand` varchar(80) NOT NULL,
  `category` varchar(80) NOT NULL,
  `price` int(10) unsigned NOT NULL,
  `old_price` int(10) unsigned DEFAULT NULL,
  `price_label` varchar(80) NOT NULL,
  `old_price_label` varchar(80) DEFAULT NULL,
  `stock` int(10) unsigned NOT NULL DEFAULT 0,
  `tag` varchar(80) DEFAULT NULL,
  `image` varchar(500) NOT NULL,
  `color` varchar(80) NOT NULL,
  `sizes` varchar(120) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'velocity-pro','Velocity Pro 2','Nike','دویدن',4890000,5690000,'۴٬۸۹۰٬۰۰۰ تومان','۵٬۶۹۰٬۰۰۰ تومان',18,'پرفروش','https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=88','لیمویی / سفید','39,40,41,42,43,44','کفش سبک و واکنش‌گرا برای تمرین‌های روزانه و مسیرهای طولانی. رویه مشبک تنفس‌پذیر و زیره فومی نرم، هر قدم را روان‌تر می‌کند.'),(2,'court-classic','Court Classic','Adidas','روزمره',3650000,NULL,'۳٬۶۵۰٬۰۰۰ تومان',NULL,12,'تازه رسیده','https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=88','قهوه‌ای','40,41,42,43,44','سیلوئت کلاسیک با رویه چرمی نرم؛ مناسب استفاده روزانه، رفت‌وآمد شهری و استایل‌های ساده.'),(3,'air-dash','Air Dash 90','Nike','دویدن',5290000,5990000,'۵٬۲۹۰٬۰۰۰ تومان','۵٬۹۹۰٬۰۰۰ تومان',7,'تخفیف ویژه','https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=88','مشکی','39,40,41,42,43','ساختار سبک و زیره مقاوم برای دویدن شهری؛ طراحی جمع‌وجور و حمایت مناسب از پا.'),(4,'trail-motion','Trail Motion XT','Salomon','طبیعت‌گردی',6120000,NULL,'۶٬۱۲۰٬۰۰۰ تومان',NULL,9,'موجود','https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=88','سرمه‌ای','40,41,42,43,44,45','چسبندگی مطمئن و محافظت بیشتر برای مسیرهای ناهموار؛ انتخابی قابل اعتماد برای طبیعت‌گردی.'),(5,'urban-flex','Urban Flex','Puma','روزمره',3190000,3790000,'۳٬۱۹۰٬۰۰۰ تومان','۳٬۷۹۰٬۰۰۰ تومان',23,'پرفروش','https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=88','سفید','38,39,40,41,42,43','راحتی تمام‌روز با فرم مینیمال و زیره منعطف؛ برای روزهای شلوغ و قدم‌زدن‌های طولانی.'),(6,'court-ace','Court Ace Indoor','Asics','تمرین',4380000,NULL,'۴٬۳۸۰٬۰۰۰ تومان',NULL,5,'موجودی محدود','https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=88','نارنجی / سفید','39,40,41,42,43','پایداری جانبی و کف غیرلغزنده برای تمرین و بازی داخل سالن.'),(7,'stride-lite','Stride Lite','New Balance','دویدن',4590000,NULL,'۴٬۵۹۰٬۰۰۰ تومان',NULL,14,'تازه رسیده','https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=88','سفید / طوسی','39,40,41,42,43,44','ترکیب بالشتک‌گذاری نرم و پشتیبانی متعادل برای تمرین‌های منظم.'),(8,'street-low','Street Low Canvas','Converse','روزمره',2780000,3090000,'۲٬۷۸۰٬۰۰۰ تومان','۳٬۰۹۰٬۰۰۰ تومان',0,'ناموجود','https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=88','سرمه‌ای','39,40,41,42,43','کفش روزمره سبک با فرم آشنای خیابانی؛ مناسب ترکیب با استایل‌های کژوال.'),(9,'run-essentials','Run Essentials','Reebok','تمرین',3420000,NULL,'۳٬۴۲۰٬۰۰۰ تومان',NULL,11,'موجود','https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=88','سفید','38,39,40,41,42,43,44','کفشی کاربردی برای گرم‌کردن، تمرین سبک و استفاده روزمره.');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'امیر موسوی نژاد','amir','$2y$10$gq2/uErU5Pp2FuVkCZlFjOFZkrabQsspRNgcx7WMmtbPuYlDx81XC','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'),(2,'سارا احمدی','sara','$2y$10$gq2/uErU5Pp2FuVkCZlFjOFZkrabQsspRNgcx7WMmtbPuYlDx81XC','https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80');
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


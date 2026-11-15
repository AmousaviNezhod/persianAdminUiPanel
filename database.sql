CREATE DATABASE IF NOT EXISTS sport_shoes CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sport_shoes;
SET NAMES utf8mb4;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    brand VARCHAR(80) NOT NULL,
    category VARCHAR(80) NOT NULL,
    price INT UNSIGNED NOT NULL,
    old_price INT UNSIGNED NULL,
    price_label VARCHAR(80) NOT NULL,
    old_price_label VARCHAR(80) NULL,
    stock INT UNSIGNED NOT NULL DEFAULT 0,
    tag VARCHAR(80) NULL,
    image VARCHAR(500) NOT NULL,
    color VARCHAR(80) NOT NULL,
    sizes VARCHAR(120) NOT NULL,
    description TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categories (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description VARCHAR(150) NOT NULL,
    glyph VARCHAR(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE features (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(10) NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(60) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    image VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO products (slug, name, brand, category, price, old_price, price_label, old_price_label, stock, tag, image, color, sizes, description) VALUES
('velocity-pro', 'Velocity Pro 2', 'Nike', 'دویدن', 4890000, 5690000, '۴٬۸۹۰٬۰۰۰ تومان', '۵٬۶۹۰٬۰۰۰ تومان', 18, 'پرفروش', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=88', 'لیمویی / سفید', '39,40,41,42,43,44', 'کفش سبک و واکنش‌گرا برای تمرین‌های روزانه و مسیرهای طولانی. رویه مشبک تنفس‌پذیر و زیره فومی نرم، هر قدم را روان‌تر می‌کند.'),
('court-classic', 'Court Classic', 'Adidas', 'روزمره', 3650000, NULL, '۳٬۶۵۰٬۰۰۰ تومان', NULL, 12, 'تازه رسیده', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=88', 'قهوه‌ای', '40,41,42,43,44', 'سیلوئت کلاسیک با رویه چرمی نرم؛ مناسب استفاده روزانه، رفت‌وآمد شهری و استایل‌های ساده.'),
('air-dash', 'Air Dash 90', 'Nike', 'دویدن', 5290000, 5990000, '۵٬۲۹۰٬۰۰۰ تومان', '۵٬۹۹۰٬۰۰۰ تومان', 7, 'تخفیف ویژه', 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=88', 'مشکی', '39,40,41,42,43', 'ساختار سبک و زیره مقاوم برای دویدن شهری؛ طراحی جمع‌وجور و حمایت مناسب از پا.'),
('trail-motion', 'Trail Motion XT', 'Salomon', 'طبیعت‌گردی', 6120000, NULL, '۶٬۱۲۰٬۰۰۰ تومان', NULL, 9, 'موجود', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=88', 'سرمه‌ای', '40,41,42,43,44,45', 'چسبندگی مطمئن و محافظت بیشتر برای مسیرهای ناهموار؛ انتخابی قابل اعتماد برای طبیعت‌گردی.'),
('urban-flex', 'Urban Flex', 'Puma', 'روزمره', 3190000, 3790000, '۳٬۱۹۰٬۰۰۰ تومان', '۳٬۷۹۰٬۰۰۰ تومان', 23, 'پرفروش', 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=88', 'سفید', '38,39,40,41,42,43', 'راحتی تمام‌روز با فرم مینیمال و زیره منعطف؛ برای روزهای شلوغ و قدم‌زدن‌های طولانی.'),
('court-ace', 'Court Ace Indoor', 'Asics', 'تمرین', 4380000, NULL, '۴٬۳۸۰٬۰۰۰ تومان', NULL, 5, 'موجودی محدود', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=88', 'نارنجی / سفید', '39,40,41,42,43', 'پایداری جانبی و کف غیرلغزنده برای تمرین و بازی داخل سالن.'),
('stride-lite', 'Stride Lite', 'New Balance', 'دویدن', 4590000, NULL, '۴٬۵۹۰٬۰۰۰ تومان', NULL, 14, 'تازه رسیده', 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=88', 'سفید / طوسی', '39,40,41,42,43,44', 'ترکیب بالشتک‌گذاری نرم و پشتیبانی متعادل برای تمرین‌های منظم.'),
('street-low', 'Street Low Canvas', 'Converse', 'روزمره', 2780000, 3090000, '۲٬۷۸۰٬۰۰۰ تومان', '۳٬۰۹۰٬۰۰۰ تومان', 0, 'ناموجود', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=88', 'سرمه‌ای', '39,40,41,42,43', 'کفش روزمره سبک با فرم آشنای خیابانی؛ مناسب ترکیب با استایل‌های کژوال.'),
('run-essentials', 'Run Essentials', 'Reebok', 'تمرین', 3420000, NULL, '۳٬۴۲۰٬۰۰۰ تومان', NULL, 11, 'موجود', 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=88', 'سفید', '38,39,40,41,42,43,44', 'کفشی کاربردی برای گرم‌کردن، تمرین سبک و استفاده روزمره.');

INSERT INTO categories (name, description, glyph) VALUES
('دویدن', 'برای ریتم‌های تازه', '↗'),
('تمرین', 'پایداری در هر تکرار', '⌁'),
('روزمره', 'راحتی از صبح تا شب', '◌'),
('طبیعت‌گردی', 'آماده راه‌های نرفته', '⌖');

INSERT INTO features (icon, title, description) VALUES
('↗', 'ارسال سریع', 'ارسال به سراسر ایران'),
('↺', 'بازگشت آسان', '۷ روز برای تصمیم بهتر'),
('✓', 'اصالت کالا', 'انتخاب‌شده با دقت');

INSERT INTO users (name, username, password, image) VALUES
('امیر موسوی نژاد', 'amir', '123456', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'),
('سارا احمدی', 'sara', '123456', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80');

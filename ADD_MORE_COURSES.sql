-- Add More Courses for Payment Testing
-- Run this in your MySQL database (learnify)

INSERT INTO courses (title, description, instructor, price, duration, level, category, image_url, created_at, updated_at) VALUES
-- Business & Professional
('Professional Writing Skills', 'Master professional writing for emails, reports, and business documents', 'Sarah Johnson', 129.00, '8 weeks', 'Intermediate', 'Business English', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400', NOW(), NOW()),
('Business Negotiation English', 'Learn negotiation tactics and business English for successful deals', 'Michael Chen', 179.00, '10 weeks', 'Advanced', 'Business English', 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400', NOW(), NOW()),
('Corporate Communication', 'Effective communication strategies for corporate environments', 'Emma Wilson', 149.00, '6 weeks', 'Intermediate', 'Business English', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400', NOW(), NOW()),

-- Exam Preparation
('TOEFL iBT Preparation', 'Complete TOEFL preparation with practice tests and strategies', 'David Martinez', 199.00, '12 weeks', 'Upper Intermediate', 'Exam Preparation', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400', NOW(), NOW()),
('Cambridge FCE Preparation', 'First Certificate in English exam preparation course', 'Lisa Anderson', 189.00, '10 weeks', 'Intermediate', 'Exam Preparation', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400', NOW(), NOW()),
('IELTS Academic Writing', 'Master IELTS Academic Writing Task 1 and Task 2', 'James Taylor', 159.00, '8 weeks', 'Upper Intermediate', 'Exam Preparation', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400', NOW(), NOW()),

-- Conversation & Speaking
('Conversational English', 'Improve your everyday English conversation skills', 'Rachel Green', 99.00, '6 weeks', 'Beginner', 'Grammar', 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400', NOW(), NOW()),
('Advanced Speaking Skills', 'Develop fluency and confidence in advanced conversations', 'Tom Harris', 139.00, '8 weeks', 'Advanced', 'Grammar', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400', NOW(), NOW()),
('Pronunciation Masterclass', 'Perfect your English pronunciation and accent', 'Sophie Brown', 119.00, '6 weeks', 'Intermediate', 'Grammar', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400', NOW(), NOW()),

-- Grammar & Writing
('English Grammar Fundamentals', 'Build a strong foundation in English grammar', 'Robert Lee', 89.00, '8 weeks', 'Beginner', 'Grammar', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', NOW(), NOW()),
('Advanced Grammar & Style', 'Master complex grammar structures and writing styles', 'Patricia White', 129.00, '10 weeks', 'Advanced', 'Grammar', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400', NOW(), NOW()),
('Creative Writing in English', 'Develop your creative writing skills in English', 'Daniel Moore', 149.00, '8 weeks', 'Intermediate', 'Grammar', 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400', NOW(), NOW()),

-- Specialized English
('Medical English', 'English for healthcare professionals and medical students', 'Dr. Jennifer Adams', 199.00, '10 weeks', 'Upper Intermediate', 'Business English', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400', NOW(), NOW()),
('Legal English', 'English for lawyers and legal professionals', 'William Clark', 219.00, '12 weeks', 'Advanced', 'Business English', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400', NOW(), NOW()),
('Technical English', 'English for engineers and technical professionals', 'Kevin Zhang', 179.00, '10 weeks', 'Intermediate', 'Business English', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400', NOW(), NOW()),

-- Travel & Culture
('English for Travel', 'Essential English for travelers and tourists', 'Maria Garcia', 79.00, '4 weeks', 'Beginner', 'Grammar', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400', NOW(), NOW()),
('American Culture & English', 'Learn American English and cultural nuances', 'John Smith', 109.00, '6 weeks', 'Intermediate', 'Grammar', 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?w=400', NOW(), NOW()),
('British English & Culture', 'Master British English and UK cultural aspects', 'Elizabeth Windsor', 109.00, '6 weeks', 'Intermediate', 'Grammar', 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400', NOW(), NOW()),

-- Kids & Teens
('English for Kids (Ages 6-10)', 'Fun and interactive English learning for children', 'Amy Peterson', 69.00, '8 weeks', 'Beginner', 'Grammar', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400', NOW(), NOW()),
('English for Teens', 'Engaging English course designed for teenagers', 'Chris Martin', 89.00, '8 weeks', 'Intermediate', 'Grammar', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400', NOW(), NOW()),

-- Academic English
('Academic English Writing', 'Write academic papers, essays, and research documents', 'Prof. Richard Davis', 169.00, '10 weeks', 'Upper Intermediate', 'Business English', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400', NOW(), NOW()),
('English for University', 'Prepare for English-speaking university environments', 'Dr. Susan Miller', 189.00, '12 weeks', 'Upper Intermediate', 'Exam Preparation', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400', NOW(), NOW());

-- Verify the courses were added
SELECT COUNT(*) as total_courses FROM courses;
SELECT id, title, price, level, category FROM courses ORDER BY id DESC LIMIT 25;

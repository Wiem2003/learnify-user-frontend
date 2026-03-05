-- Add Even More Courses for Extended Testing
-- More variety in prices and categories

INSERT INTO courses (title, description, instructor_id, price, level, language, is_active, created_at, updated_at) VALUES
-- Premium Courses ($200+)
('Executive English Leadership', 'English for C-level executives and managers', 3, 299.00, 'Advanced', 'English', 1, NOW(), NOW()),
('International Business English', 'Global business communication mastery', 3, 249.00, 'Advanced', 'English', 1, NOW(), NOW()),
('English for Entrepreneurs', 'Business English for startup founders', 3, 229.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),

-- Mid-Range Courses ($100-$199)
('English for Marketing', 'Marketing and advertising English', 3, 145.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English for Finance', 'Financial English for professionals', 3, 165.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),
('English for IT Professionals', 'Technical English for IT sector', 3, 155.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English for Sales', 'Sales and negotiation English', 3, 135.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English for Human Resources', 'HR and recruitment English', 3, 125.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English for Project Management', 'Project management terminology', 3, 175.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),

-- Budget-Friendly Courses ($50-$99)
('English Basics for Beginners', 'Start your English journey', 3, 59.00, 'Beginner', 'English', 1, NOW(), NOW()),
('English Vocabulary Builder', 'Expand your English vocabulary', 3, 69.00, 'Beginner', 'English', 1, NOW(), NOW()),
('English Listening Skills', 'Improve your listening comprehension', 3, 75.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English Reading Comprehension', 'Master reading in English', 3, 79.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English for Social Media', 'Social media English and slang', 3, 65.00, 'Beginner', 'English', 1, NOW(), NOW()),
('English for Everyday Life', 'Practical English for daily situations', 3, 55.00, 'Beginner', 'English', 1, NOW(), NOW()),

-- Specialized Courses
('English for Aviation', 'Aviation English for pilots and crew', 3, 195.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),
('English for Hospitality', 'Hotel and restaurant English', 3, 115.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English for Tourism', 'Tourism industry English', 3, 105.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English for Retail', 'Retail and customer service English', 3, 95.00, 'Beginner', 'English', 1, NOW(), NOW()),
('English for Real Estate', 'Property and real estate English', 3, 145.00, 'Intermediate', 'English', 1, NOW(), NOW()),

-- Exam Prep Variations
('TOEIC Preparation', 'Prepare for TOEIC exam', 3, 175.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('Cambridge CAE Preparation', 'Advanced English Certificate prep', 3, 209.00, 'Advanced', 'English', 1, NOW(), NOW()),
('PTE Academic Preparation', 'Pearson Test of English prep', 3, 185.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),

-- Quick Courses
('English in 30 Days', 'Intensive 30-day English course', 3, 149.00, 'Beginner', 'English', 1, NOW(), NOW()),
('Weekend English Intensive', 'Learn English in weekends', 3, 99.00, 'Beginner', 'English', 1, NOW(), NOW());

-- Verify
SELECT COUNT(*) as total_courses FROM courses;
SELECT id, title, price, level FROM courses WHERE id > 31 ORDER BY price DESC;

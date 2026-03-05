-- Add More Courses - Fixed for Your Table Structure
-- Based on your existing columns: id, title, description, instructor_id, price, level, language, is_active, created_at, updated_at

INSERT INTO courses (title, description, instructor_id, price, level, language, is_active, created_at, updated_at) VALUES
('Professional Writing Skills', 'Master professional writing for business', 3, 129.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('Business Negotiation English', 'Learn negotiation tactics and business English', 3, 179.00, 'Advanced', 'English', 1, NOW(), NOW()),
('Corporate Communication', 'Effective corporate communication strategies', 3, 149.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('TOEFL iBT Preparation', 'Complete TOEFL preparation with practice tests', 3, 199.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),
('Cambridge FCE Preparation', 'First Certificate in English exam preparation', 3, 189.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('IELTS Academic Writing', 'Master IELTS Academic Writing tasks', 3, 159.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),
('Conversational English', 'Improve your everyday conversation skills', 3, 99.00, 'Beginner', 'English', 1, NOW(), NOW()),
('Advanced Speaking Skills', 'Develop fluency and confidence in speaking', 3, 139.00, 'Advanced', 'English', 1, NOW(), NOW()),
('Pronunciation Masterclass', 'Perfect your English pronunciation', 3, 119.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English Grammar Fundamentals', 'Build a strong foundation in English grammar', 3, 89.00, 'Beginner', 'English', 1, NOW(), NOW()),
('Advanced Grammar & Style', 'Master complex grammar structures', 3, 129.00, 'Advanced', 'English', 1, NOW(), NOW()),
('Creative Writing in English', 'Develop your creative writing skills', 3, 149.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('Medical English', 'English for healthcare professionals', 3, 199.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),
('Legal English', 'English for lawyers and legal professionals', 3, 219.00, 'Advanced', 'English', 1, NOW(), NOW()),
('Technical English', 'English for engineers and technical professionals', 3, 179.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English for Travel', 'Essential English for travelers', 3, 79.00, 'Beginner', 'English', 1, NOW(), NOW()),
('American Culture & English', 'Learn American English and culture', 3, 109.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('British English & Culture', 'Master British English and UK culture', 3, 109.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('Academic English Writing', 'Write academic papers and essays', 3, 169.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),
('English for University', 'Prepare for English-speaking universities', 3, 189.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),
('Business Email Writing', 'Master professional email communication', 3, 95.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('Job Interview English', 'Prepare for English job interviews', 3, 115.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('Presentation Skills', 'Deliver confident English presentations', 3, 135.00, 'Upper Intermediate', 'English', 1, NOW(), NOW()),
('English Idioms & Expressions', 'Learn common idioms and expressions', 3, 85.00, 'Intermediate', 'English', 1, NOW(), NOW()),
('English for Customer Service', 'Customer service English skills', 3, 105.00, 'Intermediate', 'English', 1, NOW(), NOW());

-- Check the results
SELECT id, title, price, level, language FROM courses ORDER BY id DESC LIMIT 25;

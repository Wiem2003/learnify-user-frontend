-- Quick Add 20 More Courses for Testing
-- Simple version with essential fields only

INSERT INTO courses (title, description, instructor, price, duration, level, category, created_at, updated_at) VALUES
('Professional Writing Skills', 'Master professional writing', 'Sarah Johnson', 129.00, '8 weeks', 'Intermediate', 'Business English', NOW(), NOW()),
('Business Negotiation English', 'Learn negotiation tactics', 'Michael Chen', 179.00, '10 weeks', 'Advanced', 'Business English', NOW(), NOW()),
('Corporate Communication', 'Effective corporate communication', 'Emma Wilson', 149.00, '6 weeks', 'Intermediate', 'Business English', NOW(), NOW()),
('TOEFL iBT Preparation', 'Complete TOEFL preparation', 'David Martinez', 199.00, '12 weeks', 'Upper Intermediate', 'Exam Preparation', NOW(), NOW()),
('Cambridge FCE Preparation', 'First Certificate preparation', 'Lisa Anderson', 189.00, '10 weeks', 'Intermediate', 'Exam Preparation', NOW(), NOW()),
('IELTS Academic Writing', 'Master IELTS Writing', 'James Taylor', 159.00, '8 weeks', 'Upper Intermediate', 'Exam Preparation', NOW(), NOW()),
('Conversational English', 'Improve conversation skills', 'Rachel Green', 99.00, '6 weeks', 'Beginner', 'Grammar', NOW(), NOW()),
('Advanced Speaking Skills', 'Develop fluency', 'Tom Harris', 139.00, '8 weeks', 'Advanced', 'Grammar', NOW(), NOW()),
('Pronunciation Masterclass', 'Perfect your pronunciation', 'Sophie Brown', 119.00, '6 weeks', 'Intermediate', 'Grammar', NOW(), NOW()),
('English Grammar Fundamentals', 'Build grammar foundation', 'Robert Lee', 89.00, '8 weeks', 'Beginner', 'Grammar', NOW(), NOW()),
('Advanced Grammar & Style', 'Master complex grammar', 'Patricia White', 129.00, '10 weeks', 'Advanced', 'Grammar', NOW(), NOW()),
('Creative Writing in English', 'Develop creative writing', 'Daniel Moore', 149.00, '8 weeks', 'Intermediate', 'Grammar', NOW(), NOW()),
('Medical English', 'English for healthcare', 'Dr. Jennifer Adams', 199.00, '10 weeks', 'Upper Intermediate', 'Business English', NOW(), NOW()),
('Legal English', 'English for lawyers', 'William Clark', 219.00, '12 weeks', 'Advanced', 'Business English', NOW(), NOW()),
('Technical English', 'English for engineers', 'Kevin Zhang', 179.00, '10 weeks', 'Intermediate', 'Business English', NOW(), NOW()),
('English for Travel', 'Essential travel English', 'Maria Garcia', 79.00, '4 weeks', 'Beginner', 'Grammar', NOW(), NOW()),
('American Culture & English', 'Learn American English', 'John Smith', 109.00, '6 weeks', 'Intermediate', 'Grammar', NOW(), NOW()),
('British English & Culture', 'Master British English', 'Elizabeth Windsor', 109.00, '6 weeks', 'Intermediate', 'Grammar', NOW(), NOW()),
('Academic English Writing', 'Write academic papers', 'Prof. Richard Davis', 169.00, '10 weeks', 'Upper Intermediate', 'Business English', NOW(), NOW()),
('English for University', 'Prepare for university', 'Dr. Susan Miller', 189.00, '12 weeks', 'Upper Intermediate', 'Exam Preparation', NOW(), NOW());

-- Check results
SELECT id, title, price, level FROM courses ORDER BY id DESC LIMIT 20;

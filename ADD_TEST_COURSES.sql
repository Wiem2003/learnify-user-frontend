-- Add more test courses for payment testing
-- Run this in phpMyAdmin on the learnify database

INSERT INTO courses (title, description, instructor_id, price, duration, level, category, created_at, updated_at) VALUES
('Advanced JavaScript Programming', 'Master modern JavaScript with ES6+, async/await, and advanced patterns', 1, 159.00, '10 weeks', 'Advanced', 'Programming', NOW(), NOW()),
('Python for Data Science', 'Learn Python programming with focus on data analysis and visualization', 1, 189.00, '12 weeks', 'Intermediate', 'Data Science', NOW(), NOW()),
('Web Development Bootcamp', 'Complete web development course covering HTML, CSS, JavaScript, and React', 1, 249.00, '16 weeks', 'Beginner', 'Web Development', NOW(), NOW()),
('Digital Marketing Mastery', 'Comprehensive digital marketing course covering SEO, social media, and analytics', 1, 139.00, '8 weeks', 'Intermediate', 'Marketing', NOW(), NOW()),
('Machine Learning Fundamentals', 'Introduction to machine learning algorithms and practical applications', 1, 299.00, '14 weeks', 'Advanced', 'Data Science', NOW(), NOW()),
('UI/UX Design Principles', 'Learn user interface and user experience design best practices', 1, 179.00, '10 weeks', 'Intermediate', 'Design', NOW(), NOW()),
('Mobile App Development', 'Build native mobile apps for iOS and Android using React Native', 1, 219.00, '12 weeks', 'Intermediate', 'Mobile Development', NOW(), NOW()),
('Cloud Computing with AWS', 'Master Amazon Web Services and cloud infrastructure', 1, 269.00, '10 weeks', 'Advanced', 'Cloud Computing', NOW(), NOW()),
('Cybersecurity Essentials', 'Learn security fundamentals, ethical hacking, and network protection', 1, 199.00, '8 weeks', 'Intermediate', 'Security', NOW(), NOW()),
('Blockchain Development', 'Build decentralized applications with Ethereum and Solidity', 1, 289.00, '12 weeks', 'Advanced', 'Blockchain', NOW(), NOW()),
('SQL Database Design', 'Master database design, queries, and optimization techniques', 1, 149.00, '6 weeks', 'Intermediate', 'Database', NOW(), NOW()),
('DevOps Engineering', 'Learn CI/CD, Docker, Kubernetes, and automation tools', 1, 239.00, '10 weeks', 'Advanced', 'DevOps', NOW(), NOW()),
('Graphic Design Masterclass', 'Complete graphic design course with Adobe Creative Suite', 1, 169.00, '8 weeks', 'Beginner', 'Design', NOW(), NOW()),
('Content Writing & Copywriting', 'Master the art of persuasive writing and content creation', 1, 119.00, '6 weeks', 'Beginner', 'Writing', NOW(), NOW()),
('Project Management Professional', 'PMP certification preparation and project management best practices', 1, 229.00, '10 weeks', 'Intermediate', 'Management', NOW(), NOW()),
('Video Editing with Premiere Pro', 'Professional video editing techniques and workflows', 1, 159.00, '8 weeks', 'Intermediate', 'Video Production', NOW(), NOW()),
('Excel for Business Analytics', 'Advanced Excel skills for data analysis and business intelligence', 1, 129.00, '6 weeks', 'Intermediate', 'Business', NOW(), NOW()),
('Photography Fundamentals', 'Learn photography basics, composition, and post-processing', 1, 139.00, '8 weeks', 'Beginner', 'Photography', NOW(), NOW()),
('Social Media Marketing', 'Master Instagram, Facebook, TikTok, and LinkedIn marketing strategies', 1, 149.00, '6 weeks', 'Beginner', 'Marketing', NOW(), NOW()),
('Artificial Intelligence Basics', 'Introduction to AI concepts, neural networks, and deep learning', 1, 279.00, '12 weeks', 'Advanced', 'AI', NOW(), NOW());

-- Verify the courses were added
SELECT COUNT(*) as total_courses FROM courses;
SELECT id, title, price, level, category FROM courses ORDER BY id DESC LIMIT 20;

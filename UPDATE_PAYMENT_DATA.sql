-- SQL Script to Update Payment Data with Course Titles and Payment Methods
-- Run this in phpMyAdmin for the 'learnify' database

-- ============================================
-- STEP 1: Update Payment Methods
-- ============================================

-- Update NULL or empty payment methods to 'credit_card'
UPDATE payments 
SET payment_method = 'credit_card' 
WHERE payment_method IS NULL OR payment_method = '';

-- ============================================
-- STEP 2: Add Course Titles (if not exists)
-- ============================================

-- First, check if course_title column exists
-- If it doesn't exist, add it:
-- ALTER TABLE payments ADD COLUMN course_title VARCHAR(255) AFTER course_id;

-- Update course titles based on course_id
-- Replace these with your actual course names
UPDATE payments SET course_title = 'Web Development Bootcamp' WHERE course_id = 1 AND (course_title IS NULL OR course_title = '');
UPDATE payments SET course_title = 'UI/UX Design Masterclass' WHERE course_id = 2 AND (course_title IS NULL OR course_title = '');
UPDATE payments SET course_title = 'Data Science & Analytics' WHERE course_id = 3 AND (course_title IS NULL OR course_title = '');
UPDATE payments SET course_title = 'Digital Marketing Pro' WHERE course_id = 4 AND (course_title IS NULL OR course_title = '');
UPDATE payments SET course_title = 'Mobile App Development' WHERE course_id = 5 AND (course_title IS NULL OR course_title = '');
UPDATE payments SET course_title = 'Graphic Design Fundamentals' WHERE course_id = 6 AND (course_title IS NULL OR course_title = '');

-- For any remaining NULL course titles, set a default
UPDATE payments 
SET course_title = CONCAT('Course #', course_id) 
WHERE course_title IS NULL OR course_title = '';

-- ============================================
-- STEP 3: Verify Updates
-- ============================================

-- Check payment methods distribution
SELECT 
    payment_method,
    COUNT(*) as count,
    SUM(amount) as total_revenue
FROM payments
GROUP BY payment_method;

-- Check course titles
SELECT 
    course_id,
    course_title,
    COUNT(*) as payment_count,
    SUM(amount) as total_revenue
FROM payments
GROUP BY course_id, course_title
ORDER BY total_revenue DESC;

-- ============================================
-- OPTIONAL: Add More Payment Methods Variety
-- ============================================

-- If you want to add variety to payment methods for testing:
-- Update some payments to use different methods

-- Update 20% of payments to PayPal
UPDATE payments 
SET payment_method = 'paypal' 
WHERE id % 5 = 0 AND payment_method = 'credit_card';

-- Update 15% of payments to Bank Transfer
UPDATE payments 
SET payment_method = 'bank_transfer' 
WHERE id % 7 = 0 AND payment_method = 'credit_card';

-- Update 10% of payments to Stripe
UPDATE payments 
SET payment_method = 'stripe' 
WHERE id % 10 = 0 AND payment_method = 'credit_card';

-- ============================================
-- STEP 4: Final Verification
-- ============================================

-- View sample of updated data
SELECT 
    id,
    course_id,
    course_title,
    amount,
    payment_method,
    payment_status,
    payment_date
FROM payments
ORDER BY id DESC
LIMIT 20;

-- Summary statistics
SELECT 
    COUNT(*) as total_payments,
    SUM(amount) as total_revenue,
    AVG(amount) as avg_payment,
    COUNT(DISTINCT course_id) as unique_courses,
    COUNT(DISTINCT payment_method) as unique_methods
FROM payments
WHERE payment_status = 'COMPLETED' OR payment_status IS NULL;

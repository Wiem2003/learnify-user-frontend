-- Update Payment Methods in Database
-- Run this in phpMyAdmin to set payment methods for existing payments

-- STEP 1: Check current payment methods
SELECT id, user_id, amount, currency, payment_method, payment_status 
FROM payments 
ORDER BY id DESC;

-- STEP 2: Update all NULL payment methods to 'credit_card' as default
UPDATE payments 
SET payment_method = 'credit_card' 
WHERE payment_method IS NULL OR payment_method = '';

-- STEP 3: (Optional) Update specific payments to different methods
-- Example: Set payment 53 to bank_transfer
-- UPDATE payments SET payment_method = 'bank_transfer' WHERE id = 53;

-- Example: Set payments 51 and 52 to paypal
-- UPDATE payments SET payment_method = 'paypal' WHERE id IN (51, 52);

-- STEP 4: Verify the changes
SELECT id, user_id, amount, currency, payment_method, payment_status 
FROM payments 
ORDER BY id DESC;

-- Available payment methods:
-- 'credit_card'     -> Will display as "Credit Card"
-- 'debit_card'      -> Will display as "Debit Card"
-- 'paypal'          -> Will display as "Paypal"
-- 'bank_transfer'   -> Will display as "Bank Transfer"
-- 'stripe'          -> Will display as "Stripe"

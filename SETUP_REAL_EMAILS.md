# Setup Real Email Notifications - Step by Step Guide

## 🎯 We'll Use Gmail SMTP (Easiest Option)

This guide will help you send real emails using your Gmail account.

---

## 📋 Prerequisites

- Gmail account
- Spring Boot application
- 30 minutes

---

## 🚀 Step-by-Step Setup

### STEP 1: Get Gmail App Password (5 minutes)

#### 1.1 Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow the steps to enable it (if not already enabled)

#### 1.2 Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Select "Mail" as the app
3. Select "Other" as the device
4. Type: "LearnifyEnglish"
5. Click "Generate"
6. **Copy the 16-character password** (you'll need this!)
7. Save it somewhere safe

---

### STEP 2: Update Spring Boot Backend (15 minutes)

#### 2.1 Add Email Dependency

**File**: `pom.xml`

Add this dependency:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

#### 2.2 Configure Email Settings

**File**: `src/main/resources/application.properties`

Add these lines:
```properties
# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-16-char-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
```

**Replace**:
- `your-email@gmail.com` with your Gmail address
- `your-16-char-app-password` with the password from Step 1.2

#### 2.3 Create Email Service

**File**: `src/main/java/com/learnify/service/EmailService.java`

```java
package com.learnify.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendPaymentConfirmation(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom("noreply@learnifyenglish.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true); // true = HTML
            
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + to);
            
        } catch (MessagingException e) {
            System.err.println("❌ Error sending email: " + e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
```

#### 2.4 Create Email Request DTO

**File**: `src/main/java/com/learnify/dto/EmailRequest.java`

```java
package com.learnify.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class EmailRequest {
    
    @JsonProperty("to")
    private String to;
    
    @JsonProperty("subject")
    private String subject;
    
    @JsonProperty("body")
    private String body;
    
    @JsonProperty("type")
    private String type;
    
    // Constructors
    public EmailRequest() {}
    
    public EmailRequest(String to, String subject, String body, String type) {
        this.to = to;
        this.subject = subject;
        this.body = body;
        this.type = type;
    }
    
    // Getters and Setters
    public String getTo() {
        return to;
    }
    
    public void setTo(String to) {
        this.to = to;
    }
    
    public String getSubject() {
        return subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }
    
    public String getBody() {
        return body;
    }
    
    public void setBody(String body) {
        this.body = body;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
}
```

#### 2.5 Create Notification Controller

**File**: `src/main/java/com/learnify/controller/NotificationController.java`

```java
package com.learnify.controller;

import com.learnify.dto.EmailRequest;
import com.learnify.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {
    
    @Autowired
    private EmailService emailService;
    
    @PostMapping("/email")
    public ResponseEntity<Map<String, Object>> sendEmail(@RequestBody EmailRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            emailService.sendPaymentConfirmation(
                request.getTo(),
                request.getSubject(),
                request.getBody()
            );
            
            response.put("success", true);
            response.put("message", "Email sent successfully");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to send email: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
```

#### 2.6 Rebuild and Restart Spring Boot

```bash
# In your Spring Boot project directory
mvn clean install
mvn spring-boot:run
```

Or if using IDE:
1. Stop the application
2. Rebuild project
3. Start the application

---

### STEP 3: Update Angular Frontend (5 minutes)

#### 3.1 Update Notification Service

**File**: `src/app/core/services/notification.service.ts`

Find the `simulateEmailSending` method and replace it:

```typescript
private simulateEmailSending(email: EmailNotification): Observable<boolean> {
  // Use real HTTP call instead of simulation
  return this.http.post<any>(`${this.apiUrl}/api/notifications/email`, email)
    .pipe(
      map(response => response.success || false),
      catchError(error => {
        console.error('Failed to send email:', error);
        return of(false);
      })
    );
}
```

#### 3.2 Update Payment Component Message

**File**: `src/app/pages/payment/payment.component.ts`

Change the alert message back to mention email:

Find this line:
```typescript
alert('Payment successful! You are now enrolled in your courses.');
```

Change it to:
```typescript
alert('Payment successful! Check your email for confirmation.');
```

---

### STEP 4: Test Email Sending (5 minutes)

#### 4.1 Test Backend Directly

Use Postman or curl:

```bash
curl -X POST http://localhost:8080/api/notifications/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-test-email@gmail.com",
    "subject": "Test Email",
    "body": "<h1>Test Email</h1><p>This is a test email from LearnifyEnglish</p>",
    "type": "test"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Check your email inbox!**

#### 4.2 Test Through Payment Flow

1. Go to payment page
2. Make a test payment
3. Check your email inbox
4. You should receive a payment confirmation email!

---

## 🎨 Email Template Preview

The email users will receive looks like this:

```
┌─────────────────────────────────────────┐
│         Payment Confirmed!              │
│         (Purple gradient header)        │
└─────────────────────────────────────────┘

Dear User,

Thank you for your purchase! Your payment has been 
successfully processed.

┌─────────────────────────────────────────┐
│ Order Details                           │
│                                         │
│ Course: Web Development Bootcamp        │
│ Amount: USD 49.00                       │
│ Transaction ID: TXN_1234567890          │
└─────────────────────────────────────────┘

You can now access your course from your dashboard.

        [Go to My Courses]

If you have any questions, please contact our 
support team.

─────────────────────────────────────────
© 2026 LearnifyEnglish. All rights reserved.
```

---

## 🔍 Troubleshooting

### Issue: "Username and Password not accepted"

**Solution**: Make sure you're using an App Password, not your regular Gmail password.

1. Go to: https://myaccount.google.com/apppasswords
2. Generate a new App Password
3. Use that 16-character password in application.properties

---

### Issue: "Could not connect to SMTP host"

**Solution**: Check your firewall/antivirus settings. Port 587 must be open.

---

### Issue: Email goes to Spam

**Solution**: 
1. Add "noreply@learnifyenglish.com" to contacts
2. Mark the email as "Not Spam"
3. For production, use a custom domain with SPF/DKIM records

---

### Issue: "Authentication failed"

**Solution**: 
1. Enable "Less secure app access" (if 2FA is not enabled)
2. Or use App Password (recommended)

---

## ✅ Verification Checklist

- [ ] Gmail App Password generated
- [ ] application.properties updated with email settings
- [ ] EmailService.java created
- [ ] EmailRequest.java created
- [ ] NotificationController.java created
- [ ] Spring Boot restarted
- [ ] Test email sent successfully via curl/Postman
- [ ] Payment flow tested
- [ ] Email received in inbox

---

## 🎯 Quick Summary

**What You Need**:
1. Gmail account
2. App Password (16 characters)
3. 3 new Java files (EmailService, EmailRequest, NotificationController)
4. Updated application.properties
5. Updated Angular notification service

**Time**: 30 minutes
**Difficulty**: Easy
**Cost**: Free (Gmail SMTP is free)

---

## 📧 Email Limits

**Gmail SMTP Limits**:
- 500 emails per day (free)
- 100 emails per hour
- Good for development and small applications

**For Production** (if you need more):
- SendGrid: 100 emails/day free, then paid
- AWS SES: $0.10 per 1000 emails
- Mailgun: 5000 emails/month free

---

## 🚀 Next Steps

1. Follow Step 1 to get Gmail App Password
2. Follow Step 2 to update Spring Boot
3. Follow Step 3 to update Angular
4. Follow Step 4 to test
5. Make a payment and check your email!

---

**Ready to start?** Begin with Step 1 - Get Gmail App Password!

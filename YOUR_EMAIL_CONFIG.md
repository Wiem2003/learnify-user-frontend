# Your Email Configuration - Ready to Use

## ✅ Your Gmail App Password
```
ofsw wnni cgcl vatr
```

**Important**: Remove spaces when using in application.properties:
```
ofswwnnicgclvatr
```

---

## 📝 Step-by-Step Setup in IntelliJ

### STEP 1: Update pom.xml (1 min)

Open `pom.xml` and add this dependency inside `<dependencies>`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

Then: **Right-click pom.xml → Maven → Reload Project**

---

### STEP 2: Update application.properties (2 min)

Open `src/main/resources/application.properties` and add:

```properties
# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=ofswwnnicgclvatr
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
```

**Replace `YOUR_EMAIL@gmail.com`** with your actual Gmail address.

---

### STEP 3: Create EmailService.java (3 min)

**Location**: `src/main/java/com/learnify/service/EmailService.java`

**Right-click on `service` package → New → Java Class → Name: EmailService**

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
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            System.out.println("✅ Email sent successfully to: " + to);
            
        } catch (MessagingException e) {
            System.err.println("❌ Error sending email: " + e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
```

---

### STEP 4: Create EmailRequest.java (2 min)

**Location**: `src/main/java/com/learnify/dto/EmailRequest.java`

**Right-click on `dto` package → New → Java Class → Name: EmailRequest**

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
    
    public EmailRequest() {}
    
    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }
    
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    
    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
```

---

### STEP 5: Create NotificationController.java (3 min)

**Location**: `src/main/java/com/learnify/controller/NotificationController.java`

**Right-click on `controller` package → New → Java Class → Name: NotificationController**

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

---

### STEP 6: Restart Spring Boot (1 min)

In IntelliJ:
1. Click the **Red Stop button** (Stop application)
2. Click the **Green Play button** (Run application)

Or in terminal:
```bash
mvn clean install
mvn spring-boot:run
```

---

### STEP 7: Test with Postman (2 min)

1. Open Postman
2. Create **POST** request
3. URL: `http://localhost:8080/api/notifications/email`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
  "to": "YOUR_EMAIL@gmail.com",
  "subject": "Test Email from LearnifyEnglish",
  "body": "<h1>Test Email</h1><p>This is a test email from your payment system!</p>",
  "type": "test"
}
```
6. Click **Send**
7. **Check your email inbox!**

---

### STEP 8: Test Payment Flow (1 min)

1. Go to: `http://localhost:4200/payment`
2. Fill in payment form
3. Submit payment
4. **Check your email!**

---

## ✅ Checklist

- [ ] pom.xml updated with mail dependency
- [ ] Maven project reloaded
- [ ] application.properties updated with email config
- [ ] EmailService.java created
- [ ] EmailRequest.java created
- [ ] NotificationController.java created
- [ ] Spring Boot restarted successfully
- [ ] Test email sent via Postman
- [ ] Email received in inbox
- [ ] Payment flow tested
- [ ] Payment confirmation email received

---

## 🔍 Verify Spring Boot Started Correctly

Check IntelliJ console for:
```
✅ Started [YourApplication] in X.XXX seconds
✅ Tomcat started on port(s): 8080
```

No errors about mail configuration.

---

## 📧 Expected Result

After making a payment, you'll receive an email like:

```
Subject: Payment Confirmation - Web Development Bootcamp

Dear User,

Thank you for your purchase! Your payment has been 
successfully processed.

Order Details:
- Course: Web Development Bootcamp
- Amount: USD 49.00
- Transaction ID: TXN_1234567890

[Go to My Courses]

© 2026 LearnifyEnglish
```

---

## 🐛 Troubleshooting

### If Spring Boot won't start:
- Check console for errors
- Verify App Password has no spaces: `ofswwnnicgclvatr`
- Verify email address is correct

### If email not sending:
- Check Spring Boot console for "✅ Email sent to: ..."
- Check spam folder
- Verify Gmail App Password is correct

### If 404 error:
- Make sure NotificationController is created
- Restart Spring Boot
- Check URL: `http://localhost:8080/api/notifications/email`

---

## 🎯 Quick Summary

**Your App Password**: `ofswwnnicgclvatr` (no spaces)

**Files to Create**:
1. EmailService.java
2. EmailRequest.java  
3. NotificationController.java

**Files to Update**:
1. pom.xml
2. application.properties

**Total Time**: ~15 minutes

---

**Start with STEP 1 in IntelliJ!** 🚀

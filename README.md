# LearnHub — Angular

**Master New Skills Online — Anytime, Anywhere.**  
Join over 50,000+ students learning from world-class mentors. Transform your career with industry-leading courses.

## What is LearnHub

LearnHub is an **Angular** single-page application for an online learning platform. It showcases courses, mentors, community, testimonials, and pricing. The UI uses **Bootstrap 5** and the same design as the original template, now built with Angular 19 and standalone components.

## 🏗️ Architecture

This application follows a **microservices architecture** pattern:
- **Frontend**: Angular 19 (this repository)
- **Backend**: Spring Boot microservices with API Gateway
- **Communication**: All HTTP requests go through API Gateway (localhost:8080)

See [MICROSERVICES_ARCHITECTURE.md](MICROSERVICES_ARCHITECTURE.md) for detailed architecture documentation.

## Getting Started

1. Clone or download the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm start` (or `ng serve`)
4. Open your browser at `http://localhost:4200`

## Build

- Development: `ng build` or `npm run build`
- Production: `ng build --configuration production`

Output is in `dist/learnhub`.

## Tech Stack

### Frontend
- **Angular 19** (standalone components, control flow)
- **Bootstrap 5** (styles + JS for navbar and modal)
- **SCSS** (Bootstrap variables + custom theme)
- **Routing** with anchor scrolling for in-page sections
- **RxJS** for reactive programming

### Backend (Separate Repository)
- **Spring Boot** microservices
- **Spring Cloud Gateway** (API Gateway)
- **Eureka** (Service Discovery)
- **MySQL** database
- **RESTful APIs**

## Project Structure

```
src/
├── app/
│   ├── app.component.ts      # Root component
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── core/                  # Core module (NEW)
│   │   ├── config/            # API configuration
│   │   ├── models/            # Domain models
│   │   ├── services/          # Microservice clients
│   │   ├── interceptors/      # HTTP interceptors
│   │   └── core.module.ts
│   ├── components/            # Reusable UI components
│   │   ├── navbar/
│   │   ├── hero/
│   │   ├── courses/
│   │   ├── mentor/
│   │   ├── group/
│   │   ├── testimonials/
│   │   ├── pricing/
│   │   ├── footer/
│   │   └── get-started-modal/
│   ├── pages/
│   │   └── home/              # Home page (all sections)
│   ├── admin/                 # Admin module
│   └── services/              # Legacy services (to be removed)
├── assets/                    # Images, SCSS partials
├── environments/              # Environment configuration
│   ├── environment.ts         # Development config
│   └── environment.prod.ts    # Production config
├── index.html
├── main.ts
└── styles.scss                # Global Bootstrap + custom styles
```

## Features

- **Navbar** with smooth scroll and active section highlight
- **Hero** with CTA and video link (GLightbox optional)
- **Courses** grid with data-driven cards
- **Mentors** section
- **Group / Community** CTA
- **Testimonials**
- **Pricing** plans with “Get Started” opening the modal
- **Footer** with links and social icons
- **Get Started** modal (Bootstrap) for sign-up

## Requirements

- Node.js 18+
- npm or yarn

## 📚 Documentation

- **[REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md)** - Summary of refactoring changes
- **[MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)** - Step-by-step migration guide
- **[MICROSERVICES_ARCHITECTURE.md](MICROSERVICES_ARCHITECTURE.md)** - Architecture documentation
- **[BACKEND_REMOVAL_CHECKLIST.md](BACKEND_REMOVAL_CHECKLIST.md)** - Backend removal checklist
- **[src/app/core/README.md](src/app/core/README.md)** - Core module documentation

## 🚀 API Gateway Configuration

The application communicates with backend microservices through an API Gateway:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiGateway: {
    baseUrl: 'http://localhost:8080',
    services: {
      payment: '/payment-service',
      user: '/user-service',
      course: '/course-service',
      certificate: '/certificate-service',
      invoice: '/invoice-service',
      transaction: '/transaction-service'
    }
  }
};
```

## 🔧 Backend Setup

This frontend requires the following Spring Boot microservices:

1. **Eureka Discovery Service** (Port 8761)
2. **API Gateway** (Port 8080)
3. **Payment Service** (Port 8081)
4. **User Service** (Port 8082)
5. **Course Service** (Port 8083)
6. **Certificate Service** (Port 8084)
7. **Invoice Service** (Port 8085)
8. **Transaction Service** (Port 8086)

See [MICROSERVICES_ARCHITECTURE.md](MICROSERVICES_ARCHITECTURE.md) for backend setup instructions.

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run e2e

# Test API Gateway connection
curl http://localhost:8080/payment-service/payments
```

## 📦 Deployment

### Frontend Deployment
```bash
npm run build --prod
# Deploy dist/ folder to web server or CDN
```

### Environment Configuration
Update `src/environments/environment.prod.ts` with production API Gateway URL:
```typescript
apiGateway: {
  baseUrl: 'https://api.yourdomain.com'
}
```

## Support

- Contact: [Codescandy](https://codescandy.com/contact-us/)
- Architecture Questions: See documentation files above

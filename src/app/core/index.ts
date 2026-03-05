/**
 * Core module barrel export
 * Provides easy access to all core services, models, and configuration
 */

// Services
export * from './services';

// Models
export * from './models';

// Configuration
export * from './config/api.config';

// Interceptors
export * from './interceptors/api-gateway.interceptor';

// Module
export * from './core.module';

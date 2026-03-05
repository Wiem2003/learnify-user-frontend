export const environment = {
  production: true,
  apiGateway: {
    baseUrl: 'https://api.yourdomain.com',
    services: {
      payment: '/payment-service',
      certificate: '/certificate-service'
    }
  }
};

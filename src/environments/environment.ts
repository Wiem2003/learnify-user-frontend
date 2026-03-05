export const environment = {
  production: false,
  apiGateway: {
    baseUrl: 'http://localhost:8080',  // API Gateway port
    services: {
      payment: '',  // No prefix - backend expects /api/payments directly
      certificate: ''  // No prefix - backend expects /api/certificates directly
    }
  }
};

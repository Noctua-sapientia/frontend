const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/v1/reviews/books',
    createProxyMiddleware({
      target: 'http://localhost:4004',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/reviews/sellers',
    createProxyMiddleware({
      target: 'http://localhost:4004',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/sellers',
    createProxyMiddleware({
      target: 'http://localhost:4001',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/customers',
    createProxyMiddleware({
      target: 'http://localhost:4001',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/login',
    createProxyMiddleware({
      target: 'http://localhost:4001',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/books',
    createProxyMiddleware({
      target: 'http://localhost:4002',
      changeOrigin: true,
    })
  );

  app.use(
    '/api/v1/orders',
    createProxyMiddleware({
      target: 'http://localhost:4003',
      changeOrigin: true,
    })
  );
};
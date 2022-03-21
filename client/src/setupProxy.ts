import { createProxyMiddleware } from 'http-proxy-middleware';

const proxy = (app: any) => {
  app.use(
    '/socket',
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      pathRewrite: {
        '/socket': '',
      },
      changeOrigin: true,
    })
  );
};

export default proxy;

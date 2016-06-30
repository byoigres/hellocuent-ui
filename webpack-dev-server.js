/* eslint no-console: 0 */

import { Server } from 'hapi';
import H2o2 from 'h2o2';
import Webpack from 'webpack';
import WebpackPlugin from 'hapi-webpack-plugin';
import webpackConfig from './webpack.config';

const compiler = new Webpack(webpackConfig);
const server = new Server();

server.connection({
  host: 'localhost',
  port: 7000,
  labels: 'proxy-server',
});

const assets = {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  noInfo: true,
  quiet: false,
  host: 'localhost',
  port: 7001,
  stats: {
    colors: true,
  },
};

const hot = {

};

server.register([
  {
    register: H2o2,
  },
  {
    register: WebpackPlugin,
    options: { compiler, assets, hot },
  },
], error => {
  if (error) {
    return console.error(error);
  }
  /*
  server.route({
    method: ['GET'],
    path: '/{path*}',
    handler: (request, reply) => {
      if (/^public\/static\/[A-Za-z0-9\-]+\.css/.test(request.params.path)) {
        const response = reply('// This is a fake CSS content... :)');
        response.type('text/css');
        return response;
      }

      return reply.proxy({
        host: 'localhost',
        port: 7001,
        passThrough: true,
      });
    },
  });

  server.route({
    method: ['POST'],
    path: '/{path*}',
    config: {
      payload: {
        output: 'data',
        parse: false,
      },
    },
    handler: (request, reply) => (
      reply.proxy({
        host: 'localhost',
        port: 7001,
        passThrough: true,
      })
    ),
  });
  */
  server.start(() => console.log(`Server running on ${server.info.uri}`));

  return 0;
});

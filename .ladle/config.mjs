export default {
  resolve: {
    alias: {
      'api': '/home/bruhno/projects/homepage/src/api',
      'components': '/home/bruhno/projects/homepage/src/components',
      'config.client': '/home/bruhno/projects/homepage/src/config.client',
      'config.server': '/home/bruhno/projects/homepage/src/config.server',
      'containers': '/home/bruhno/projects/homepage/src/containers',
      'lib': '/home/bruhno/projects/homepage/src/lib',
      'pages': '/home/bruhno/projects/homepage/src/pages',
      'states': '/home/bruhno/projects/homepage/src/states',
      'styles': '/home/bruhno/projects/homepage/src/styles',
      'test': '/home/bruhno/projects/homepage/src/test',
      'types': '/home/bruhno/projects/homepage/src/types',
    },
  },
  babelPresets: [
    // ["@emotion/babel-preset-css-prop"],
  ],
  babelPlugins: [
    
    ['@emotion/babel-plugin'],
  ],
  serve: {
    port: 3001,
  },
  build: {
    out: './public/ladle',
    sourcemap: true,
  },
}

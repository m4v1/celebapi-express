module.exports = {
  apps: [
    {
      name: 'celebapi-express',
      script: 'dist/index.js',
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};

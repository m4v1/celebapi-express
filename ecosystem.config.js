module.exports = {
  apps: [
    {
      name: 'celebapi-express',
      script: 'dist/index.js',
      max_memory_restart: '200M',
      instances: 4,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};

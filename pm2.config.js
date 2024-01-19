module.exports = {
  name: "fuhuzz.rip backend", // Name of your application
  script: "src/app.ts", // Entry point of your application
  interpreter: "bun", // Path to the Bun interpreter
  args: "start",
  autorestart: true,
  env: {
    NODE_ENV: "production", // Môi trường
    PORT: 3001, // Cổng mà ứng dụng của bạn lắng nghe
  },
}

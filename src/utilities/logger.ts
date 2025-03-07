import winston from "winston";

const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Log errors in a file
    new winston.transports.File({ filename: "logs/combined.log" }), // Store all logs
  ],
});

export default logger;

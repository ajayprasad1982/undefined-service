export const config = () => ({
  port: Number(process.env.PORT) || 3000,
  appName: "equitas-worker",
  graylog: {
    isEnabled: process.env.GRAYLOG_ENABLED || true,
    host: process.env.GRAYLOG_HOST || "0.0.0.0",
    port: process.env.GRAYLOG_PORT || 12201 ,
  },
  RABBIT_URI:`amqp://${process.env.RABBITMQ_USERNAME || "ohommimd"}:${
    process.env.RABBITMQ_PASSWORD || "LI4Cl9IH9OWeJJecOFxOPLT-rDMwsMqm"
  }@${process.env.RABBITMQ_HOST || "termite-01.rmq.cloudamqp.com"}:${
    process.env.RABBITMQ_PORT || 5672
  }/${process.env.RABBITMQ_VHOST || "ohommimd"}`
});

# Webhook Debouncer

[https://hub.docker.com/repository/docker/gobeli/webhook-debounce](https://hub.docker.com/repository/docker/gobeli/webhook-debounce)


Debounces webhooks to ensure not to many requests are sent.
Created mainly for Gitlab CI and static site generators, but can be used for anything.

## Request
```
POST
Host: {Your Hostname}:{Port (defined with env variable PORT)}
Content-Type: application/json

{
  "url": "{webhook url}",
  "method": "method to call webhook",
  "headers": {
    "X-API-KEY": "{send API key as header}"
  }
}
```
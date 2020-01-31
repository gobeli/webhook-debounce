import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import axios from 'axios';

const app = new Koa();
app.use(bodyParser());

dotenv.config();

const webhooks = new Map();

app.use((ctx) => {
  if (ctx.method !== 'POST') {
    return;
  }
  console.log(ctx.request.body)
  const { url, headers, method } = ctx.request.body;

  console.log('Url: ', url);

  if (webhooks.has(url)) {
    clearTimeout(webhooks.get(url));
  }

  const timeout = setTimeout(() => {
    console.log('Send to: ', url)
    axios(url, { headers, method }).then(() => {
      webhooks.delete(url);
    }).catch(err => {
      console.error(`Failed to fetch ${url}`, err);
    });
  }, process.env.DEBOUNCE_TIME_S * 1000);

  webhooks.set(url, timeout);
  ctx.body = JSON.stringify({ success: true, message: `Sending request in ${process.env.DEBOUNCE_TIME_S}s` })
})

app.listen(process.env.PORT);

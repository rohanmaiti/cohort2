import { Hono } from 'hono'

const app = new Hono()

// c for ==> context
const middleWire =  async (c:any, next:any) => {
  console.log('c object', c);
  const initTime = new Date();
  await next(); // if you want to run someting after this then await is needed else not 
  // example if you want to calculate the time taked by the middliware 
  const finalTime = (new Date().getTime() - initTime.getTime()) / 1000;
  console.log(`execution time = ${finalTime}`);

}

const appMiddleWire =  async (c:any, next:any) =>  {
  console.log('this middle wire will user in app.use --> so that in each req it logs this ');
  await next();
};

app.use(appMiddleWire);

app.post('/', middleWire, async (c) => {
  // how to get body, query, headers, middlewires and connections to db 
  const body = await c.req.json();
  console.log('body', body);
  console.log('header', c.req.header('Authorization'));
  console.log('request query', c.req.queries());
  return c.text('Hello Hono!')
})



export default app


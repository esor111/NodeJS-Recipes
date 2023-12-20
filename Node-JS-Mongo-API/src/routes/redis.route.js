import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
const RedisStore = connectRedis(session);

const router = express.Router();

router.use(bodyParser.json());

let client = redis.createClient({
  host: 'localhost',
  port: 6123,
  password: 'my secret',
  db: 1,
});

client.on('error', console.error);

session({
  store: new RedisStore({ client }),
  saveUninitialized: false,
  secret: 'amazing stuff',
  resave: false,
})

RedisStore['hits'] = 0;

// Create a new user or get all users
router.route('/').get('/', (req, res) => {
  RedisStore['hits']++;
  const num = RedisStore['hits'];
  res.send(`Hello World!<br><p>I have been loaded ${num} times.</p>`);
});
export default router;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log(con.connections);
});

/* mongoose.connect(process.env.DATABASE_LOCAL).then(async (con) => {
  // console.log(con.connections);
  const collections = await con.connection.db.listCollections().toArray();
  console.log(collections.map((c) => c.name));
}); */

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

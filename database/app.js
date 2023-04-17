const mongoose = require('mongoose');

// eslint-disable-next-line prettier/prettier
mongoose.connect(process.env.ZSH_MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

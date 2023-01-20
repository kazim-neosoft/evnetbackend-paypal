const mongoose=require('mongoose');
const connectDB = async () => {

  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/myTrainProj",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// env secrets -Please update your env var here
// PORT=7899
// SECRET_KEY='12@456urlqwery'
// CLIENTID='AYNcZtoiThBeKcfhdi4_zt1VEyPAOu9R-5D96FJqHMUh94YIaop4inqRHty4U2MumskphTtVyFX7194u'
// PAYPAL_SECRET='EBAQMoM3C-lsxAW16gL3VcTGD_6G_ZvtysW5uLqU8X9Q6jnuBl6jPGwMXN4diluI1BuEP3qF49krAcLh'
const mongoose = require("mongoose");

const connectUsers = async () => {
  try {
      if (!process.env.DATABASE) {
       throw new Error("DATABASE nao definido");
      }

    const connect = await mongoose.connect(process.env.DATABASE);
    console.log(
      `Servidor conectado ${connect.connection.host}`
    );
  } catch (error) {
    console.error("Erro ao tentar conectar o servidor:", error.message);
    process.exit(1);
  }
};

module.exports = connectUsers;

const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");
const { default: mongoose } = require("mongoose");

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(
    users.map((user) => {
      return { id: user._id, name: user.name, email: user.email };
    })
  );
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "ID Obrigatorio" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuario nao encontrado" });
    }
    const { email, _id } = user;
    res.status(200).json({ email, _id });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro do servidor", error: { erro: error.message } });
  }
});

const SignUp = asyncHandler(async (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body;

  try {
    if (!email || !password || !passwordConfirmation) {
      return res.status(400).json({
        message: "Os dados introduzidos não são válidos.",
        errors: {},
      });
    }

    if (password !== passwordConfirmation) {
      return res.status(400).json({
        errors: {
          passwordConfirmation: "As senhas não coincidem",
        },
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "E-mail já cadastrado" });
    }

    const user = new User({
      name,
      email,
      password,
      passwordConfirmation,
    });

    await user.save();

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      usuario: user,
    });
  } catch (error) {
    console.error("Erro interno do servidor:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email e senha sao obrigatorios" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Usuario nao encontrado" });
    }
    if (user.password !== password) {
      return res.status(400).json({ msg: "E-mail ou Senha invalidos" });
    }
    res.status(200).json({
      msg: "O usuario ",
      user: {
        name: user.name,
      },
      text: " esta Logado",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = { getAllUser, SignUp, login, getUserById };

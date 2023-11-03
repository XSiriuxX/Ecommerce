const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "secretkey123";

const User = require("../models/User.model");
const Order = require("../models/Order.model");

const user = {};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

user.getusers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

user.getuser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "El ID no es válido" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "El ID no fue encontrado" });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

user.createuser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(409).json({ message: "Faltan credenciales" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    if (user) {
      const user = await User.create(newUser);
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn });

      res.status(203).json({ username, email, accessToken, expiresIn });
    } else {
      res.status(500).json({ message: "No se pudo crear el usuario" });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "El Email ya esta en uso" });
    } else {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};

user.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(409).json({ message: "Faltan credenciales" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email incorrecto" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (isPassword) {
      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn });

      res.status(200).json({ email, accessToken, expiresIn });
    } else {
      res.status(401).json({ message: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = user;

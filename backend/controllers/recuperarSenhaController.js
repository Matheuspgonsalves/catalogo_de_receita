const express = require("express");
const { Op } = require("sequelize");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.solicitarRecuperacaoSenha = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({
        message:
          "Se o e-mail estiver cadastrado, um link de recuperação será enviado.",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    user.resetToken = hashedToken;
    user.tokenExpiry = new Date(Date.now() + 3600000);
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/redefinir-senha/${token}`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: "Recuperação de Senha",
      text: `Você solicitou a recuperação de sua senha. Clique no link abaixo para redefini-la:\n\n${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Link de recuperação enviado por e-mail." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao enviar e-mail de recuperação." });
  }
};

exports.redefinirSenha = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      where: {
        resetToken: hashedToken,
        tokenExpiry: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido ou expirado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.tokenExpiry = null;
    await user.save();

    res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao redefinir a senha." });
  }
};

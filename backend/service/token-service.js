const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, "secret12345", { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, "12secret12secret13", {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(email, refreshToken) {
    const searchUserId = await prisma.users.findFirst({
      where: { Mail: email },
    });
    const tokenData = await prisma.tokens.findFirst({
      where: { Id_users: searchUserId.Id },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      const updateToken = await prisma.tokens.update({
        where: { Id_users: searchUserId.Id },
        data: { refreshToken: refreshToken },
      });
      return tokenData;
    }
    const token = await prisma.Tokens.create({
      data: {
        Id_users: searchUserId.Id,
        refreshToken: refreshToken,
      },
    });
  }

  async removeToken(refreshToken) {
    const searchUserId = await prisma.tokens.findFirst({
      where: { refreshToken: refreshToken },
    });
    const tokenData = await prisma.tokens.delete({
      where: { Id_users: searchUserId.Id_users },
    });
    return tokenData;
  }
}

module.exports = new TokenService();

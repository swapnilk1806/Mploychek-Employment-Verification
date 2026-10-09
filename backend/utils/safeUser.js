function safeUser(user) {
  if (!user) return null;

  const data = user.toObject ? user.toObject() : user;
  delete data.password;

  return data;
}

module.exports = safeUser;
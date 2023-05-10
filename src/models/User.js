const UserModel = (sequelize, DataTypes) => {
  const user = sequelize.define('User',
    {
      id: DataTypes.INTEGER,
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      tablename: 'user',
      timesStamps: false,
      underscored: true
    }
  );

  return user;
};


module.exports = UserModel;
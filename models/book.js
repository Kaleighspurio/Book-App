module.exports = (sequelize, Datatypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    author: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    description: {
      type: Datatypes.TEXT,
    },
    image: Datatypes.STRING,
    link: Datatypes.STRING,
    have_read: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_favorite: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Book.associate = (models) => {
    Book.belongsTo(models.User, {
      //   foreignKey: {
      //     allowNull: false,
      //   },
    });
  };

  return Book;
};

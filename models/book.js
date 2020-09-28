module.exports = (sequelize, Datatypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    subtitle: Datatypes.STRING,
    author1: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    author2: Datatypes.STRING,
    author3: Datatypes.STRING,
    author4: Datatypes.STRING,
    description: {
      type: Datatypes.TEXT,
    },
    image: Datatypes.STRING,
    link: Datatypes.STRING,
    publisher: Datatypes.STRING,
    publish_date: Datatypes.DATE,
    page_count: Datatypes.INTEGER,
    isbn: Datatypes.STRING,
    categories: Datatypes.STRING,
    average_rating: Datatypes.INTEGER,
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

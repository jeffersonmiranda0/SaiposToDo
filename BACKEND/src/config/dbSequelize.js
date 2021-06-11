const Sequelize = require("sequelize");

const database = {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'saipos',
}

const sequelize = new Sequelize({
  dialect         : 'mysql',
  dialectOptions  : { decimalNumbers: true },
  operatorsAliases: 0,
  timezone        : '-03:00',
  logging         : console.log,
  benchmark       :false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
  },
  replication: {
    write: database,
    read: [
        database
    ],
  }
});

sequelize.dialect.supports.schemas = true;


const defaultModelConfig = {
    sequelize,
    schemaDelimiter : '',
    freezeTableName : true,
    underscored: false,
    timestamps: false,
    whereCollection: null,
    schema : '',
    tableName : '',
    modelName : '',
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = {
    db,
    sequelize,
    defaultModelConfig
};
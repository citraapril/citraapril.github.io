const { Sequelize, DataTypes } = require('sequelize');

// Membuat koneksi ke SQLite dengan file 'contacts.sqlite'
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'contacts.sqlite' // Nama file database yang akan digunakan
});

// Definisikan model untuk kontak
const Contact = sequelize.define('Contact', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    emailSubject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

// Sinkronisasi model dengan database
sequelize.sync();

module.exports = Contact;

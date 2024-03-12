const createUser = `
    CREATE TABLE users(
        id_user SERIAL PRIMARY KEY,
        name_user VARCHAR(266) NOT NULL,
        email_user VARCHAR(266) NOT NULL,
        password_user VARCHAR(266),
        avatar VARCHAR(266),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

module.exports = createUser;
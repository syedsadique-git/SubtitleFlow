// PostgreSQL User model
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   email VARCHAR(255) UNIQUE NOT NULL,
//   password_hash VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   plan VARCHAR(50) DEFAULT 'free',
//   preferences JSONB DEFAULT '{}'
// );

class User {
  static async create(client, { email, passwordHash }) {
    const result = await client.query(
      `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at`,
      [email, passwordHash]
    );
    return result.rows[0];
  }

  static async findByEmail(client, email) {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(client, id) {
    const result = await client.query('SELECT id, email, plan, preferences, created_at FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async updatePreferences(client, id, preferences) {
    const result = await client.query(
      `UPDATE users SET preferences = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, preferences`,
      [JSON.stringify(preferences), id]
    );
    return result.rows[0];
  }
}

module.exports = User;

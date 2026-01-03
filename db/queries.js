const pool = require("./pool");

async function getAllPokemon() {
  const { rows } = await pool.query("SELECT * FROM pokemon");
  return rows;
}

async function insertPokemon(name, trainer_id) {
  await pool.query("INSERT INTO pokemon (name, trainer_id) VALUES ($1, $2)", [name, trainer_id]);
}

module.exports = {
  getAllPokemon,
  insertPokemon
};

const pool = require("./pool");

async function getAllPokemon() {
  const { rows } = await pool.query("SELECT * FROM pokemon");
  return rows;
}

async function insertPokemon(name, trainer_id) {
  const { rows } = await pool.query(
    `
    INSERT INTO pokemon (name, trainer_id)
    VALUES ($1, $2)
    RETURNING id
    `,
    [name, trainer_id]
  );

  return rows[0]; // { id: ... }
}

async function addPokemonType(pokemon_id, type_id) {
  await pool.query(
    `
    INSERT INTO pokemon_types (pokemon_id, type_id)
    VALUES ($1, $2)
    `,
    [pokemon_id, type_id]
  );
}

async function getAllTypes() {
  const { rows } = await pool.query(
    "SELECT id, name FROM types ORDER BY name"
  );
  return rows;
}

async function getAllTrainers() {
  const { rows } = await pool.query(
    "SELECT id, name FROM trainers ORDER BY name"
  );
  return rows;
}

module.exports = {
  getAllPokemon,
  insertPokemon,
  getAllTypes,
  getAllTrainers,
  addPokemonType
};

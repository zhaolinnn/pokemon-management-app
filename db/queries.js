const pool = require("./pool");

async function getAllPokemon() {
  const { rows } = await pool.query("SELECT * FROM pokemon");
  return rows;
}

async function getAllPokemonWithTypes() {
  const { rows } = await pool.query(`
    SELECT
      p.id,
      p.name,
      tr.name AS trainer_name,
      COALESCE(
        ARRAY_AGG(t.name ORDER BY t.name) FILTER (WHERE t.name IS NOT NULL),
        '{}'
      ) AS types
    FROM pokemon p
    JOIN trainers tr ON tr.id = p.trainer_id
    LEFT JOIN pokemon_types pt ON pt.pokemon_id = p.id
    LEFT JOIN types t ON t.id = pt.type_id
    GROUP BY p.id, tr.name
    ORDER BY p.id;
  `);
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

async function insertTrainer(name) {
  const { rows } = await pool.query(
    `
    INSERT INTO trainers (name)
    VALUES ($1)
    `,
    [name]
  );
}

module.exports = {
  getAllPokemon,
  getAllPokemonWithTypes,
  insertPokemon,
  getAllTypes,
  getAllTrainers,
  addPokemonType,
  insertTrainer
};

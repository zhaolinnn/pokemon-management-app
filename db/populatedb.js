require("dotenv").config({ quiet: true });
const { Client } = require("pg");

const SQL = `

DROP TABLE IF EXISTS pokemon_types;
DROP TABLE IF EXISTS pokemon;
DROP TABLE IF EXISTS trainers;
DROP TABLE IF EXISTS types;

CREATE TABLE types (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE trainers (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE pokemon (
  id         SERIAL PRIMARY KEY,
  name   TEXT NOT NULL,
  trainer_id INT  NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Junction table: pokemon ↔ types
CREATE TABLE pokemon_types (
  pokemon_id INT NOT NULL REFERENCES pokemon(id) ON DELETE CASCADE,
  type_id    INT NOT NULL REFERENCES types(id),
  PRIMARY KEY (pokemon_id, type_id)
);

CREATE INDEX idx_pokemon_trainer ON pokemon(trainer_id);
CREATE INDEX idx_pokemon_type    ON pokemon_types(type_id);

INSERT INTO trainers (name)
VALUES
  ('Red'),
  ('Ash');

INSERT INTO types (name)
VALUES
  ('Normal'),
  ('Fire'),
  ('Water'),
  ('Electric'),
  ('Grass'),
  ('Ice'),
  ('Fighting'),
  ('Poison'),
  ('Ground'),
  ('Flying'),
  ('Psychic'),
  ('Bug'),
  ('Rock'),
  ('Ghost'),
  ('Dragon');

-- Add a pokemon
INSERT INTO pokemon (name, trainer_id)
VALUES ('Charizard', 2); -- Ash

-- Assign Fire + Flying
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES
  (
    (SELECT id FROM pokemon WHERE name = 'Charizard'),
    (SELECT id FROM types WHERE name = 'Fire')
  ),
  (
    (SELECT id FROM pokemon WHERE name = 'Charizard'),
    (SELECT id FROM types WHERE name = 'Flying')
  );


`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

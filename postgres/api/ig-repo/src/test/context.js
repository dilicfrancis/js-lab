const pool = require("../pool");
const { randomBytes } = require("crypto");
const { default: migrate } = require("node-pg-migrate");
const format = require("pg-format");

const DEFAULT_OPTS = {
  host: "localhost",
  port: 5432,
  database: "ig-test",
  //user: "",
  //password: ""
};

class Context {
  static async build() {
    //generate a random role name for connecting to PG
    const newRole = "v" + randomBytes(4).toString("hex");

    //connect to PG with the generated nome
    await pool.connect(DEFAULT_OPTS);

    //create a new role using the generated name
    await pool.query(
      format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", newRole, newRole)
    );

    //create a schema also with the generated name
    await pool.query(
      format("CREATE SCHEMA %I AUTHORIZATION %I;", newRole, newRole)
    );

    //disconnect from PG
    await pool.close();

    //run migrations in the created schema
    await migrate({
      schema: newRole,
      direction: "up",
      log: () => {}, //provided to force migrate to call and dump logging data to an empty function so test result areas isn't crowded with migration logs.
      noLock: true,
      dir: "migrations",
      databaseUrl: {
        //can be string as used in terminal or an object - using object method below
        host: "localhost",
        port: 5432,
        database: "ig-test",
        user: newRole,
        password: newRole,
      },
    });

    //reconnect to PG as the created role
    await pool.connect({
      host: "localhost",
      port: 5432,
      database: "ig-test",
      user: newRole,
      password: newRole,
    });

    return new Context(newRole);
  }

  async close() {
    // disconnect created role from PG
    await pool.close();

    //reconnect as root user
    await pool.connect(DEFAULT_OPTS);

    //delete created role and schema
    await pool.query(format("DROP SCHEMA %I CASCADE;", this.newRole));
    await pool.query(format("DROP ROLE %I;", this.newRole));

    //disconnect from PG
    await pool.close();
  }

  async reset() {
    return pool.query(`
        DELETE FROM users;`);
    //DELETE FROM another table
    //DELETE FROM another table
    //DELETE FROM another table
    //etc.
  }

  constructor(newRole) {
    this.newRole = newRole;
  }
}
module.exports = Context;

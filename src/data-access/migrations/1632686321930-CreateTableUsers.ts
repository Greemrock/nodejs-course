import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1632686321930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "login",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "age",
            type: "smallint",
          },
          {
            name: "isDeleted",
            type: "boolean",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}

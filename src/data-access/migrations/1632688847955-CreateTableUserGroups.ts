import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableUserGroups1632688847955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: "groups_users_users",
      columns: [
        {
          name: "groupsId",
          type: "varchar",
        },
        {
          name: "usersId",
          type: "varchar",
        },
      ],
    });

    await queryRunner.createTable(table);
    await queryRunner.createForeignKey(
      "groups_users_users",
      new TableForeignKey({
        columnNames: ["groupsId"],
        referencedColumnNames: ["id"],
        referencedTableName: "groups",
        onDelete: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "groups_users_users",
      new TableForeignKey({
        columnNames: ["usersId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("groups_users_users");
  }
}

import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Permission } from "../../models";

export class CreateTableGroup1632687654594 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "groups",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "permission",
            type: "enum",
            enum: [
              Permission.DELETE,
              Permission.READ,
              Permission.SHARE,
              Permission.UPLOAD_FILES,
              Permission.WRITE,
            ],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("groups");
  }
}

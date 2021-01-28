import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class photo1611696414647 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'photo',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true
        },
        {
          name: 'url',
          type: 'varchar'
        },
        {
          name: 'description',
          type: 'varchar'
        },
        {
          name: 'date',
          type: 'string'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}

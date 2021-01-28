import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class userLikePhoto1611858493929 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'like',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          unsigned: true,
          isGenerated: true
        },
        {
          name: 'userId',
          type: 'integer'
        },
        {
          name: 'photoId',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'idLikeUser',
          columnNames: ['userId'],
          referencedTableName: 'user',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          name: 'idLikePhoto',
          columnNames: ['photoId'],
          referencedTableName: 'photo',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}

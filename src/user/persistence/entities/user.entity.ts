import { TimestampEntity } from 'src/common/entities/timestamp.entity';
import { Role } from 'src/user/domain/enums/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column('text', { array: true, default: [] })
  roles: Role[];

  @Column('bool', { default: true })
  active: boolean;
}

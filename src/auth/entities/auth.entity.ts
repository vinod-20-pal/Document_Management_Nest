import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @Column({ default: 'viewer' })
    role: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}
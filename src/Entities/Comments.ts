import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { Users } from './Users';
import { Posts } from './Posts';
@Entity()
export class Comments extends BaseEntity{
    @PrimaryGeneratedColumn()
    cmt_id!:number;
    @Column()
    cmt_description!:string;
    @Column()
    cmt_type!:number;
    @Column()
    usr_id!:number;
    @Column()
    pst_id!:number;
    @ManyToOne(() => Users, user => user.comments)
    @JoinColumn({ name: 'usr_id' })
    user:Users;
    @ManyToOne(() => Posts, post => post.comments)
    @JoinColumn({ name: 'pst_id' })
    post:Posts;

}
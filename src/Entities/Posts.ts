import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm'
import { Users } from './Users';
import {Comments} from './Comments'
@Entity()
export class Posts extends BaseEntity{
    @PrimaryGeneratedColumn()
    pst_id!:number;
    @Column()
    pst_title!:string;
    @Column()
    pst_description!:string;
    @Column()
    pst_type!:number;
    @Column()
    usr_id!:number;
    @OneToMany(() => Comments, comment => comment.post)
    comments: Comments[];
    @ManyToOne(() => Users, user => user.posts)
    @JoinColumn({ name: 'usr_id' })
    user:Users;

}
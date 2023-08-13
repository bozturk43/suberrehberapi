import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Posts } from './Posts';
import { Comments } from './Comments';


@Entity()
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    usr_id!:number;
    @Column()
    usr_first_name!:string;
    @Column()
    usr_last_name!:string;
    @Column()
    usr_email!:string;
    @Column()
    usr_password!:string;
    @OneToMany(() => Posts, post => post.user)
    posts: Posts[];
    @OneToMany(()=>Comments,comment=>comment.user)
    comments:Comments[];

}
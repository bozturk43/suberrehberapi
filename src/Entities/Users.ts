import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, OneToMany,ManyToMany,JoinTable} from 'typeorm'
import { ActivitiesComments } from './ActivitiesComments';
import { Activities } from './Activities';


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
    @ManyToMany(() => Activities, activity => activity.users)
    @JoinTable()
    activities: Activities[];
    @OneToMany(()=>ActivitiesComments,activitycomment=>activitycomment.user)
    activitycomments:ActivitiesComments[];

}
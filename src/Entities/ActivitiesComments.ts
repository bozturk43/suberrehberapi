import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { Users } from './Users';
import { Activities } from './Activities';
@Entity()
export class ActivitiesComments extends BaseEntity{
    @PrimaryGeneratedColumn()
    cmt_id!:number;
    @Column()
    cmt_description!:string;
    @Column()
    usr_id!:number;
    @Column()
    act_id!:number;
    @ManyToOne(() => Users, user => user.activitycomments)
    @JoinColumn({ name: 'usr_id' })
    user:Users;
    @ManyToOne(() => Activities, activity => activity.activityComments)
    @JoinColumn({ name: 'act_id' })
    activity: Activities;

}
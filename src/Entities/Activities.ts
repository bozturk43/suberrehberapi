import {BaseEntity,Entity,
Column,
PrimaryGeneratedColumn, 
ManyToOne, JoinColumn, 
OneToMany,ManyToMany,JoinTable} from 'typeorm'
import { Users } from './Users';
import {ActivitiesComments} from './ActivitiesComments'
import { ActivitiesImages } from './ActivitiesImages';
import { ActivityTags } from './ActivityTags';
@Entity()
export class Activities extends BaseEntity{
    @PrimaryGeneratedColumn()
    act_id!:number;
    @Column()
    act_name!:string;
    @Column()
    act_description!:string;
    @Column()
    act_date!:Date;
    @Column('double')
    act_longtitude!:number;
    @Column('double')
    act_latitude!:number;
    @OneToMany(() => ActivitiesImages, image => image.activity)
    images: ActivitiesImages[];
    @OneToMany(() => ActivitiesComments, activtyComment => activtyComment.activity)
    activityComments: ActivitiesComments[];
    @ManyToMany(() => Users, user => user.activities)
    @JoinTable()
    users: Users[];
    @ManyToMany(() => ActivityTags)
    @JoinTable()
    activity_tags: ActivityTags[];
}
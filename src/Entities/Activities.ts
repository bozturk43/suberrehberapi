import {BaseEntity,Entity,
Column,
PrimaryGeneratedColumn, 
ManyToOne, JoinColumn, 
OneToMany,ManyToMany,JoinTable} from 'typeorm'
import { Users } from './Users';
import {ActivitiesComments} from './ActivitiesComments'
import { ActivitiesImages } from './ActivitiesImages';
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
    @Column()
    act_tags!:string;
    @OneToMany(() => ActivitiesImages, image => image.activity)
    images: ActivitiesImages[];
    @OneToMany(() => ActivitiesComments, activtyComment => activtyComment.activity)
    activityComments: ActivitiesComments[];
    @ManyToMany(() => Users, user => user.activities)
    @JoinTable()
    users: Users[];
}
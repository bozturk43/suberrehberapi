import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, OneToMany,ManyToMany,JoinTable} from 'typeorm'
import { Activities } from './Activities';
@Entity()
export class ActivityTags extends BaseEntity{
    @PrimaryGeneratedColumn()
    act_tag_id!:number;
    @Column()
    act_tag_name!:string;
    @ManyToMany(() => Activities, activity => activity.activity_tags)
    activities: Activities[];

}
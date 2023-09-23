import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, OneToMany,ManyToMany,JoinTable} from 'typeorm'
import { Places } from './Places';
@Entity()
export class PlaceTags extends BaseEntity{
    @PrimaryGeneratedColumn()
    plc_tag_id!:number;
    @Column()
    plc_tag_name!:string;
    @ManyToMany(() => Places, place => place.place_tags)
    places: Places[];

}
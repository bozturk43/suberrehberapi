import {BaseEntity,Entity,
Column,
PrimaryGeneratedColumn,
ManyToMany,JoinTable} from 'typeorm'
import { PlaceTags } from './PlaceTags';
@Entity()
export class Places extends BaseEntity{
    @PrimaryGeneratedColumn()
    plc_id!:number;
    @Column()
    plc_google_id!:string;
    @Column()
    plc_name!:string;
    @Column()
    plc_description!:string;
    @Column('double')
    plc_longtitude!:number;
    @Column('double')
    plc_latitude!:number;
    @ManyToMany(() => PlaceTags, placeTag => placeTag.places)
    @JoinTable()
    place_tags: PlaceTags[];
}
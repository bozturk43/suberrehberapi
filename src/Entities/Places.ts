import {BaseEntity,Entity,
Column,
PrimaryGeneratedColumn,
ManyToMany,JoinTable, OneToMany} from 'typeorm'
import { PlaceTags } from './PlaceTags';
import { PlaceImages } from './PlaceImages';
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
    @OneToMany(()=>PlaceImages,plc_images => plc_images.place)
    plc_images:PlaceImages[]
    @ManyToMany(() => PlaceTags)
    @JoinTable({name:"PLC__PLC_TAG"})
    place_tags: PlaceTags[];
}
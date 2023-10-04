import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, OneToMany,ManyToMany,JoinTable} from 'typeorm'
import { PlaceTags } from './PlaceTags';
@Entity()
export class PlaceTagsCategories extends BaseEntity{
    @PrimaryGeneratedColumn()
    plc_tag_cat_id!:number;
    @Column()
    plc_tag_cat_name!:string;
    @ManyToMany(() => PlaceTags)
    @JoinTable({name:"PLC_TAG_CAT__PLC_TAG"})
    plc_tags: PlaceTags[];
}
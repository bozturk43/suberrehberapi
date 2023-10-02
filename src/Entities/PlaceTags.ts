import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, OneToMany,ManyToMany,JoinTable} from 'typeorm'
import { Places } from './Places';
import { PlaceTagsCategories } from './PlaceTagsCategories';
@Entity()
export class PlaceTags extends BaseEntity{
    @PrimaryGeneratedColumn()
    plc_tag_id!:number;
    @Column()
    plc_tag_name!:string;
    @ManyToMany(() => Places, place => place.place_tags)
    places: Places[];
    @ManyToMany(() => PlaceTagsCategories, place_tags_categories => place_tags_categories.plc_tags)
    place_tags_categories: PlaceTagsCategories[];
}
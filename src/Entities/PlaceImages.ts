import {BaseEntity,Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'
import { Users } from './Users';
import { Places } from './Places';
@Entity()
export class PlaceImages extends BaseEntity{
    @PrimaryGeneratedColumn()
    plc_img_id!:number;
    @Column()
    plc_img_url!:string;
    @ManyToOne(() => Places, place => place.plc_images)
    @JoinColumn({ name: 'plc_id' })
    place:Places;
}
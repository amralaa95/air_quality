import { Table, Model, Column, PrimaryKey, DataType } from 'sequelize-typescript';

// benefits of explicit nulls in type?
export type ZonePollution = {
  id: string;
  country: string;
  city: string;
  longitude: number;
  latitude: number;
  aqius: number;
  aqicn: number;
  timestamp: string;
};

@Table({
  tableName: 'zone_pollution',
  timestamps: false,
  underscored: false,
})
export class ZonePollutionModel extends Model implements ZonePollution {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    field: 'id'
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare country: string;

  @Column({
    type: DataType.STRING
  })
  declare city: string;

  @Column({
    type: DataType.DOUBLE
  })
  declare longitude: number;

  @Column({
    type: DataType.DOUBLE
  })
  declare latitude: number;

  @Column({
    type: DataType.DOUBLE
  })
  declare aqius: number;

  @Column({
    type: DataType.DOUBLE
  })
  declare aqicn: number;

  @Column({
    type: DataType.STRING,
  })
  declare timestamp: string;
}
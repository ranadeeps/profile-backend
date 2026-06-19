import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "files" })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  originalFileName: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  fileName: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  mimeType: string;

  @Column({ type: "int" })
  fileSizeInBytes: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  destination: string;

  @Column({ type: "varchar", length: 255, nullable: false, default: "others" })
  fileType: string;

  @Column({ type: "int", default: 0 })
  totalViews: number;

  @Column({ type: "int", default: 0 })
  totalDownloads: number;

  @Column({ type: "varchar", length: 1, default: "N" })
  isDeleted: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}

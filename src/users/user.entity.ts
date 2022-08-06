import { AfterInsert, AfterUpdate ,AfterRemove, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @AfterInsert()
  logInsert(){
    console.log("Insert new User > ",this.id)
  }

  @AfterUpdate()
  logUpdate(){
    console.log("Update new User > ",this.id);
    
  }
  @AfterRemove()
  logDelete(){
    console.log("Delete new User",this.id);
    
  }

}

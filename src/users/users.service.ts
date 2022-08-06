import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo :Repository<User>){}

    create(email :string,password :string){
        // console.log("create user service",this.repo);
        
        let user=this.repo.create({email,password});
        return this.repo.save(user);
    }
    find(){
        return this.repo.find();
    }
    
    search(email:string){
        return this.repo.find({where:{email:email}});
    }
    
    count(){
        return this.repo.count();
    }

    async findOne(id:number){
        return await this.repo.findOne({where:{id}});
    }
    async update(id:number,attrs:Partial<User>){
        const user=await this.findOne(id)
        if (!user) {
            throw new Error(`User ${id} not found`)
        }
        Object.assign(user,attrs)
        return this.repo.save(user)
    }

   async remove(id:number){
        const user=await this.findOne(id )
        if (!user) {
            throw new Error(`User ${id} not found`)
        }
        return this.repo.remove(user)
    }
}

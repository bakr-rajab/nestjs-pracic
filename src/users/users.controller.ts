import { Body, Controller, Get, Post, Param, Query, Patch, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create.dto';
import { UsersService } from './users.service'
import { Serialize } from 'src/inerceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Serialize(UserDto) //call function 
@Controller('auth')
export class UsersController {

    constructor(private UsersService: UsersService) { }

    @Get()
    findAllUsers(){
        return this.UsersService.find()
    }

    @Get("search")
    findUsers(@Query("email") email: string) {

        try {
            console.log(email);
            return this.UsersService.search(email)
        } catch (error) {
            console.log(error);
            return error
        }
    }

    @Get("/:id")
    async findUser(@Param("id") id: string) {
        console.log("interseptor is running");
        
        return await this.UsersService.findOne(parseInt(id))
    }

    @Post("/signup")
    createUser(@Body() body: CreateUserDTO) {
        console.log("create user controller >>>")
        this.UsersService.create(body.email, body.password)
        // console.log("ssssss",body);
    }
    @Patch("/:id")
    updateUser(id: number, @Body() body: CreateUserDTO) {
        this.UsersService.update(id, body)
    }

}



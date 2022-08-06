import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";
// import { UserDto } from "src/users/dtos/user.dto";

export function Serialize(dto: any){
    return UseInterceptors(new SerializeInterceptor(dto))
}
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // run somthing before request handle
        // console.log("interceptor context",context);
        return handler.handle().pipe(
            map((data: any) => {
                // console.log("i,m running before responce is sent>>>",data);
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }

}
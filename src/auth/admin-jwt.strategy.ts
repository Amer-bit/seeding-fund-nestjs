import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "./access-token-payload";
import { Admin } from "./schema/admin.schema";

@Injectable()
class AdminJwtStrategy extends PassportStrategy(Strategy, 'adminJwt'){
constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private configService: ConfigService,
    ){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.get('JWT_SECRET'),
    })
}

    async validate(payload: JwtPayload){
        const { email } = payload;
        try {
            const admin = await this.adminModel.findOne({email});
            return admin;
        } catch (error) {
            throw new UnauthorizedException;
        }
    }
}

@Injectable()
export class AdminGuard extends AuthGuard('adminJwt'){};
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ProjectOwner } from "./schema/project-owner.schema";
import { JwtPayload } from "./access-token-payload";

@Injectable()
export class ProjectOwnerJwtStrategy extends PassportStrategy(Strategy, 'ownerJwt'){
constructor(
    @InjectModel(ProjectOwner.name) private ownerModel: Model<ProjectOwner>,
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
            const projectOwner = await this.ownerModel.findOne({email});
            return projectOwner;
        } catch (error) {
            throw new UnauthorizedException;
        }
    }
}

@Injectable()
export class ProjectOwnerGuard extends AuthGuard('ownerJwt'){};
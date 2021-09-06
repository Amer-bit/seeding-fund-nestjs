import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: "follow this formating email@email.com" })
    email: string;

    @IsString()
    @MinLength(8, { message: 'Password length should be longer than 8' })
    @MaxLength(128, {
        message: 'Password length should be shorter than 128',
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password should contain at least big letter a number and symbol',
    })
    password: string;
}
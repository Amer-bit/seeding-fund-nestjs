import { IsEnum, IsString } from "class-validator";

enum sector {
    it = 'IT',
    financials = 'Financials',
    industrials = 'Industrials',
    energy = 'Energy',
    healthCare = 'Health Care',
}
export class CreateFundRequestDto{
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsEnum(sector)
    sector: string;
}

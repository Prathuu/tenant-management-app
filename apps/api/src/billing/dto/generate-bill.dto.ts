import { IsInt, Max, Min } from 'class-validator';

/**
 * DTO for generating a monthly bill
 */
export class GenerateBillDto {
  @IsInt()
  @Min(1)
  @Max(12)
  month: number;

  @IsInt()
  year: number;
}

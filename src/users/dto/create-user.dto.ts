import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'asd@asd.asd' })
  email: string;
  @ApiProperty({ default: 'Azizbek' })
  fullName: string;
  @ApiProperty({
    default: '123456',
  })
  password: string;
}

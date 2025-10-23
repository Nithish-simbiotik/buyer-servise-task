import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierLoginDto } from 'src/dto/supplier/supplier-login.dto';
import { JwtPayload } from 'src/interface/supplier/login-interface';
import { SupplierRepository } from 'src/repos/supplier-repos/supplier.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(SupplierRepository)
    private supplierRepository: SupplierRepository,
    private jwtService: JwtService,
  ) {}
  async loginSupplier(loginDto: SupplierLoginDto) {
    const supplier = await this.supplierRepository.findOne({
      where: [{ userName: loginDto.userName }, { accountPicEmail: loginDto }],
    });
    if (!supplier) {
      throw new UnauthorizedException(`Invalid login`);
    }
    // check password
    // const isValidPassword= await this.verifyPassword(supplier.password,loginDto.password)
    // if (!isValidPassword) {
    //     throw new UnauthorizedException('Invalid credential')
    // }else{

    // }
    const jwtToken = await this.signUpSupplier({
      userId: supplier.id,
      userName: supplier.userName,
      companyName: supplier.companyName,
      companyType: supplier.companyType,
    });

    return {
      tokn: jwtToken,
      supplier: supplier,
    };
  }
  async signUpSupplier(supplier: JwtPayload): Promise<string> {
    return await this.jwtService.sign(supplier);
  }
  /**
   *
   * @param systemStoredPassword
   * @param userDtoPassword
   * @returns
   */
  async verifyPassword(
    systemStoredPassword: string,
    userDtoPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(userDtoPassword, systemStoredPassword);
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}

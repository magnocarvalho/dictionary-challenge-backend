import { ConflictException, Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dtos/signup.dto';

import { UserEntity } from './entity';
import { Repository } from 'typeorm';
import { UserAuth } from 'src/common/interfaces/user.interface';
import { ProfileDto } from 'src/auth/dtos/profile.dto';
import { PageDto, PageOptionsDto } from 'src/common/dtos';
import { HistoryService } from 'src/history/history.service';
import { FavoriteService } from 'src/favorite/favorite.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly historyService: HistoryService,
    private readonly favoriteService: FavoriteService
  ) {}
  /**
   * @description get user profile
   *
   * @param {UserAuth} user
   * @return {*}  {Promise<ProfileDto>}
   * @memberof UserService
   */
  async getProfile(user: UserAuth): Promise<ProfileDto> {
    const me = await this.findByEmail(user?.email);
    delete me.password;
    return me as ProfileDto;
  }

  /**
   * @description get all users history from the database paginated
   *
   * @param {UserAuth} user
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<PageDto<any>>}
   * @memberof UserService
   */
  async getProfileHistory(user: UserAuth, pageOptionsDto: PageOptionsDto): Promise<PageDto<any>> {
    const me = await this.findByEmail(user?.email);
    const { listagem, qtd } = await this.historyService.getHistoric(me.id, pageOptionsDto);
    return new PageDto(listagem, pageOptionsDto, qtd);
  }

  /**
   * @description get all users favorites from the database paginated
   *
   * @param {UserAuth} user
   * @param {PageOptionsDto} pageOptionsDto
   * @return {*}  {Promise<any>}
   * @memberof UserService
   */
  async getProfileFavorites(user: UserAuth, pageOptionsDto: PageOptionsDto): Promise<any> {
    const me = await this.findByEmail(user?.email);
    const { listagem, qtd } = await this.favoriteService.getFavorite(me.id, pageOptionsDto);
    return new PageDto(listagem, pageOptionsDto, qtd);
  }

  /**
   * Create user and save in the database
   *
   * @param {SignupDto} newUser
   * @return {*}  {Promise<UserEntity>}
   * @memberof UserService
   */
  async create(newUser: SignupDto): Promise<UserEntity> {
    try {
      const entriesEntity = this.userRepository.create(newUser);
      return await this.userRepository.save(entriesEntity);
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  /**
   * @description find user by email
   *
   * @param {string} email
   * @return {*}  {Promise<UserEntity>}
   * @memberof UserService
   */
  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new PreconditionFailedException(error);
    }
  }

  /**
   * @description find user by id
   *
   * @param {number} id
   * @return {*}  {Promise<UserEntity>}
   * @memberof UserService
   */
  async findById(id: number): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new PreconditionFailedException(error);
    }
  }
}

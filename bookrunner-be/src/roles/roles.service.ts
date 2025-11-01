import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) { }
  async create(createRoleDto: CreateRoleDto) {
    const role = {
      ...createRoleDto
    }
    await this.roleRepository.save(role);
    return role;
  }

  async findAll() {
    return await this.roleRepository.find();
  }

  async findOne(id: number) {
    const role = await this.roleRepository.find({ where: { id: id } });
    if (!role) {
      throw new NotFoundException('Role not found')
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const updatedUser = {
      ...updateRoleDto
    };
    await this.roleRepository.update(id, updatedUser);
    return role;
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    await this.roleRepository.delete(id);
    return role;
  }
}

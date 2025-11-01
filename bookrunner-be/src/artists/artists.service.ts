import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {

  constructor(
    @Inject("ARTIST_REPOSITORY")
    private artistRepository: Repository<Artist>,
  ) { }

  async create(createArtistDto: CreateArtistDto) {
    const artist = {
      ...createArtistDto
    }
    await this.artistRepository.save(artist);
    return artist;
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: number) {
    const artist = await this.artistRepository.find({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException('Artist not found')
    }
    return artist;
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    const updatedUser = {
      ...updateArtistDto
    };
    await this.artistRepository.update(id, updatedUser);
    return artist;
  }

  async remove(id: number) {
    const artist = await this.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    await this.artistRepository.delete(id);
    return artist;
  }
}

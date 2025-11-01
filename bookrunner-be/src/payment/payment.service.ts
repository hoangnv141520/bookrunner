import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @Inject("PAYMENT_REPOSITORY")
    private paymentRepository: Repository<Payment>,
  ) { }
  async create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
    return await this.paymentRepository.save(payment);
  }

  async findAll() {
    return await this.paymentRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException('payment not found');
    }
    return payment;

  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException('payment not found');
    }
    const updatedUser = {
      ...updatePaymentDto
    };
    await this.paymentRepository.update(id, updatedUser);
    return payment;
  }

  async remove(id: number) {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException('payment not found');
    }
    await this.paymentRepository.delete(id);
    return payment;
  }
}

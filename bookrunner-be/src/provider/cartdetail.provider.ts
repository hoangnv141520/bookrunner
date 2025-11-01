import { CartDetail } from "src/cart-detail/entities/cart-detail.entity";
import { DataSource } from "typeorm";

export const cartDetailProvider = [
    {
        provide: 'CARTDETAIL_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(CartDetail),
        inject: ['DATA_SOURCE'],
    }
];
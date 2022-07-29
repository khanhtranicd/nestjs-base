import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import SellerEntity from '../entities/seller.entity';
@EventSubscriber()
export class SellerSubscriber implements EntitySubscriberInterface<SellerEntity> {
  listenTo() {
    return SellerEntity;
  }

  async afterLoad(seller: SellerEntity): Promise<void> {
    seller.full_name = `${seller?.first_name} ${seller?.last_name}`;
  }
}

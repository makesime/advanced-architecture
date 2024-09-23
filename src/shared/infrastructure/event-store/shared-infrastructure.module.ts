import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { EVENT_STORE_CONNECTION } from '../../../core/core.constants';
import { EventSerializer } from './serializers/event.serializer';
import { EventStorePublisher } from './publishers/event-store.publisher';
import { MongoEventStore } from './mongo-event-store';
import { EventsBridge } from './events-bridge';
import { EventDeserializer } from './deserializer/event.deserializer';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [
    EventSerializer,
    EventStorePublisher,
    MongoEventStore,
    EventsBridge,
    EventDeserializer,
  ],
})
export class SharedInfrastructureModule {}

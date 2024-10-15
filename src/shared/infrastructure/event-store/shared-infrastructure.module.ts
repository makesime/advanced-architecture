import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './schemas/event.schema';
import { EVENT_STORE_CONNECTION } from '../../../core/core.constants';
import { EventSerializer } from './serializers/event.serializer';
import { EventStorePublisher } from './publishers/event-store.publisher';
import { MongoEventStore } from './mongo-event-store';
import { EventsBridge } from './events-bridge';
import { EventDeserializer } from './deserializer/event.deserializer';
import { EventStore } from '../../application/ports/event-store';
import { Event } from './schemas/event.schema';

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
    { provide: EventStore, useExisting: MongoEventStore },
  ],
  exports: [EventStore],
})
export class SharedInfrastructureModule {}

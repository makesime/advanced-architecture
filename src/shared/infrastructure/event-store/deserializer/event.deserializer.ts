import { Injectable, Type } from '@nestjs/common';
import { Event } from '../schemas/event.schema';
import { SerializableEvent } from '../../../domain/interfaces/serializable-event';
import { AlarmCreatedEvent } from '../../../../alarms/domain/events/alarm-created.event';
import { EventClsRegistry } from '../event-cls.registry';

@Injectable()
export class EventDeserializer {
  deserialize<T>(event: Event): SerializableEvent<T> {
    const eventCls = this.getEventClassByType(event.type);
    return {
      ...event,
      data: this.instantiateSerializedEvent(eventCls, event.data),
    };
  }

  getEventClassByType(type: string) {
    return EventClsRegistry.get(type);
  }

  instantiateSerializedEvent<T extends Type>(
    eventCls: T,
    data: Record<string, any>,
  ) {
    return Object.assign(Object.create(eventCls.prototype), data);
  }
}

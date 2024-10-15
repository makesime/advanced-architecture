import { SerializableEvent } from '../../domain/interfaces/serializable-event';

export abstract class EventStore {
  abstract persist(
    eventOrEvents: SerializableEvent | SerializableEvent[],
  ): Promise<void>;
  abstract getEventByStreamId(streamId: string): Promise<SerializableEvent[]>;
}

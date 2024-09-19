/** Responsible for serializing Domain Event instances
 * into a format that can be stored in the event store
 *
 * Provides a single serialize() method that accepts 2 arguments,
 * the Event instance and the Aggregate Root instance that dispatched the event
 */

import { Injectable } from '@nestjs/common';
import { VersionedAggregateRoot } from '../../../domain/aggregate-root';
import { SerializableEvent } from '../../../domain/interfaces/serializable-event';

@Injectable()
export class EventSerializer {
  serialize<T>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ): SerializableEvent<T> {
    const eventType = event.constructor?.name;
    if (!eventType) {
      throw new Error('Incompatible event type');
    }

    /**
     * Extracting the eventType and aggrateId and returning a serialized event object
     */
    const aggregateId = dispatcher.id;
    return {
      streamId: aggregateId,
      position: dispatcher.version.value + 1,
      type: eventType,
      data: this.toJSON(event),
    };
  }

  /**
   * Iterates over all the properties of the event
   * IF a property has a toJSON method, calls it and return the result
   * Otherwise, returns the original value
   *
   * @param data
   * @private
   */
  private toJSON<T>(data: T) {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if ('toJSON' in data && typeof data.toJSON === 'function') {
      return data.toJSON();
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.toJSON(item));
    }

    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = this.toJSON(value);
      return acc;
    }, {});
  }
}

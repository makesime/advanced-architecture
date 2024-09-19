/**
 * Serialized event payload.
 * Iterates over all the properties of the event payload and serializes them.
 * If a property has a toJSON method, it will infer the return type of that method as the serialized type.
 * @template T Event data type
 *
 * We need to serialize the event payload before storing it in the db to auto-unwrap any value-objects
 * and convert them to their corresponding primitive
 */
// Used to infer the serialized type of a given event payload
// Recursive type that iterates over all of the properties
export type SerializedEventPayload<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends { toJSON(): infer U }
        ? U
        : SerializedEventPayload<T[K]>;
    }
  : T;

/**
 * Serializable event that can be stored in the event store.
 * @template T Event data type
 *
 * Described the shape of the event that can be stored in the Event Store
 */
export interface SerializableEvent<T = any> {
  streamId: string;
  type: string;
  position: number;
  // Serialized version of the event
  data: SerializedEventPayload<T>;
}

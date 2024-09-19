import { HydratedDocument, SchemaTypes } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class Event {
  // ID of the strean to which the event belongs
  // Usually equals the Aggregate ID, which can be prefixed with the Aggregate type
  @Prop()
  streamId: string;

  @Prop()
  type: string;

  // Position of the event in the stream
  @Prop()
  position: number;

  // Event payload
  @Prop({
    type: SchemaTypes.Mixed,
  })
  data: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
// Unique index on the streamId and position fields
// We wanna make sure we're never gonna have 2 events with the same position, in the same stream
// Could occur if we have multiple operations happening at the same time, on the same aggregate, in parallel
EventSchema.index({ streamId: 1, position: 1 }, { unique: true });

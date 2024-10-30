import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SerializedEventPayload } from '../../../shared/domain/interfaces/serializable-event';
import { AlarmAcknowledgeEvent } from '../../domain/events/alarm-acknowledge.event';
import { Logger } from '@nestjs/common';
import { UpsertMaterializedAlarmRepository } from '../ports/upsert-materialized-alarm.repository';

@EventsHandler(AlarmAcknowledgeEvent)
export class AlarmAcknowledgeEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmAcknowledgeEvent>>
{
  private readonly logger = new Logger(AlarmAcknowledgeEvent.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmAcknowledgeEvent>) {
    this.logger.log(`Alarm Acknowledged Event: ${JSON.stringify(event)}`);
    // In a real-world application, we would have to ensure that this event is
    // redelivered in case of a failure. Otherwise, we would end up with an inconsistent state.
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarmId,
      isAcknowledged: true,
    });
  }
}

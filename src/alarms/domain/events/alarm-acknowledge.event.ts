import { AutoWiredEvent } from '../../../shared/decorators/autowired-event.decorator';

@AutoWiredEvent
export class AlarmAcknowledgeEvent {
  constructor(public readonly alarmId: string) {}
}

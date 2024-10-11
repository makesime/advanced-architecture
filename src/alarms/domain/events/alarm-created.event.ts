import { Alarm } from '../alarm';
import { AutoWiredEvent } from '../../../shared/decorators/autowired-event.decorator';

@AutoWiredEvent
export class AlarmCreatedEvent {
  constructor(public readonly alarm: Alarm) {}
}

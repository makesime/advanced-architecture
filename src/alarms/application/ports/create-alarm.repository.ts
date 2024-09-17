import { Alarm } from '../../domain/alarm';

// Since we now have a Read model, only responsibility of the Repo is to "create" alarms
export abstract class CreateAlarmRepository {
  abstract save(alarm: Alarm): Promise<Alarm>;
}

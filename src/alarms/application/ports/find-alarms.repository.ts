import { AlarmReadModel } from '../../domain/read-models/alarm.read-model';

// Will return object that fulfill the alarm "read" model interface
export abstract class FindAlarmsRepository {
  abstract findAll(): Promise<AlarmReadModel[]>;
}

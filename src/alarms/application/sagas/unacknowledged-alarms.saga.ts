import { Injectable, Logger } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import {
  EMPTY,
  filter,
  first,
  map,
  mergeMap,
  Observable,
  race,
  timer,
} from 'rxjs';
import { AlarmAcknowledgeEvent } from '../../domain/events/alarm-acknowledge.event';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';
import { NotifyFacilitySupervisorCommand } from '../commands/notify-facility-supervisor.command';

@Injectable()
export class UnacknowledgedAlarmsSaga {
  private readonly logger = new Logger(UnacknowledgedAlarmsSaga.name);

  @Saga()
  start = (events$: Observable<any>): Observable<ICommand> => {
    // A stream of alarm acknowledged events
    const alarmAcknowledgedEvents$ = events$.pipe(
      ofType(AlarmAcknowledgeEvent),
    );

    // A stream of alarm created events
    const alarmCreatedEvent$ = events$.pipe(ofType(AlarmCreatedEvent));

    return alarmCreatedEvent$.pipe(
      mergeMap((alarmCreatedEvent) =>
        race(
          alarmAcknowledgedEvents$.pipe(
            filter(
              (alarmAcknowledgedEvent) =>
                alarmAcknowledgedEvent.alarmId === alarmCreatedEvent.alarm.id,
            ),
            first(),
            // if the alarm is acknowledged, we don't need to do anything
            // Just return an empty observable that never emits
            mergeMap(() => EMPTY),
          ),
          timer(15000).pipe(map(() => alarmCreatedEvent)),
        ),
      ),
      map((alarmCreatedEvent) => {
        this.logger.debug(
          `!!! Alarm "${alarmCreatedEvent.alarm.name}" not acknowledged in 15 seconds`,
        );

        const facilityId = '12345';
        return new NotifyFacilitySupervisorCommand(facilityId, [
          alarmCreatedEvent.alarm.id,
        ]);
      }),
    );
  };
}

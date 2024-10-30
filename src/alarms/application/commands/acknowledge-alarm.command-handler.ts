import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AcknowledgeAlarmCommand } from './acknowledge-alarm.command';
import { Logger } from '@nestjs/common';
import { AggregateRehydrator } from '../../../shared/application/aggregate-rehydrator';
import { Alarm } from '../../domain/alarm';

@CommandHandler(AcknowledgeAlarmCommand)
export class AcknowledgeAlarmCommandHandler
  implements ICommandHandler<AcknowledgeAlarmCommand>
{
  private readonly logger = new Logger(AcknowledgeAlarmCommandHandler.name);

  constructor(private readonly aggregateRehydrator: AggregateRehydrator) {}

  async execute(command: AcknowledgeAlarmCommand) {
    this.logger.debug(
      `Processing acknowledge alarm command: ${JSON.stringify(command)}`,
    );

    const alarm = await this.aggregateRehydrator.rehydrate(
      command.alarmId,
      Alarm,
    );
    alarm.acknowledge();
    alarm.commit();

    return alarm;
  }
}

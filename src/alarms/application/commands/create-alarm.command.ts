import { Linter } from 'eslint';
import Severity = Linter.Severity;

export class CreateAlarmCommand {
  constructor(public readonly name: string, public readonly severity: string) {
  }
}
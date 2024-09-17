// Validation should be added here, but isn't the focus of this course

export class CreateAlarmDto {
  name: string;
  severity: string;
  triggeredAt: Date;
  items: Array<{
    name: string;
    type: string;
  }>;
}

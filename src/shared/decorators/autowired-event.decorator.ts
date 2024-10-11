import { EventClsRegistry } from '../infrastructure/event-store/event-cls.registry';

export const AutoWiredEvent: ClassDecorator = (target: any) => {
  EventClsRegistry.add(target);
};

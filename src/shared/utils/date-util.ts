import moment, { DurationInputArg1, DurationInputArg2, Moment } from 'moment';

export default class DateUtil {
  static formatDate(date: Moment | Date, formatType): string | number {
    return moment(date).format(formatType);
  }

  static currentDate(formatType = null): Moment | string | number {
    if (!formatType) {
      return moment();
    }

    return DateUtil.formatDate(moment(), formatType);
  }

  static isAfter(srcDate, destDate): boolean {
    return moment(destDate).isAfter(srcDate);
  }

  static isBefore(srcDate, destDate): boolean {
    return moment(destDate).isBefore(srcDate);
  }

  static isSame(srcDate, destDate): boolean {
    return moment(destDate).isSame(srcDate);
  }

  static addDuration(
    date: Moment | Date | string | number,
    amount: DurationInputArg1,
    unit: DurationInputArg2,
  ): Moment {
    return moment(date).add(amount, unit);
  }

  static diff(srcDate, destDate): number {
    return moment(srcDate).diff(destDate);
  }
}

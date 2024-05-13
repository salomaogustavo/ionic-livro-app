import { ActivityInterface } from "./activity.interface";
import { isNumber, isString } from '@functions';

export class Activity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;

  constructor(data: ActivityInterface) {
    this.activity = isString(data.activity);
    this.type = isString(data.type);
    this.participants = isNumber(data.participants);
    this.price = isNumber(data.price);
    this.link = isString(data.link);
    this.key = isString(data.key);
    this.accessibility = isNumber(data.accessibility);
  }
}


//import { HttpException } from "@nestjs/common";

export class ServiceBookDto {
  _id: string;
  title: string;
  author: string;
  rating: number;
}
export class ServiceResponseDto<T> {
  data?: T;
  error?: any;
}

import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AccessRefreshResponse {
  @Expose()
  accessToken: string;
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}

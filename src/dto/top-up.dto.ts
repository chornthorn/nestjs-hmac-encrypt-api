export abstract class TopUpNotifyDto {
  readonly message: string;
  readonly tran_id: string;
  readonly success: boolean;
  readonly status: string;
}

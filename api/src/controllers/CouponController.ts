import { Controller, Route, Post, Body, Tags } from "tsoa";

interface ValidateCouponBody {
  code: string;
  subtotal: number;
}

interface ValidateCouponResponse {
  valid: boolean;
  discount: number;
}

@Route("coupons")
@Tags("Coupons")
export class CouponController extends Controller {

  @Post("validate")
  public async validate(@Body() body: ValidateCouponBody): Promise<ValidateCouponResponse> {
    return {
      valid: body.code === "IKFOME10",
      discount: body.code === "IKFOME10" ? 10 : 0
    };
  }
}

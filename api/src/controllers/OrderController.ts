import { Controller, Route, Post, Get, Put, Body, Path, Tags } from "tsoa";

interface OrderItem {
  id: string;
  quantity: number;
}

interface OrderBody {
  restaurantId: string;
  items: OrderItem[];
  address: string;
  paymentMethod: string;
  coupon?: string;
}

interface Order {
  id: string;
  restaurantId: string;
  items: OrderItem[];
  address: string;
  paymentMethod: string;
  status: string;
}

interface UpdateStatusBody {
  status: string;
}

@Route("orders")
@Tags("Orders")
export class OrderController extends Controller {

  @Post()
  public async create(@Body() body: OrderBody): Promise<{ id: string }> {
    return { id: "mockOrder123" };
  }

  @Get("{id}")
  public async get(@Path() id: string): Promise<Order> {
    return {
      id,
      restaurantId: "1",
      items: [{ id: "1", quantity: 2 }],
      address: "Rua Exemplo, 123",
      paymentMethod: "PIX",
      status: "preparing"
    };
  }

  @Get("me")
  public async myOrders(): Promise<Order[]> {
    return [
      {
        id: "mockOrder123",
        restaurantId: "1",
        items: [{ id: "1", quantity: 2 }],
        address: "Rua Exemplo, 123",
        paymentMethod: "PIX",
        status: "delivered"
      }
    ];
  }

  @Put("{id}/status")
  public async updateStatus(@Path() id: string, @Body() body: UpdateStatusBody): Promise<{ message: string }> {
    return { message: `Order ${id} status updated to ${body.status} (mock)` };
  }
}

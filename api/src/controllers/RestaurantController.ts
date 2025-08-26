import { Controller, Route, Get, Query, Path } from "tsoa";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  open: boolean;
}

interface Item {
  id: string;
  name: string;
  price: number;
}

@Route("restaurants")
export class RestaurantController extends Controller {

  @Get()
  public async list(
    @Query() search?: string,
    @Query() cuisine?: string,
    @Query() open?: boolean
  ): Promise<Restaurant[]> {
    return [
      { id: "1", name: "Pizza Place", cuisine: "Italian", open: true },
      { id: "2", name: "Sushi House", cuisine: "Japanese", open: false }
    ];
  }

  @Get("{id}")
  public async get(@Path() id: string): Promise<Restaurant> {
    return { id, name: "Pizza Place", cuisine: "Italian", open: true };
  }

  @Get("{id}/items")
  public async items(@Path() id: string): Promise<Item[]> {
    return [
      { id: "1", name: "Margherita Pizza", price: 35 },
      { id: "2", name: "Pepperoni Pizza", price: 40 }
    ];
  }
}

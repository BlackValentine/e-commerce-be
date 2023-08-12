import { IsNotEmpty } from "class-validator";
import { Inventory } from "../entities/inventory.entity";

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  roast: string;

  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  taste: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  inventory: Inventory[];
}

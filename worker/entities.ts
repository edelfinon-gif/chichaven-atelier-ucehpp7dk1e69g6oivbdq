import { IndexedEntity } from "./core-utils";
import type { User, Chat, ChatMessage, Product } from "@shared/types";
import { MOCK_CHAT_MESSAGES, MOCK_CHATS, MOCK_USERS, MOCK_PRODUCTS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export type WishlistState = { id: string; productIds: string[] };
export class WishlistEntity extends IndexedEntity<WishlistState> {
  static readonly entityName = "wishlist";
  static readonly indexName = "wishlists";
  static readonly initialState: WishlistState = { id: "", productIds: [] };
}
export class ProductEntity extends IndexedEntity<Product> {
  static readonly entityName = "product";
  static readonly indexName = "products";
  static readonly initialState: Product = {
    id: "", name: "", description: "", price: 0, imageUrl: "", category: "", brand: "", colors: []
  };
  static seedData = MOCK_PRODUCTS;
}
import axios from 'axios';
import { Category, Image, ProductOption } from '../types';

const API_BASE_URL = process.env.API_BASE_URL
                     || 'https://shop-demo-api-04.fly.dev/admin';

export default class ApiService {
  private instance = axios.create({
    baseURL: API_BASE_URL,
  });

  private accessToken = '';

  setAccessToken(accessToken: string) {
    if (accessToken === this.accessToken) {
      return;
    }

    const authorization = accessToken ? `Bearer ${accessToken}` : undefined;

    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: { Authorization: authorization },
    });

    this.accessToken = accessToken;
  }

  fetcher() {
    return async (url: string) => {
      const { data } = await this.instance.get(url);
      return data;
    };
  }

  async login({ email, password }: {
    email: string;
    password: string;
  }): Promise<string> {
    const { data } = await this.instance.post('/session', { email, password });
    const { accessToken } = data;
    return accessToken;
  }

  async logout(): Promise<void> {
    await this.instance.delete('/session');
  }

  async fetchCurrentUser(): Promise<{
    id: string;
    name: string;
  }> {
    const { data } = await this.instance.get('/users/me');
    const { id, name } = data;
    return { id, name };
  }

  async fetchCategories(): Promise<Category[]> {
    const { data } = await this.instance.get('/categories');
    const { categories } = data;
    return categories;
  }

  async createCategory({ name }:{ name: string; }) {
    await this.instance.post('/categories', { name });
  }

  async updateCategory({ categoryId, name, hidden }:
    { categoryId: string; name: string; hidden: boolean; }) {
    await this.instance.patch(`/categories/${categoryId}`, { name, hidden });
  }

  async updateOrder({ orderId, status }: { orderId: string; status: string; }) {
    await this.instance.patch(`/orders/${orderId}`, { status });
  }

  async updateProduct({
    productId,
    categoryId,
    images,
    name,
    price,
    options,
    description,
  }:{
    productId: string;
    categoryId: string;
    images: Image[];
    name: string;
    price: number;
    options: ProductOption[];
    description: string;
  }) {
    await this.instance.patch(`/products${productId}`, {
      categoryId, images, name, price, options, description,
    });
  }

  async createProduct({
    categoryId,
    images,
    name,
    price,
    options,
    description,
  }:{
    categoryId: string;
    images: Image[];
    name: string;
    price: number;
    options: ProductOption[];
    description: string;
  }) {
    await this.instance.patch('/products', {
      categoryId, images, name, price, options, description,
    });
  }
}

export const apiService = new ApiService();

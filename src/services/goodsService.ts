import axios from 'axios';
import { GoodsItem } from '../models/GoodsItem';
import { ErrorResponse, DataResponse } from '../models/responses/responses';

const BASE_URL = 'http://127.0.0.1:8080';
const GOODS_PATH = '/goods';

class GoodsService {
  private errorMessage: string;

  constructor() {
    this.errorMessage = 'Something went wrong';
  }

  private async performRequest({
    method = 'get',
    path,
    body,
  }: {
    method: string;
    path: string;
    body?: any;
  }) {
    try {
      const response = await axios.request({
        url: path,
        method,
        baseURL: BASE_URL,
        data: body || undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        return { ok: true, data: response.data };
      }
      return { ok: false, error: this.errorMessage };
    } catch (err) {
      return { ok: false, error: this.errorMessage };
    }
  }

  getGoods(): Promise<DataResponse<GoodsItem> | ErrorResponse> {
    return this.performRequest({
      path: GOODS_PATH,
      method: 'get',
    });
  }
  createGoodsItem(goodsItem: GoodsItem) {
    const jsonBody = JSON.stringify(goodsItem);
    return this.performRequest({
      method: 'post',
      path: GOODS_PATH,
      body: jsonBody,
    });
  }
  removeGoodsItem(itemId: string) {
    return this.performRequest({
      method: 'delete',
      path: `${GOODS_PATH}/${itemId}`,
    });
  }
  updateGoodsItem(goodsItem: GoodsItem) {
    const jsonBody = JSON.stringify(goodsItem);
    return this.performRequest({
      method: 'put',
      path: `${GOODS_PATH}/${goodsItem.id}`,
      body: jsonBody,
    });
  }
}

export default new GoodsService();

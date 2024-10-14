import { Injectable  } from '@nestjs/common';
import { Product  } from 'src/models/product.model';

@Injectable()
export class ProductService {
    // method: Product
    private products:Product[]= [
        {id:1, categoryId:2, price:80000, productName:"Keyboard"}
        {id:2, categoryId:3, price:90000, productName:"Hieu Tran"}
    ]

    getProducts(): Product[] {
        return this.products;
    }

    createProduct(): string {
        return 'POST PRODUCT';
    }

    detailProduct(id: number): Product {
        // parse ra number
        return this.products.find(item => item.id === Number(id))
    }

    updateProducts(): string {
        return 'UPDATE PRODUCT';
    }
  
    deleteProducts(): string {
        return 'DELETE PRODUCT';
    }
}
import { Injectable } from '@nestjs/common';
import { IProductRepository } from "src/interfaces/IProductRepository";
import { Product } from "../../models/product.model";
import { ProductDto } from 'src/dto/product.dto';
import { MetaParams } from 'src/constant/type';

@Injectable()
export class ProductRepository implements IProductRepository {
    private products: Product[] = [
        { id: 1, productName: 'Pizza Phô Mai', categoryId: 1, description: 'Phô mai, muối', price: 199000},
        { id: 2, productName: 'Pizza Thịt Bầm', categoryId: 1, description: 'Thịt bầm, sốt cà chua', price: 199000},
        { id: 3, productName: 'Pizza Hải Sản', categoryId: 1, description: 'Vị tôm, cua', price: 199000},
        { id: 4, productName: 'Pizza Hongkong', categoryId: 2, description: 'Vị sa tế, thơm ngon', price: 199000},
        { id: 5, productName: 'Pizza Nấm Chua', categoryId: 2, description: 'Nấm xào', price: 199000},
        { id: 6, productName: 'Pizza Kim Chi', categoryId: 2, description: 'Vị kim chi', price: 199000},
        { id: 7, productName: 'Pizza Củ Cải', categoryId: 2, description: 'Vị củ cải', price: 199000},
        { id: 8, productName: 'Pizza Thượng Hải', categoryId: 2, description: 'Vị sa bò, thơm ngon', price: 199000},
        { id: 9, productName: 'Pizza Cua', categoryId: 2, description: 'Vị cua biển', price: 199000},
        { id: 10, productName: 'Pizza Mực', categoryId: 2, description: 'Vị mực biển', price: 199000},
        { id: 11, productName: 'Pizza Tôm', categoryId: 2, description: 'Vị tôm biển', price: 199000},
        { id: 12, productName: 'Pizza Ốc', categoryId: 2, description: 'Vị ốc biển', price: 199000},
    ];

    findAll(): Product[] {
        return this.products;
    }

    create(data: Partial<Product>): Product {
        const product: Product = {
            id: Math.random(),
            ...data
        };
        this.products = [product, ...this.products];
        return product;
    }

    findById(id: number): Product {
        const index: number = this.products.findIndex(item => +item?.id === +id);
        return this.products[index];
    }

    update(id: number, data: Partial<ProductDto>): Product {
        const index: number = this.products.findIndex(item => +item?.id === +id);
        this.products[index].productName = data.productName;
        this.products[index].price = data.price;
        this.products[index].categoryId = data.categoryId;
        return this.products[index];
    }

    delete(id: number): boolean {
        const index: number = this.products.findIndex(item => +item?.id === +id);
        if (index !== 1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }

     // page = 2 thì nó sẽ hiện id =4,5,6 
    // vị trí start = page (2) - 1 = 1 * limit 3 => nên có id = 1,2,3
    // vị trí end = page (2) * 3 = 6 nên sẽ bắt đầu vị trí số 6 => nên có id = 7,8,9
    findProductHome(meta: MetaParams): Product[] {
        // limit để tối đa 3 sp sau khi gọi
        const limit = 3;
        // vị trí start and end
        const end = Number(meta.page) * limit;
        if (!meta.search) {
            const start = (Number(meta.page) - 1) * limit;
            const newProducts = this.products.slice(start, end);
            return newProducts;
        } else {
            // search vị trí 0 đến page 2 => nó sẽ lấy id =1,2,3,4,5,6
            let searchProducts = this.products.slice(0, end);
            return searchProducts.filter(item => item.productName.toUpperCase().indexOf(meta.search.toUpperCase()) !== -1);
        }
    }
}
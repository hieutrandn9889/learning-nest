import { Injectable  } from '@nestjs/common';
import { ProductDto } from 'src/dto/product.dto';
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
    
    createProduct(productDto: ProductDto): Product {
        // tạo ra 1 đối tượng mới
        const product: Product = {
            id: Math.random(),
            // lấy thuộc tính từ productDto đã hứng đc từ client
            ...productDto
        };

        // đẩy products list này vào trong đối tượng mới product
        this.products.push(product);

        // return lại đối tượng cho client ==> nên phải trả ra là Product (createProduct(productDto: ProductDto): Product)
        return product;

        // nhận data của DTO vào service
        // return productDto;
    }

    detailProduct(id: number): Product {
        // parse ra number
        return this.products.find(item => item.id === Number(id))
    }

    updateProducts(productDto: ProductDto, id: number): Product {
        // tìm vị trí index thông qua id mà ở đây ID là kiểu string nên phải ép kiểu
        const index = this.products.findIndex(item => item.id=== Number(id));
        this.products[index].categoryId = productDto.categoryId;
        this.products[index].productName = productDto.productName;
        this.products[index].price = productDto.price;
        return this.products[index];
    }
  
    deleteProducts(): string {
        return 'DELETE PRODUCT';
    }
}
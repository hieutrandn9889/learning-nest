import { Injectable  } from '@nestjs/common';
import { BrandDto } from 'src/dto/brand.dto';
import { ProductDto } from 'src/dto/product.dto';
import { Brand  } from 'src/models/brand.model';

@Injectable()
export class BrandService {
    // method: Brand
    private brands:Brand[]= [
        {id:1, categoryId:2, brandDescription:"Nice", brandName:"Honda"},
        {id:2, categoryId:3, brandDescription:"Beautiful", brandName:"Hieu Tran"}
    ]

    getBrands(): Brand[] {
        return this.brands;
    }
    
    createBrand(brandDto: BrandDto): Brand {
        // tạo ra 1 đối tượng mới
        const product: Brand = {
            id: Math.random(),
            // lấy thuộc tính từ brandDto đã hứng đc từ client
            ...brandDto
        };

        // đẩy brands list này vào trong đối tượng mới product
        this.brands.push(product);

        // return lại đối tượng cho client ==> nên phải trả ra là Product (createProduct(productDto: ProductDto): Product)
        return product;

        // nhận data của DTO vào service
        // return productDto;
    }

    detailBrand(id: number): Brand {
        // parse ra number
        return this.brands.find(item => item.id === Number(id))
    }

    updateBrands(brandDto: BrandDto, id: number): Brand {
        // tìm vị trí index thông qua id mà ở đây ID là kiểu string nên phải ép kiểu
        const index = this.brands.findIndex(item => item.id=== Number(id));
        this.brands[index].categoryId = brandDto.categoryId;
        this.brands[index].brandDescription = brandDto.brandDescription;
        this.brands[index].brandName = brandDto.brandName;
        return this.brands[index];
    }
  
    // truyen id tra ve boolean
    deleteBrands(id:number): boolean {
        const index = this.brands.findIndex(item => item.id=== Number(id));
        // dk index khac -1 se tim index tai dung vi tri splice
        if (index!==-1) {
            this.brands.splice(index, 1);
            return true;     
        }
        return false
        
    }
}
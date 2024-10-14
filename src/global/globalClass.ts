export class ResponseData<D>{
    
    // data kiểu D or D mảng
    data: D | D[];
    statusCode: number;
    message: string;

    constructor(data:D | D[], statusCode: number, message: string){
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
        return this;

    }

} 
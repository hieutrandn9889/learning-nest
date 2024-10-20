// bên trong ResponseType là 1 model D và nó nhận vào 1 model
// data?: D | D[], ==> ở đây là data object or data mảng

export type ResponseType<D> = {

    //data trả về là model D và mảng model đó
    data?: D | D[],
    statusCode?: number,
    message?: string,
}
import { Controller, Get, Query } from '@nestjs/common';
import { Public } from 'src/constant/decorator';
import { PageService } from './page.service';


export type SearchByNameReq = {
  name: string,
  page: number,
  pageSize: number,
}

@Controller('rolePage')
export class PageController {
  constructor(protected readonly pageService: PageService) { }

  // page
  @Get('/')
  @Public()
  async page(@Query() req: SearchByNameReq): Promise<any[]> {
    try {
      const roleRes = await this.pageService.findAllPage(req);
      return roleRes;
    } catch (error){
      return null;
    }
  }
} 


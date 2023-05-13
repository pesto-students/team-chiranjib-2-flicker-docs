import { NextFunction, Request, Response } from 'express';
// import { Container } from 'typedi';
// import { User } from '@interfaces/users.interface';
// import { TestService } from '@services/test.service';

export class TestController {
  //   public user = Container.get(TestService);

  public getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('in get data');
      //   const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: [{ name: 'joe' }, { name: 'chinmay' }], message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

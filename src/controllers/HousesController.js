import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";


export class HousesController extends BaseController {
  constructor() {
    super('api/houses');
    this.router
      .get('', )
  }

  /**
* @param {import("express").Request} req,
* @param {import("express").Response} res,
* @param {import("express").NextFunction} next,
*/
  async getHousesByQuery(req, res, next) {
    try {
      const houseQuery = req.query;
      const houses = await housesService.getHouses(houseQuery);
      res.send(houses);
    } catch (error) {
      next(error);
    }
  }
}
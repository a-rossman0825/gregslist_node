import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";


export class HousesController extends BaseController {
  constructor() {
    super('api/houses');
    this.router
      .get('', this.getHousesByQuery)
      .post('', this.createHouse)
      
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

  /**
* @param {import("express").Request} req,
* @param {import("express").Response} res,
* @param {import("express").NextFunction} next,
*/
  async createHouse(req, res, next) {
    try {
      const houseData = req.body;
      const house = await housesService.postHouse(houseData);
      res.send(house);
    } catch (error){
      next(error);
    }
  }
}
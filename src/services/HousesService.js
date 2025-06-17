import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { dbContext } from "../db/DbContext.js";


class HousesService {

  async getHouses(houseQuery) {
    const pageNumber = parseInt(houseQuery.page) || 1;
    delete houseQuery.page;

    const sortBy = houseQuery.sort;
    delete houseQuery.sort;

    const housesLimit = 10;
    const skipAmount = (pageNumber - 1) * housesLimit;

    const housesCount = await dbContext.Houses.countDocuments(houseQuery);
    const totalPages = Math.ceil(housesCount / housesLimit);

    if (pageNumber > totalPages) {
      throw new BadRequest(`${pageNumber} is larger than the max amount of pages (${totalPages})`);
    }

    const houses = await dbContext.Houses
    .find(houseQuery)
    .sort(sortBy)
    .skip(skipAmount)
    .limit(housesLimit)
    .populate('creator', 'name picture');

    const pageRes = {
      currentPage: pageNumber,
      previousPage: pageNumber - 1 || null,
      nextPage: totalPages == pageNumber ? null : pageNumber + 1,
      totalResults: housesCount,
      totalPages: totalPages,
      houses: houses
    }
    return pageRes;
  }

  async postHouse(houseData) {
    const house = await dbContext.Houses.create(houseData);
    return house;
  }

}

export const housesService = new HousesService();
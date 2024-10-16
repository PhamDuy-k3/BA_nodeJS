import Brands from "../models/brands.model.js";

export default class BrandController {
  async create(req, res) {
    try {
      const data = req.body;
      const file = req.file;
      if (file) {
        data.logo = file.filename;
      }
      const brands = await Brands.create(data);
      res.json(brands);
    } catch (error) {
      res.json({
        error: {
          message: error.message,
        },
      });
    }
  }
  async show(req, res) {
    try {
      const { brandId } = req.params;
      const brand = await Brands.findById(brandId);
      res.json({
        data: brand,
      });
    } catch (error) {
      res.json(error);
    }
  }
  async index(req, res) {
    try {
      const brands = await Brands.find({});
      res.json({
        data: brands,
        status_code: 200,
      });
    } catch (error) {
      res.json({
        error: {
          message: error.message,
        },
      });
    }
  }
}

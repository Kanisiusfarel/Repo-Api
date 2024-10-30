// file ini digunakan untuk menghandle response tiap feature
// dilarang meletakkan feature logic disini

import { FeatureService } from "../services/admin.service";

export class FeatureController {
  private featureService: FeatureService;

  constructor() {
    this.featureService = new FeatureService();
  }

  async getFeatures() {
    await this.featureService.getFeatures();
  }
}

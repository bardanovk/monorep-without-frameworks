var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// server/apps/first-server/main.ts
var import_core = require("../../../node_modules/@nestjs/core/index.js");

// server/apps/first-server/app.module.ts
var import_common3 = require("../../../node_modules/@nestjs/common/index.js");

// server/apps/first-server/modules/app/app.controller.ts
var import_common = require("../../../node_modules/@nestjs/common/index.js");
var AppController = class {
  constructor(appService) {
    this.appService = appService;
  }
  getHello() {
    return this.appService.getHello();
  }
};
__decorateClass([
  (0, import_common.Get)()
], AppController.prototype, "getHello", 1);
AppController = __decorateClass([
  (0, import_common.Controller)()
], AppController);

// server/apps/first-server/modules/app/app.service.ts
var import_common2 = require("../../../node_modules/@nestjs/common/index.js");
var AppService = class {
  getHello() {
    return "Hello World!";
  }
};
AppService = __decorateClass([
  (0, import_common2.Injectable)()
], AppService);

// server/apps/first-server/app.module.ts
var AppModule = class {
};
AppModule = __decorateClass([
  (0, import_common3.Module)({
    imports: [],
    controllers: [AppController],
    providers: [AppService]
  })
], AppModule);

// server/apps/first-server/main.ts
async function bootstrap() {
  const app = await import_core.NestFactory.create(AppModule);
  await app.listen(3e3);
}
bootstrap();

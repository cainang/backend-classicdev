"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * i);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};
var prisma = new client_1.PrismaClient();
var routes = express_1["default"].Router();
routes.post('/create/quest', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pergunta, itens, item_correto, response, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, pergunta = _a.pergunta, itens = _a.itens, item_correto = _a.item_correto;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.$connect()];
            case 2:
                _b.sent();
                return [4 /*yield*/, prisma.quest.create({
                        data: {
                            question: pergunta,
                            type: 'multiple',
                            difficulty: req.query.dificudade,
                            correct_answer: item_correto,
                            incorrect_answers: [itens[0], itens[1], itens[2]],
                            category: "Entertainment: " + req.query.dificudade
                        }
                    })];
            case 3:
                response = _b.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, res.json(error_1)];
            case 5: return [2 /*return*/, res.json(response)];
        }
    });
}); });
routes.get('/quests', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dificudade, productsCount, stateGet, questions, _loop_1, out_index_1, index, Quest_Shuffle, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dificudade = req.query.dificudade;
                return [4 /*yield*/, prisma.quest.count({ where: { difficulty: dificudade } })];
            case 1:
                productsCount = _a.sent();
                stateGet = 0;
                questions = [];
                _loop_1 = function (index) {
                    var skip, response, response_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                skip = Math.floor(Math.random() * productsCount);
                                stateGet = 0;
                                if (!(questions.length == 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, prisma.quest.findMany({ skip: skip, take: 1, where: { difficulty: dificudade } })];
                            case 1:
                                response = _b.sent();
                                questions.push(response[0]);
                                index++;
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, prisma.quest.findMany({ skip: skip, take: 1, where: { difficulty: dificudade } })];
                            case 3:
                                response_1 = _b.sent();
                                questions.map(function (quest) {
                                    if (quest.question == response_1[0].question) {
                                        stateGet++;
                                    }
                                });
                                if (stateGet == 0) {
                                    questions.push(response_1[0]);
                                    index++;
                                }
                                _b.label = 4;
                            case 4:
                                out_index_1 = index;
                                return [2 /*return*/];
                        }
                    });
                };
                index = 0;
                _a.label = 2;
            case 2:
                if (!(index < 10)) return [3 /*break*/, 5];
                return [5 /*yield**/, _loop_1(index)];
            case 3:
                _a.sent();
                index = out_index_1;
                _a.label = 4;
            case 4: return [3 /*break*/, 2];
            case 5:
                Quest_Shuffle = shuffle(questions);
                data = {
                    response_code: 0,
                    results: Quest_Shuffle
                };
                return [2 /*return*/, res.json(data)];
        }
    });
}); });
routes["delete"]('/delete/quest/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.quest["delete"]({ where: { id: id } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, res.json(response)];
        }
    });
}); });
/* routes.delete('/delete/quest/tudo', async (req, res) => {
  const response = await prisma.quest.deleteMany();
  return res.json(response);
})
 */
module.exports = routes;
//# sourceMappingURL=routes.js.map
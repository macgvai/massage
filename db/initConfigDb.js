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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var client_1 = require("./client"); // твой файл инициализации БД
var site_1 = require("../config/site");
function createKeyValueTable() {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, client_1["default"])()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.exec("\n        CREATE TABLE IF NOT EXISTS key_value (\n            key TEXT PRIMARY KEY,\n            value TEXT\n        )\n    ")];
                case 2:
                    _a.sent();
                    console.log('Table key_value created or already exists.');
                    return [2 /*return*/];
            }
        });
    });
}
function createAboutTable() {
    return __awaiter(this, void 0, void 0, function () {
        var db, insert;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, client_1["default"])()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.exec("\n        DROP TABLE IF EXISTS about;\n        CREATE TABLE IF NOT EXISTS about (\n             id INTEGER PRIMARY KEY AUTOINCREMENT,\n             name TEXT,\n             title TEXT,\n             experience TEXT,\n             description TEXT, -- \u0425\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u043A\u0430\u043A JSON-\u0441\u0442\u0440\u043E\u043A\u0430\n             achievements TEXT, -- \u0425\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u043A\u0430\u043A JSON-\u0441\u0442\u0440\u043E\u043A\u0430\n             motto TEXT\n        )\n    ")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.prepare("\n        INSERT OR REPLACE INTO about (name, title, experience, description, achievements, motto)\n    VALUES (?, ?, ?, ?, ?, ?)\n    ")];
                case 3:
                    insert = _a.sent();
                    return [4 /*yield*/, insert.run("Андрей Васкес", "Сертифицированный массажист", "7+ лет опыта", // Проверьте логику: возможно, это должно быть в `description` или отдельным полем
                        "Профессиональный массажист с медицинским образованием. Специализируюсь на классическом, лечебном и спортивном массаже. Помогаю людям восстановить здоровье, снять стресс и улучшить качество жизни.", JSON.stringify([
                            "Диплом медицинского колледжа по специальности 'Массаж'",
                            "Сертификат повышения квалификации по спортивному массажу",
                            "Курсы по лечебному и реабилитационному массажу",
                            "Более 2000 довольных клиентов"
                        ]), "Ваше здоровье и комфорт - моя главная цель")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, insert.finalize()];
                case 5:
                    _a.sent();
                    console.log('Таблица "about" создана и заполнена.');
                    return [2 /*return*/];
            }
        });
    });
}
function saveConfigToDb(config) {
    return __awaiter(this, void 0, void 0, function () {
        var db, insert, _i, _a, _b, key, value;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, client_1["default"])()];
                case 1:
                    db = _c.sent();
                    return [4 /*yield*/, db.prepare("\n        INSERT OR REPLACE INTO key_value (key, value)\n        VALUES (?, ?)\n    ")];
                case 2:
                    insert = _c.sent();
                    _i = 0, _a = Object.entries(config);
                    _c.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    _b = _a[_i], key = _b[0], value = _b[1];
                    return [4 /*yield*/, insert.run(key, JSON.stringify(value))];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, insert.finalize()];
                case 7:
                    _c.sent();
                    console.log('Site configuration saved to database.');
                    return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('777');
                return [4 /*yield*/, createAboutTable()];
            case 1:
                _a.sent();
                return [4 /*yield*/, createKeyValueTable()];
            case 2:
                _a.sent();
                return [4 /*yield*/, saveConfigToDb(site_1.siteConfig)];
            case 3:
                _a.sent();
                process.exit(0); // Завершаем скрипт
                return [2 /*return*/];
        }
    });
}); })();

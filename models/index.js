const User = require("./User");
const Board = require("./Board");
const List = require("./List");
const Card = require("./Card");

// User -> Board
User.hasMany(Board, { foreignKey: "userId", as: "boards" });
Board.belongsTo(User, { foreignKey: "userId", as: "user" });

// Board -> List
Board.hasMany(List, { foreignKey: "boardId", as: "lists" });
List.belongsTo(Board, { foreignKey: "boardId", as: "board" });

// List -> Card
List.hasMany(Card, { foreignKey: "listId", as: "cards" });
Card.belongsTo(List, { foreignKey: "listId", as: "list" });

module.exports = { User, Board, List, Card };

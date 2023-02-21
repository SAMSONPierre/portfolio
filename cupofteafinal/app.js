const express = require("express");
const app = express();
let mysql = require("mysql");
const { pathToFileURL } = require("url");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let pool = mysql.createPool({
  connectionLimit: 10000,
  host: "localhost",
  user: "(LocalDB)MSSQLLocalDB",
  password: "",
  database: "cup_of_tea",
});

app.get("/teas", (req, res) => {
  pool.query(
    `SELECT categorie.nom as nomCat, thes.image, thes.nom, thes.id, thes.id_category, FORMAT(MIN(prix), 2) as prix FROM thes 
  INNER JOIN  format ON thes.id = format.id_the
  INNER JOIN categorie ON categorie.id = thes.id_category
  GROUP BY format.id_the`,
    function (error, teas, fields) {
      res.json(teas);
    }
  );
});

app.get("/cats", (req, res) => {
  pool.query("SELECT * FROM categorie", function (error, cats, fields) {
    res.json(cats);
  });
});

app.get("/getTea/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  pool.query(
    "SELECT * FROM thes WHERE id = ?",
    [id],
    function (error, tea, fields) {
      res.json(tea[0]);
    }
  );
});

app.get("/getFormat/:id", (req, res) => {
  let id = req.params.id;
  pool.query(
    "SELECT * FROM format WHERE id_the = ?",
    [id],
    function (error, formats, fields) {
      res.json(formats);
    }
  );
});

app.get("/coupDeCoeur", (req, res) => {
  pool.query(
    `SELECT thes.sous_titre, thes.description, thes.image, thes.nom, thes.id, thes.id_category, FORMAT(MIN(prix), 2) as prix FROM thes 
  INNER JOIN  format ON thes.id = format.id_the
  WHERE thes.coup_de_coeur = 1
  GROUP BY format.id_the`,
    function (error, teas, fields) {
      res.json(teas[0]);
    }
  );
});

app.get("/nouveaute", (req, res) => {
  pool.query(
    `SELECT thes.sous_titre, thes.description, thes.image, thes.nom, thes.id, thes.id_category, FORMAT(MIN(prix), 2) as prix FROM thes 
  INNER JOIN  format ON thes.id = format.id_the
  GROUP BY format.id_the ORDER BY date DESC LIMIT 1`,
    function (error, teas, fields) {
      res.json(teas[0]);
    }
  );
});

app.get("/bestseller", (req, res) => {
  pool.query(
    `SELECT thes.sous_titre, thes.description, thes.image, thes.nom, thes.id, thes.id_category, FORMAT(MIN(prix), 2) as prix FROM thes 
  INNER JOIN  format ON thes.id = format.id_the
  WHERE thes.id = (SELECT product_id FROM orderdetail GROUP BY product_id ORDER BY COUNT(product_id) DESC LIMIT 1  )
  GROUP BY format.id_the ORDER BY date DESC`,
    function (error, teas, fields) {
      res.json(teas[0]);
    }
  );
});

app.post("/insertUser", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    pool.query(
      "INSERT INTO user (nom, prenom, email, password, admin) VALUES (?, ?, ?, ?, 0)",
      [req.body.nom, req.body.prenom, req.body.email, hash],
      function (error, result, fields) {
        res.json(result);
      }
    );
  });
});

app.post("/insertTea", (req, res) => {
  console.log(req);
});

app.post("/updateUser", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    pool.query(
      "UPDATE user SET nom = ? ,prenom = ? ,email = ? ,password = ? WHERE id = ?",
      [req.body.nom, req.body.prenom, req.body.email, hash, req.body.id],
      function (error, result, fields) {
        res.json(result);
      }
    );
  });
});

app.post("/api/connexion", (req, res) => {
  //chercher les infos concernant cet email
  pool.query(
    "SELECT * FROM user WHERE email = ?",
    [req.body.email],
    function (error, result, fields) {
      if (result.length == 0) {
        res.json({ reponse: false, message: "L'identifiant n'existe pas" });
      } else {
        bcrypt.compare(
          req.body.password,
          result[0].password,
          function (err, result2) {
            if (!result2) {
              res.json({
                reponse: false,
                message: "Le mot de passe n'est pas correct",
              });
            } else {
              res.json({
                reponse: true,
                message: "Vous êtes connecté !",
                id: result[0].id,
              });
            }
          }
        );
      }
    }
  );
});

app.post("/api/addOrder", (req, res) => {
  pool.query(
    "INSERT INTO `order`(date, user_id) VALUES (?,?)",
    [new Date(), req.body.idUser],
    function (error, result, fields) {
      for (const tea of req.body.teas) {
        pool.query(
          "INSERT INTO orderdetail(order_id, product_id, cond, price) VALUES (?, ?, ?, ?)",
          [result.insertId, tea.id, tea.qte, tea.price],
          function (error, result, fields) {
            res.json({ error: error });
          }
        );
      }
    }
  );
});

app.get("/orders", (req, res) => {
  pool.query(
    "SELECT order.statut, user.nom, user.prenom, date, order.id, SUM(price) as total FROM `order` INNER JOIN orderdetail ON order.id = orderdetail.order_id INNER JOIN user ON user.id = order.user_id GROUP BY order_id ORDER BY order.id DESC",
    [],
    function (error, orders, fields) {
      res.json(orders);
    }
  );
});

app.get("/order/changeStatut/:id", (req, res) => {
  pool.query(
    "UPDATE `order` SET statut = 1 WHERE id = ?",
    [req.params.id],
    function (error, result, fields) {
      res.json(error);
    }
  );
});

app.get("/api/getOrders/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  pool.query(
    "SELECT date, order.id, SUM(price) as total FROM `order` INNER JOIN orderdetail ON order.id = orderdetail.order_id WHERE user_id = ? GROUP BY order_id ORDER BY order.id DESC",
    [id],
    function (error, orders, fields) {
      res.json(orders);
    }
  );
});

app.get("/api/orderDetail/:id", (req, res) => {
  let id = req.params.id;

  pool.query(
    "SELECT * FROM `orderdetail` INNER JOIN thes ON product_id = thes.id WHERE order_id = ? ",
    [id],
    function (error, details, fields) {
      res.json(details);
    }
  );
});

app.get("/api/order/:id", (req, res) => {
  let id = req.params.id;

  pool.query(
    "SELECT * FROM `order` INNER JOIN user ON order.user_id = user.id WHERE order.id = ? ",
    [id],
    function (error, details, fields) {
      res.json(details[0]);
    }
  );
});

app.get("/api/getUser/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  pool.query(
    "SELECT * FROM `user` WHERE id = ?",
    [id],
    function (error, user, fields) {
      res.json(user[0]);
    }
  );
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

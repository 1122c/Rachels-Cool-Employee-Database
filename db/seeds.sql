USE tracker_db;

INSERT INTO department(name)
VALUES ("Engineering"), ("Floral"), ("Hardware"), ("HR");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 900000, 1), ("Florist", 500000, 2), ("Tech", 300000, 3), ("HR Manager", 55000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ari", "Melber", 1, NULL), ("Tareq", "Al Nasser", 2, 1), ("Joy", "Reid", 3, 1), ("Hamdah", "Halmut", 4, NULL);
DROP DATABASE IF EXISTS eventogo;

CREATE DATABASE eventogo;

USE eventogo;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  role varchar(5) NOT NULL ,
  name varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  email varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE events (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  date varchar(255) NOT NULL,
  image varchar(255) NOT NULL,
  type varchar(255) NOT NULL,
  selected boolean ,
  PRIMARY KEY (id)
);
-- from slim this table for the events selected by the user that will be added in the profile component
CREATE TABLE  favorite(
  id_user int ,
  id_event int,
  
  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_event) REFERENCES events(id)
);

--
-- Déchargement des données de la table `users`
--
INSERT INTO `users` (`id`,`role`,`name`,`password`,`email`) VALUES
(1,"admin","admin","123","admin@gmail.com");


INSERT INTO `events` (`id`,`title`,`description`,`date`,`image`,`type`) VALUES
(1,"Beach Night Party, Bizert", "So much fun on bizert beach party, music and dance , be on Time!", "22/07/2022 20:00","https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/73/2020/02/04051939/SO-Sofitel-Hua-Hin-SO-Beach-Party-05-1-585x390.jpg","entertainment"),
(2,"Cultural meeting in the national Library, Tunis", 
"A meeting under the presence of a group of techers and students fro the presence of a new novel","15/5/2022 10:30",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC-GkRN0dfFuwSgGGQ5k7C7JsetVQjnav1dA&usqp=CAU","Cultural"),
(3,"Islamic gathering, Okba Ibn Nafea Mosque","Islamic lecture and ceremony with the presence of the mufti and imams, you are welcomed","28/4/2022 20:30","https://arabi21.com/Content/Upload/large/1120198225417775.jpg","Religious"),
(4,"The Last Mercenary Film Show, Hammamet","You are invited to attend the Action film the Great Jean-Claude Van Damme for just 30Dt per person, fo more informations call:+1225456258556","10/6/2022 21:00","https://m.media-amazon.com/images/M/MV5BNGNkZmJiZTAtY2M3MC00ZTNjLThkYmQtNmMxMTg3ZTJlNDA4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_FMjpg_UX1000_.jpg","Entertainment"),
(5,"Festival of Carthage,Tunis","The most famous Tunisian ferstival when you can meet and see your favourite actors in coming up , be at time , for reservation call 2164525663","8/7/2022 to 17/8/2022 ","http://www.webdo.tn/wp-content/uploads/2021/06/car.jpg","Cultural"),
(6,"Eid crescent sighting,Tunis","It's your opportunity to celebrate the sighting of the Eid crescent on Tunisia, Sidi belhsan chadli","30/4/2022 18:30","https://www.hakaekonline.com/uploads/content/big/1559552987_article.jpg","Religious"),
(7,"Islamic gathering, Okba Ibn Nafea Mosque","Islamic lecture and ceremony with the presence of the mufti and imams, you are welcomed","28/4/2022 20:30","https://arabi21.com/Content/Upload/large/1120198225417775.jpg","Religious"),
(8,"Beach Night Party, Bizert", "So much fun on bizert beach party, music and dance , be on Time!", "22/07/2022 20:00","https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/73/2020/02/04051939/SO-Sofitel-Hua-Hin-SO-Beach-Party-05-1-585x390.jpg","entertainment");



/*  Execute this file from the command line by typing:
 *    mysql -u root -p < server/database-mysql/schema.sql
 *  to create the database and the tables.*/

create database blahtours;
use blahtours;


CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  username varchar(30) NOT NULL,
  pwd text NOT NULL,
  is_admin boolean NOT NULL DEFAULT 0,
  creation_date datetime NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id),
  UNIQUE KEY username_UNIQUE (username)
);

CREATE TABLE vacations (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    description varchar(255) NOT NULL,
    image_path varchar(100) DEFAULT '',
    from_date date ,
    to_date date,
    price int default 1,
    is_active boolean NOT NULL DEFAULT 1,
    notes varchar(255),
    PRIMARY KEY (id),
    KEY index2(is_active DESC, name ASC, from_date ASC) 
);


create table followers(
    user_id int not null,
    vac_id int not null,
    PRIMARY KEY (vac_id, user_id),
    foreign key (user_id) references users(id),
    foreign key (vac_id) references vacations(id)
);


-------------------------------------------
INSERT INTO blahtours.users
(name, username, pwd, is_admin)
VALUES
('BT Admin', 'admin', '$2b$10$nSyJ3Pf.WAB2HIHJaX3zxO7VeG3XpyZJSFFZLhv5XGiyk6e5h.4Aq', 1)
;

INSERT INTO blahtours.users
(name, username, pwd)
VALUES
('Johny', 'user1', '$2b$10$nSyJ3Pf.WAB2HIHJaX3zxO7VeG3XpyZJSFFZLhv5XGiyk6e5h.4Aq'),
('Johna', 'user2', '$2b$10$nSyJ3Pf.WAB2HIHJaX3zxO7VeG3XpyZJSFFZLhv5XGiyk6e5h.4Aq'),
('Jenny', 'user3', '$2b$10$nSyJ3Pf.WAB2HIHJaX3zxO7VeG3XpyZJSFFZLhv5XGiyk6e5h.4Aq'),
('Johnson', 'user4', '$2b$10$nSyJ3Pf.WAB2HIHJaX3zxO7VeG3XpyZJSFFZLhv5XGiyk6e5h.4Aq')
;

INSERT INTO vacations
(name, description, image_path, from_date, to_date, price, notes)
VALUES
('Zeelim Active Vacation','* Camping in the dunes of Zeelim. * Day and night drills. * NEW! Lets go to the EXTREME: Try to complete the vacation without being theaft!','./images/zeelim.jpg',null, null, 0, 'Sunday to Thursday'),
('Hiriya Park', 'See the sunset over TLV from the top of a man-made hill. Never think about what lies beneath your legs', './images/hpark.jpg','2021-01-01', '2021-12-31', 350, 'for person per night'),
('Nowhere', 'There is no such vacation in the world','./images/galaxies.jpg',null, null, 749, '')
;

INSERT INTO blahtours.followers
(user_id, vac_id)
VALUES
(2,2),
(3,3),
(4,1),
(5,1),
(5,2),
(3,2)
;
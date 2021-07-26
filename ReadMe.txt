The project is a basic SPA that simulates a vaccations agency website.
Each vacation has a card that contains its name, image, number of followers and additional details.

User management and permissions:
--------------------------------
1. Administrator - Can add a new vacation or edit an existing one.
To login as an admin: username:admin, password:123. 

2. User - Can follow/unfollow a vacation.
There are already 4 registered users: Johny, Johna, Jenny and Johnson. Of course, you can register yourself.
To login as a user: username:user1 - user4, password:123.

The stack:
----------
DB: MySql
Server: nodeJS
Client: React, Redux and Thunk

Main challenges:
----------------
- DB:
Proper design of tables. Relationships between tables.

- Server:
Proper design of routes
Using middlewares
Authentication (jwt)
Permission management (admin only / users only)
Encryption and decryption of passwords (bcrypt)

- Client:
Proper components design (React).
Material design.
Global state management using Redux.
Asynchronous global state management using Thunk.

Project limitations:
--------------------
1. Copyright - All images were taken from Wikipedia. I added credit at the margins of each image.
2. I didn't deal with packages for uploading or downloading files (Formidable ect.). Therefore, when adding a vacation - the image must be placed within the project under client/public/images.
3. When updating a vacation - the image of the vacation must be selected in each update - even if the image has not changed.


================================
Hebrew:
================================
הפרוייקט מכיל SPA בסיסי המדמה אתר חופשות.
לכל חופשה יש כרטיס המכיל את פרטיה: שם, תמונה, פרטים נוספים, מספר עוקבים.
באתר יש שתי הרשאות: מנהל - מוסיף חופשה חדשה או עורך חופשה קיימת. משתמש רגיל: מתייג חופשה או מבטל את התיוג.
להתחברות כמנהל (אחד בלבד): שם משתמש: admin, סיסמא: 123.
כמו כן רשומים כבר במערכת ארבעה משתמשים: ג'וני, ג'ונה, ג'ני וג'ונסון. שם משתמש: user1 - user4. סיסמא: 123.


ה-stack:
בסיס נתונים: MySql
צד שרת: nodeJS
צד לקוח: React

אתגרים עיקריים:

בסיס נתונים: 
בניה נכונה של טבלאות. קשרים בין טבלאות.

צד שרת: 
חלוקה נכונה ל-routes
שימוש נכון ב-middlewares
ניהול הרשאות: admin only / users only במקומות הנדרשים.
אותנטיקציה באמצעות jwt.
הצפנה ופענוח של הסיסמה ושל ה-token באמצעות bcrypt
שימוש בחבילת .env

צד לקוח:
חלוקה נכונה לקומפוננטות ובנייתן באמצעות React.
עיצוב באמצעות material.
ניהול state גלובלי באמצעות Redux.
ניהול state גלובלי א-סינכרוני (בזמן פניה לצד שרת) באמצעות Thunk.


מגבלות הפרוייקט:
זכויות יוצרים על התמונות - כל התמונות נלקחו מויקיפדיה. הוספתי קרדיט בשולי כל תמונה.
בפרוייקט זה לא התעסקתי בחבילות להורדת/העלאת קבצים (formidable ושות'). לכן בזמן הוספת חופשות - התמונה חייבת להיות מונחת בתוך הפרוייקט תחת client/public/images.
בזמן עדכון חופשה - יש לבחור בכל עדכון את התמונה של החופשה - גם אם התמונה לא השתנתה.
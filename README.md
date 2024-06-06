## Intro
Nama : Wafi Afdi Alfaruqhi
NIM : 22/503393/TK/55000
Repository ini adalah source code dari projek mata kuliah Teknologi Basis Data untuk membuat REST API yang terhubung dengan Database Postgresql agar dapat melakukan query secara eksternal. Framework yang digunakan untuk membuat REST API adalah ExpressJS.

## Requirement
Ada beberapa hal yang diperlukan untuk dapat menjalankan aplikasinya : 
* node versi v20.11.0
* npm versi 10.2.5 
* server postgresql
* file .env

File .env harus berisi agar bisa terhubung ke database postgresql : 
```
DB_USER=""
DB_HOST=""
DB_NAME=""
DB_PASSWORD=""
DB_PORT="

environment=""
```

## Installing
Jika sudah memenuhi requirement maka tinggal clone  github ini 
```
git clone https://github.com/Wafi-Afdi/Database_REST_API.git
```
Setelah di clone lakukan 
```
npm install
npm run dev
```
Server sudah jalan dan bisa dites di postman atau aplikasi testing lainnya


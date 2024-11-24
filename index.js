// Definisi Library yang digunakan
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const http = require('http');
const socketIO = require('socket.io');
const cookieParser = require('cookie-parser');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

function unescapeHTML(html) {
    return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

app.locals.unescape = unescapeHTML;
app.use((req, res, next) => {
    res.io = io; // Tambahkan io ke res
    next();
});

// Definisi lokasi file router

const AdminRouter = require('./src/routes/AdminRoutes');
const LoginRoutes = require('./src/routes/router-login');
const SiswaRoutes = require('./src/routes/SiswaRoutes');
const GuruRoutes = require('./src/routes/GuruRoutes')

// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

// Configurasi library session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 't@1k0ch3ng',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 60 * 60 * 1000 // 1 jam dalam milidetik
    },
}));

app.use(flash());

// Setting folder views
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'ejs');
//public
app.use(express.static(path.join(__dirname, 'src/public')));
// Gunakan routes yang telah didefinisikan

app.use('/Admin', AdminRouter);
app.use('/Login', LoginRoutes);
app.use('/Siswa', SiswaRoutes);
app.use('/Guru', GuruRoutes);
// Socket io event
// Socket.IO event handling
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('callPatient', (data) => {
        io.emit('patientCalled', data);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
io.on("connection", (socket) => {
    console.log('User connected:', socket.id);

    // Terima parameter id_siswa saat klien terhubung
    socket.on('roomGuru', (id_guru) => {
        socket.join(`guru_${id_guru}`); // Gabung ke room khusus siswa
        console.log(`User ${socket.id} joined room guru_${id_guru}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
  });
  
io.on('connection', (socket) => {
    //console.log('User connected:', socket.id);

    // Terima parameter id_siswa saat klien terhubung
    socket.on('joinRoom', (id_siswa) => {
        socket.join(`siswa_${id_siswa}`); // Gabung ke room khusus siswa
       // console.log(`User ${socket.id} joined room siswa_${id_siswa}`);
    });

    socket.on('disconnect', () => {
        //console.log('User disconnected:', socket.id);
    });
});

// Gunakan port server
server.listen(5050, ()=>{
    console.log('Server Berjalan di Port : '+5050);
});

// session


// tambahkan ini
app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.setHeader('Pragma', 'no-cache');
    next();
});




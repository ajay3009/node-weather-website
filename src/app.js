const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const port = process.env.PORT || 3000;



const app = express();

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

// Routes
app.get('', (req, res) => {
   res.render('index', {
       title: 'Weather app',
       name: 'ajay Kumar'
   });
});


app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is a help message using HBS',
        title: 'Weather app help',
        name: 'ajay Kumar'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {msg: 'This is a help message using HBS',
    title: 'Weather app about',
    name: 'ajay Kumar'
})
})




app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.key)
    res.send({
        products : []
    }) 
})


app.get('/weather', (req, res) => {
   if (!req.query.address) {
    return res.send({
        error: 'You must provide an address!'
    });
   }

   geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
       if (error) {
        return res.send({
            error: error
        });
       } else {
           
           forecast(latitude, longitude, (error, res) => {
               if (error) {
                return res.send({
                    error: error
                });
               } else {
                res.send({
                    forecast: res,
                    location: location
                })
               }
           })
       }
   })
  
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        pagename: 'Help Article not found'
    })
})

app.get('/about/*', (req, res) => {
    res.render('404', {
        pagename: 'About Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        pagename: 'Page'
    })
})

// app.get('/help', (req, res) => {
//     res.send({'key': 'fsfsfff', 'value': 'sdddsfff'});
// })


// Server Setup
app.listen(port, () => {
    console.log('Server is running on port ' + port);
})
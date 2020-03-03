const mongoose = require('mongoose');

const Dishes = require('./models/dishesh');

const dburl = 'mongodb://localhost:27017/';
const db = 'confusion2';

const url = dburl + db;

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(db => {
    console.log('connected to confusion')
    // const newDish = Dishes({
    Dishes.create({
        name: 'Matar',
        description: 'test2'
    })// newDish.save()
    .then(dish=>{
        console.log('Dish will be Updated')
        return Dishes.findByIdAndUpdate(dish._id ,{$set: {description: 'UPDATED'}},{new: true}).exec();
    }).then(dish =>{
        console.log('DISH before comment', dish)
        dish.comment.push({rating: 4,comment:'Need Improvement', author: 'Ayush Jain'});
        return dish.save();
    })
    .then(dish => {
        console.log('DISH after comment', dish)
            return Dishes.find({})
        }).then(dishes => {
            console.log('All dishes in Dishes collction are', dishes);
            return Dishes.remove({});
        }).then(res => {
            console.log('All dishes from collection had been removed', res);
            return mongoose.connection.close();
        }).then(res => console.log('Connection had been closed but database is not removed '))
        .catch(console.log)
});
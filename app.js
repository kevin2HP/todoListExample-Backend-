const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/todolistDBForFuck', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const itemsSchema = {
  name:String
}

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item({
  name: 'Eat more'
})

const item2 = new Item({
  name: 'Sleep more'
})

const item3 = new Item({
  name: 'Learn more'
})

const defaultItems = [item1, item2, item3];



app.get('/',function (req,res) {
  Item.find({},function (err,FoundItems) {
    if (FoundItems.length ===0){
      Item.insertMany(defaultItems,function(err){
        if(err){
          console.log(err);
        }else{
          console.log('Added Successfully');
        }
      });
      res.redirect('/')
    }else{
      res.render('index',{tlist:FoundItems});

    }
    })

  })


app.post('/',function (req,res) {
    const itemName = req.body.todo
    const item = new Item({
      name:itemName
    })
     item.save();
    res.redirect('/')

  });


app.post('/delete',function (req,res) {
  const checkItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkItemId,function (err) {
    if (err){
      console.log(err);
    }else{
      console.log('Successfully deleted');
      res.redirect('/');
    }
    })
  })

app.listen(3000,function () {
    console.log('Server started on port 3000');
    
  })

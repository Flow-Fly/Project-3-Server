require('dotenv/config');
const mongoose = require('mongoose');
const Article = require('../models/Article');


const newArticles = [
    {
        title: "New frontend Framework got released!",
        content: `This frontend framework will blow your socks off!
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        type: "Web Dev",
        link: "http://www.not-bootstrap.com",
        image: "https://cdn.dribbble.com/users/230124/screenshots/16086059/media/55432e3763b3c8c93fd7ba6cde8164ea.jpg",
    },
    {
        title: "Hacker tells all his secret, exclusive interview",
        content: `Pentesting nightmare induced strategy
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        type: "Cyber Security",
        link: "http://somethingsketchy.com",
        image: "https://cdn.dribbble.com/users/1787323/screenshots/10091971/media/d43c019bfeff34be8816481e843ea8c1.png",
    },
    {
        title: "Have a look at this cool new font!",
        content: `New cursive font is not so cursy!
        perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis`,
        type: "UI/UX",
        link: "http://fancy-design-and-thought.io",
        image: "https://media.maxiburo.fr/j2svp/zoomhd/71/38/08/713808.jpg",
    },
    {
        title: "Marvellous representation of weather report",
        content: `When john forgot his umbrella, he was not expecting to make this discovery!
        perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis`,
        type: "Data Analyst",
        link: "http://www.weather-report-the-new-way.com",
        image: "https://cdn.dribbble.com/users/33073/screenshots/14788145/media/d3d69589d9ab16d373432ee0a4363aaa.png",
    },
    {
        title: "Web Dev are still starving for work",
        content: `Some are doing css reset for free!
        perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis`,
        type: "Web Dev",
        link: "http://#",
        image: "https://cdn.dribbble.com/users/3459710/screenshots/6596137/07.06.png",
    },
]

connection()

async function connection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    let articles = await Article.deleteMany();
    console.log(`Deleted ${articles.length} articles`)

    articles = await Article.create(newArticles);
    console.log('articles created: ', articles);
    mongoose.connection.close();
    console.log('connection closed.')
  } catch (e) {
    console.error(e);
  }
}
